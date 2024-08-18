import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HomePage from "./HomePage";

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

const setup = () => {
  render(<HomePage />);
};

const addTask = (taskContent: string) => {
  const input = screen.getByPlaceholderText(/add your text/i);
  const addButton = screen.getByText(/add/i);

  fireEvent.change(input, { target: { value: taskContent } });
  fireEvent.click(addButton);
};

describe("HomePage", () => {
  test("adds a new task", () => {
    setup();

    addTask("New Task");

    expect(screen.getByText(/new task/i)).toBeInTheDocument();
  });

  test("toggles task completion", () => {
    setup();

    addTask("Task to Complete");

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(screen.getByText(/task to complete/i)).toHaveStyle("text-decoration: line-through");
  });

  test("deletes a task", () => {
    setup();

    addTask("Task to Delete");

    const deleteButton = screen.getByRole("delete");
    fireEvent.click(deleteButton);

    expect(screen.queryByText(/task to delete/i)).not.toBeInTheDocument();
  });

  test("filters tasks", () => {
    setup();

    addTask("Active Task");
    addTask("Completed Task");

    // Complete the second task
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[1]);

    // Filter to show only active tasks
    const activeButton = screen.getByRole("active");
    fireEvent.click(activeButton);

    expect(screen.getByText(/active task/i)).toBeInTheDocument();
    expect(screen.queryByText(/completed task/i)).not.toBeInTheDocument();

    // Filter to show only completed tasks
    const completedButton = screen.getByRole("completed");
    fireEvent.click(completedButton);

    expect(screen.getByText(/completed task/i)).toBeInTheDocument();
    expect(screen.queryByText(/active task/i)).not.toBeInTheDocument();
  });

  test("clears completed tasks", () => {
    setup();

    addTask("Active Task");
    addTask("Completed Task");

    // Complete the second task
    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[1]);

    // Clear completed tasks
    const clearCompletedButton = screen.getByText(/clear completed/i);
    fireEvent.click(clearCompletedButton);

    expect(screen.getByText(/active task/i)).toBeInTheDocument();
    expect(screen.queryByText(/completed task/i)).not.toBeInTheDocument();
  });

  test("persists tasks to localStorage", () => {
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

    setup();

    addTask("Persistent Task");

    const tasks = JSON.parse(setItemSpy.mock.calls[1][1]);

    // Validate that the id is a string and the rest of the object is correct
    expect(tasks[0].id).toEqual(expect.any(String));
    expect(tasks[0].content).toBe("Persistent Task");
    expect(tasks[0].isCompleted).toBe(false);
  });
});
