import React, { useState, useEffect } from "react";
import Header from "./components/Header.tsx";
import JobList from './components/JobList.tsx';
import Modal from "./components/Modal.tsx";

import './styles/main.scss';

interface Job {
    id: number;
    company: string;
    position: string;
    salary: number;
    dateApplied: string;
    status: "applied" | "interview" | "rejected";
}

const App: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [sortOption, setSortOption] = useState<string>("date-newest");
    const [searchName, setSearchName] = useState<string>("");
    const [isModal, setIsModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    useEffect(() => {
        fetch("http://localhost:5000/jobs")  
            .then((response) => response.json())
            .then((data) => setJobs(data))
            .catch((error) => console.error("Error loading job data:", error));
    }, []);


    const openModalForJob = (job: Job | null) => {
        setSelectedJob(job);
        setIsModal(true);
    };

    const closeModal = () => {
        setIsModal(false);
    };

    const handleJobSubmit = (jobData: Job) => {
        if (jobData.id && jobs.some(job => job.id === jobData.id)) {

            fetch(`http://localhost:5000/jobs/${jobData.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(jobData),
            })
                .then(response => {
                    if (!response.ok) throw new Error("Failed to update job");
                    return response.json();
                })
                .then((updatedJob) => {
                    setJobs(jobs.map(job => (job.id === updatedJob.id ? updatedJob : job)));
                })
                .catch(error => console.error("Error updating job:", error));
        } else {
            const newJob = { ...jobData, id: Date.now() };

            fetch("http://localhost:5000/jobs", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newJob),
            })
                .then(response => {
                    if (!response.ok) throw new Error("Failed to add job");
                    return response.json();
                })
                .then((addedJob) => {
                    setJobs([...jobs, addedJob]);
                })
                .catch(error => console.error("Error adding job:", error));
        }
    };






    const handleSortChange = (option: string) => {
        setSortOption(option);
    };

    const handleSearchChange = (searchTerm: string) => {
        setSearchName(searchTerm);
    };

    return (
        <div className="app">
            <Header onSortChange={handleSortChange} onSearchChange={handleSearchChange} onAddJobClick={() => openModalForJob(null)} />
            <JobList jobs={jobs} sortOption={sortOption} searchName={searchName} setJobs={setJobs} onViewMore={openModalForJob} />
            <Modal isOpen={isModal} onClose={closeModal} onSubmit={handleJobSubmit} jobData={selectedJob} />
        </div>
    );
};

export default App;
