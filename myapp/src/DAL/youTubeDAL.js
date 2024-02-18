import axios from "axios";
import log from "logger";

const URL = "https://www.googleapis.com/youtube/v3/search";

export async function fetchVideos(searchItem) {
  try {
    const response = await axios.get(URL, {
      params: {
        part: "snippet",
        maxResults: 10,
        q: searchItem,
        order: "rating",
        key: "AIzaSyA73-98KyFR_eWEzUudsOVw3ocRQxKBkgA",
      },
    });
    return response.data.items;
  } catch (error) {
    log.info("Error fetching data:", error);
    return [];
  }
}

export async function fetchVideoDetails(videoIds) {
  try {
    const response = await axios.get(URL, {
      params: {
        part: "snippet,statistics",
        id: videoIds,
        key: "AIzaSyA73-98KyFR_eWEzUudsOVw3ocRQxKBkgA",
      },
    });
    return response.data.items;
  } catch (error) {
    log.info("Error fetching data:", error);
    return [];
  }
}
