import React, { useState } from 'react'
import SearchBarComp from './SearchBarComp'
import { searchVideos } from './utils'
import './youTubeStyle.css'

const YouTubeMainComp = () => {
    const [videos, setVideos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const videosPerPage = 10;
    const maxVideos = 50; /* Maximum number of videos to fetch initially - change if needed*/

    const handleSearch = async (searchItem) => {
        const { videos: fetchedVideos } = await searchVideos(searchItem, maxVideos);
        setVideos(fetchedVideos);
        setCurrentPage(1);
    }

    const handleVideoClick = (videoId) => {
        window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')
    }



    const paginate = async (pageNumber) => {
        setCurrentPage(pageNumber);
        const startIndex = (pageNumber - 1) * videosPerPage;
        const nextPageVideos = await searchVideos('searchItem', videosPerPage, startIndex);
        setVideos(nextPageVideos);
    }

    const sortedVideos = videos.sort((high, low) => low.rating - high.rating);
    const indexOfLastVideo = currentPage * videosPerPage;
    const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
    const currentVideos = sortedVideos.slice(indexOfFirstVideo, indexOfLastVideo);

    return (
        <div className="container">
            <SearchBarComp onSearch={handleSearch} />
            <div className="videos-container">
                {currentVideos.map(video => (
                    <div key={video.id.videoId} onClick={() => handleVideoClick(video.id.videoId)}>
                        <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer">
                            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
                            <p>{video.snippet.title}</p>
                            <p>Rating: {video.rating}</p>
                        </a>
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastVideo >= videos.length}>Next</button>
            </div>
        </div>
    )
}

export default YouTubeMainComp
