import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import JobCard from "./JobCard";

const mockJob = {
    company: "Google",
    position: "Frontend Developer",
    salary: 120000,
    status: "applied" as "applied" | "interview" | "rejected",
    onDelete: vi.fn(), // Mock function
    onViewMore: vi.fn(),
};

describe("JobCard Component", () => {
    test("renders job details correctly", () => {
        render(<JobCard {...mockJob} />);
        expect(screen.getByText("Google")).toBeInTheDocument();
        expect(screen.getByText("Frontend Developer")).toBeInTheDocument();
        expect(screen.getByText((content) => content.includes("120"))).toBeInTheDocument();
    });

    test("calls onDelete when delete button is clicked", () => {
        render(<JobCard {...mockJob} />);
        const deleteButton = screen.getByRole("button", { name: /delete job/i });

        fireEvent.click(deleteButton);
        expect(mockJob.onDelete).toHaveBeenCalledTimes(1);
    });

    test("calls onViewMore when view details button is clicked", () => {
        render(<JobCard {...mockJob} />);
        const viewMoreButton = screen.getByRole("button", { name: /view details/i });

        fireEvent.click(viewMoreButton);
        expect(mockJob.onViewMore).toHaveBeenCalledTimes(1);
    });
});
