import React from "react";
import DeleteIcon from "./icons/DeleteIcon";

interface JobCardProps {
    company: string;
    position: string;
    salary: number;
    status: "applied" | "interview" | "rejected";
    onDelete: () => void;
    onViewMore: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ company, position, salary, status, onDelete, onViewMore }) => {
    return (
        <div className={`job-card job-card--${status}`}>
            <div className="card__header">
                <h2>{company}</h2>
                <button className="card__delete" onClick={onDelete} aria-label="Delete Job">
                    <DeleteIcon />
                </button>
            </div>
            <div className="card__contents">
                <div className="contents__row">
                    <p>Position:</p>
                    <p>{position}</p>
                </div>
                <div className="contents__row">
                    <p>Salary:</p>
                    <p>{salary.toLocaleString()} USD</p>
                </div>
            </div>
            <button className="card__more" onClick={onViewMore}>View Details</button>
        </div>
    );
};

export default JobCard;
