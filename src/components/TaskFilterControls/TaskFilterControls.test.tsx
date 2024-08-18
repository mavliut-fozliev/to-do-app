import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskFilterControls from "./TaskFilterControls";
import { TaskFilter } from "../../types";

const filters = Object.values(TaskFilter);

const getClearCompletedButton = () => screen.getByRole("button", { name: /Clear Completed/i });

test("renders the TaskFilterControls component with filter buttons", () => {
  render(<TaskFilterControls currentFilter={TaskFilter.All} onFilterChange={() => {}} onClearCompleted={() => {}} />);

  filters.forEach((filter) => {
    expect(screen.getByRole(filter)).toBeInTheDocument();
  });

  expect(getClearCompletedButton()).toBeInTheDocument();
});

test("calls onFilterChange with correct filter when a filter button is clicked", () => {
  const mockOnFilterChange = jest.fn();

  render(<TaskFilterControls currentFilter={TaskFilter.All} onFilterChange={mockOnFilterChange} onClearCompleted={() => {}} />);

  // Click on a filter button
  filters.forEach((filter) => {
    fireEvent.click(screen.getByRole(filter));
    expect(mockOnFilterChange).toHaveBeenCalledWith(filter);
  });
});

test('calls onClearCompleted when "Clear Completed" button is clicked', () => {
  const mockOnClearCompleted = jest.fn();

  render(<TaskFilterControls currentFilter={TaskFilter.All} onFilterChange={() => {}} onClearCompleted={mockOnClearCompleted} />);

  fireEvent.click(getClearCompletedButton());

  expect(mockOnClearCompleted).toHaveBeenCalled();
});
