import { fetchVideos, fetchVideoDetails } from "../DAL/youTubeDAL";

export async function searchVideos(searchItem) {
  try {
    const videos = await fetchVideos(searchItem);
    const videoIds = videos.map((video) => video.id.videoId).join(",");
    const videoDetails = await fetchVideoDetails(videoIds);

    const videosWithRating = videos.map((video) => {
      const details = videoDetails.find((item) => item.id === video.id.videoId);
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
    console.error("Error searching videos:", error);
    return [];
  }
}
