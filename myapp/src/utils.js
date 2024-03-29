import axios from "axios";
import log from "logger";

export async function searchVideos(
  searchItem,
  maxResults = 10,
  pageToken = ""
) {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          maxResults: maxResults,
          q: searchItem,
          order: "rating",
          pageToken: pageToken,
          key: "key",
        },
      }
    );
    const videoIds = response.data.items
      .map((video) => video.id.videoId)
      .join(",");
    const videoDetailsResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "snippet,statistics",
          id: videoIds,
          key: "key",
        },
      }
    );

    const videosWithRating = response.data.items.map((video) => {
      const details = videoDetailsResponse.data.items.find(
        (item) => item.id === video.id.videoId
      );
      const likeCount =
        details.statistics && details.statistics.likeCount
          ? parseInt(details.statistics.likeCount)
          : 0;
      const dislikeCount =
        details.statistics && details.statistics.dislikeCount
          ? parseInt(details.statistics.dislikeCount)
          : 0;
      const rating = likeCount - dislikeCount;
      return {
        ...video,
        rating: rating,
      };
    });
    return {
      videos: videosWithRating,
      nextPageToken: response.data.nextPageToken,
    };
  } catch (error) {
    log.info("Error fetching data:", error);
    return { videos: [], nextPageToken: "" };
  }
}
