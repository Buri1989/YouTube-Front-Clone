import React, { useState } from 'react';


const SearchBarComp = ({ onSearch }) => {
    const [searchItem, setSearchItem] = useState("");

    const handleSearch = () => {
        onSearch(searchItem);
    };

    return (
        <>
            <input
                type="text"
                placeholder="Search."
                value={searchItem}
                onChange={(event) => setSearchItem(event.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </>
    )
}

export default SearchBarComp
