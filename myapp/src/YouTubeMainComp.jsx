import React, { useState } from 'react'
import SearchBarComp from './SearchBarComp'
import { searchVideos } from './utils'
import './youTubeStyle.css'

const YouTubeMainComp = () => {
    const [videos, setVideos] = useState([]);

    const handleSearch = async (searchItem) => {
        const videos = await searchVideos(searchItem);
        setVideos(videos)
    }

    const handleVideoClick = (videoId) => {
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')
    }
    return (
        <div className="container">
            <SearchBarComp onSearch={handleSearch} />
            <div className="videos-container">
                {videos.map(video => (
                    <div key={video.id.videoId} onClick={() => handleVideoClick(video.id.videoId)}>
                        <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer">
                            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
                            <p>{video.snippet.title}</p>
                            <p>Rating: {video.rating}</p>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default YouTubeMainComp
