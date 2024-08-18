import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TaskList from "./TaskList";
import { Task } from "../../types";

const tasks: Task[] = [
  { id: "1", content: "Task 1", isCompleted: false },
  { id: "2", content: "Task 2", isCompleted: true },
];

const getDeleteButton = () => screen.getAllByRole("delete");
const getCheckbox = () => screen.getAllByRole("checkbox");

test("renders the TaskList component with tasks", () => {
  render(<TaskList tasks={tasks} deleteTask={() => {}} toggleTask={() => {}} />);

  tasks.forEach((task) => {
    expect(screen.getByText(task.content)).toBeInTheDocument();
    expect(screen.getByText(task.content)).toHaveStyle(task.isCompleted ? "text-decoration: line-through;" : "text-decoration: none;");
  });

  expect(getDeleteButton()).toHaveLength(tasks.length);
});

test("calls deleteTask with the correct id when the delete button is clicked", () => {
  const mockDeleteTask = jest.fn();
  render(<TaskList tasks={tasks} deleteTask={mockDeleteTask} toggleTask={() => {}} />);

  fireEvent.click(getDeleteButton()[0]);

  expect(mockDeleteTask).toHaveBeenCalledWith("1");
  expect(mockDeleteTask).toHaveBeenCalledTimes(1);
});

test("calls toggleTask with the correct id when the checkbox is clicked", () => {
  const mockToggleTask = jest.fn();
  render(<TaskList tasks={tasks} deleteTask={() => {}} toggleTask={mockToggleTask} />);

  fireEvent.click(getCheckbox()[0]);

  expect(mockToggleTask).toHaveBeenCalledWith("1");
  expect(mockToggleTask).toHaveBeenCalledTimes(1);
});

test("checkbox reflects the task completion status", () => {
  render(<TaskList tasks={tasks} deleteTask={() => {}} toggleTask={() => {}} />);

  expect(getCheckbox()[0]).not.toBeChecked();
  expect(getCheckbox()[1]).toBeChecked();
});
