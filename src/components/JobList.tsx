import React from "react";
import JobCard from "./JobCard.tsx";

interface Job {
    id: number;
    company: string;
    position: string;
    salary: number;
    dateApplied: string;
    status: "applied" | "interview" | "rejected";
}

interface JobListProps {
    jobs: Job[];
    setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
    sortOption: string;
    searchName: string;
    onViewMore: (job: Job) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, setJobs, sortOption, searchName, onViewMore }) => {
    const handleDelete = (id: number) => {
        fetch(`http://localhost:5000/jobs/${id}`, { method: "DELETE" })
            .then(() => setJobs(jobs.filter(job => job.id !== id)))
            .catch(error => console.error("Error deleting job:", error));
    };

    
    const displayedJobs = [...jobs]
        .filter(job => job.company.toLowerCase().includes(searchName.toLowerCase()))
        .sort((a, b) => { 
            switch (sortOption) {
                case "date-newest":
                    return b.id - a.id;
                case "date-oldest":
                    return a.id - b.id;
                case "salary-highest":
                    return b.salary - a.salary;
                case "salary-lowest":
                    return a.salary - b.salary;
                case "company-a-z":
                    return a.company.localeCompare(b.company);
                case "company-z-a":
                    return b.company.localeCompare(a.company);
                default:
                    return 0;
            }
        });

    return (
        <div className="job-list">
            {displayedJobs.length > 0 ? (
                displayedJobs.map((job) => (
                    <JobCard
                        key={job.id}
                        company={job.company}
                        position={job.position}
                        salary={job.salary}
                        status={job.status}
                        onDelete={() => handleDelete(job.id)}
                        onViewMore={() => onViewMore(job)} 
                    />
                ))
            ) : (
                <p>No jobs found for "{searchName}"</p> 
            )}
        </div>
    );
};

export default JobList;
