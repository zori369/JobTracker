import React, { useState, useEffect } from "react";
import FilterBar from "./FilterBar.tsx";
import MoonIcon from "./icons/MoonIcon.tsx";
import SunIcon from "./icons/SunIcon.tsx";
interface HeaderProps {
    onSortChange: (sortOption: string) => void;
    onSearchChange: (searchName: string) => void;
    onAddJobClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSortChange, onSearchChange, onAddJobClick }) => {
    const [isLightTheme, setIsLightTheme] = useState(
        localStorage.getItem("theme") === "light"
    );

    useEffect(() => {
        document.body.classList.toggle("light-theme", isLightTheme);
        localStorage.setItem("theme", isLightTheme ? "light" : "dark");
    }, [isLightTheme]);


    return (
        <div className="header">
            <div className="header__top">
                <h1>Jobs tracker</h1>
                <div className="header__mode">
                    <MoonIcon color="#ffffff"/>
                    <div className="header__switch"
                        onClick={() => setIsLightTheme(!isLightTheme)}
                        style={{ justifyContent: isLightTheme ? "flex-end" : "flex-start" }}
                    >
                        <div className="switch__circle"></div>
                    </div>
                    <SunIcon color="#77838f"/>
                </div>
            </div>
            <FilterBar onSortChange={onSortChange} onSearchChange={onSearchChange} onAddJobClick={onAddJobClick} />
        </div>
    );
}

export default Header;