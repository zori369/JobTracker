import React, { useState, useEffect } from "react";

interface Job {
    id: number;
    company: string;
    position: string;
    salary: number;
    dateApplied: string;
    status: "applied" | "interview" | "rejected";
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (job: Job) => void;
    jobData?: Job | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, jobData }) => {
    const [job, setJob] = useState<Job>({
        id: Date.now(),
        company: "",
        position: "",
        salary: 0,
        dateApplied: new Date().toISOString().split("T")[0],
        status: "applied",
    });

    useEffect(() => {
        if (jobData) {
            setJob(jobData);
        } else {
            setJob({
                id: Date.now(),
                company: "",
                position: "",
                salary: 0,
                dateApplied: new Date().toISOString().split("T")[0],
                status: "applied",
            });
        }
    }, [jobData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setJob({ ...job, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(job);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal__content">
                <h2>{jobData ? "Edit Job" : "Add Job"}</h2>
                <form onSubmit={handleSubmit}>
                    <label>Company Name</label>
                    <input type="text" name="company" value={job.company} onChange={handleChange} required />

                    <label>Position</label>
                    <input type="text" name="position" value={job.position} onChange={handleChange} required />

                    <label>Salary</label>
                    <input type="number" name="salary" value={job.salary} onChange={handleChange} required />

                    <label>Date Applied</label>
                    <input type="date" name="dateApplied" value={job.dateApplied} onChange={handleChange} required />

                    <label>Status</label>
                    <select name="status" value={job.status} onChange={handleChange} required>
                        <option value="applied">Applied</option>
                        <option value="interview">Interview</option>
                        <option value="rejected">Rejected</option>
                    </select>

                    <div className="modal__buttons">
                        <button type="submit">{jobData ? "Save Changes" : "Add Job"}</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
