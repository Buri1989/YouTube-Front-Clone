import React, { useState } from 'react';
import './youTubeStyle.css'


const SearchBarComp = ({ onSearch }) => {
    const [searchItem, setSearchItem] = useState("");

    const handleSearch = () => {
        onSearch(searchItem);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search."
                value={searchItem}
                onChange={(event) => setSearchItem(event.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    )
}

export default SearchBarComp
