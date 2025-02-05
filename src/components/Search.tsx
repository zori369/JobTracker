import React, { useState } from "react";
import SearchIcon from "./icons/SearchIcon";

const Search: React.FC<{ onSearchChange: (searchName: string) => void }> = ({ onSearchChange }) => {
    const [searchName, setSearchName] = useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedSearch = event.target.value;
        setSearchName(selectedSearch);
        onSearchChange(selectedSearch);
    };

    return (
        <div className="search">   
            <input
                type="text"
                id="search"
                name="search"
                className="search__field"
                placeholder="Search by company name ..."
                aria-label="Search for a company"
                value={searchName}
                onChange={handleSearchChange} />
            <SearchIcon />
        </div>
    );
}

export default Search;