import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddTaskForm from "./AddTaskForm";

const setup = () => {
  const mockOnAddTask = jest.fn();
  render(<AddTaskForm onAddTask={mockOnAddTask} />);

  return { mockOnAddTask };
};

const getInput = () => screen.getByPlaceholderText(/add your text/i);
const getAddButton = () => screen.getByRole("button", { name: /add/i });

test("renders the AddTaskForm component", () => {
  render(<AddTaskForm onAddTask={() => {}} />);

  expect(getInput()).toBeInTheDocument();
  expect(getAddButton()).toBeInTheDocument();
});

test("calls onAddTask with trimmed task content when the form is submitted", () => {
  const { mockOnAddTask } = setup();

  fireEvent.change(getInput(), { target: { value: "Test Task" } });
  fireEvent.click(getAddButton());

  expect(mockOnAddTask).toHaveBeenCalledWith("Test Task");
  expect(mockOnAddTask).toHaveBeenCalledTimes(1);
});

test("does not call onAddTask when input is empty", () => {
  const { mockOnAddTask } = setup();

  fireEvent.click(getAddButton());

  expect(mockOnAddTask).not.toHaveBeenCalled();
});

test("clears input field after form submission", () => {
  setup();

  fireEvent.change(getInput(), { target: { value: "Test Task" } });
  fireEvent.click(getAddButton());

  expect(getInput()).toHaveValue("");
});
