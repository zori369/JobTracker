import React from "react";
import Sort from "./Sort";
import Search from "./Search";
interface FilterBarProps {
    onSortChange: (sortOption: string) => void;
    onSearchChange: (searchName: string) => void;
    onAddJobClick: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onSortChange, onSearchChange, onAddJobClick}) => {
    return (
        <div className="filter-bar">
            <Sort onSortChange={onSortChange} />
            <Search onSearchChange={onSearchChange} />
            <button className="addNew" onClick={onAddJobClick}>Add job</button>
        </div>
    );
}

export default FilterBar;