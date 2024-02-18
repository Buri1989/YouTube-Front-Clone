import axios from "axios";
import log from "logger";

export async function searchVideos(searchItem) {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          maxResults: 10,
          q: searchItem,
          order: "rating",
          key: "AIzaSyA73-98KyFR_eWEzUudsOVw3ocRQxKBkgA",
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
          key: "AIzaSyA73-98KyFR_eWEzUudsOVw3ocRQxKBkgA",
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
    return videosWithRating;
  } catch (error) {
    log.info("Error fetching data:", error);
    return [];
  }
}
