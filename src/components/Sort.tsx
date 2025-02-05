import React, { useState } from "react";
import Arrow from "./icons/Arrow.tsx";

const Sort: React.FC<{ onSortChange: (sortOption: string) => void }> = ({ onSortChange }) => {
    const [sortOption, setSortOption] = useState("date-newest"); 

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSort = event.target.value;
        setSortOption(selectedSort);
        onSortChange(selectedSort);
    };

    return (
        <div className="sort">
            <select id="sort-select" value={sortOption} onChange={handleSortChange} className="sort__dropdown">
                <option value="date-newest">Date (Newest First)</option>
                <option value="date-oldest">Date (Oldest First)</option>
                <option value="salary-highest">Salary (Highest First)</option>
                <option value="salary-lowest">Salary (Lowest First)</option>
                <option value="company-a-z">Company (A-Z)</option>
                <option value="company-z-a">Company (Z-A)</option>
            </select>
        </div>
    );
}

export default Sort;