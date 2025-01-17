import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskList from "../components/TaskList"; // Adjust the path if needed
import { BrowserRouter as Router } from "react-router-dom";

describe("TaskList Component", () => {
  const mockTasks = [
    {
      id: 1,
      title: "Task 1",
      completed: false,
      priority: "High",
      createdAt: "2023-01-01T00:00:00Z",
    },
    {
      id: 2,
      title: "Task 2",
      completed: true,
      priority: "Low",
      createdAt: "2023-01-02T00:00:00Z",
    },
    {
      id: 3,
      title: "Task 3",
      completed: false,
      priority: "Medium",
      createdAt: "2023-01-03T00:00:00Z",
    },
  ];

  const mockEditTask = jest.fn();
  const mockDeleteTask = jest.fn();
  const mockToggleCompletion = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders task list with correct number of tasks", () => {
    render(
      <Router>
        <TaskList
          tasks={mockTasks}
          editTask={mockEditTask}
          deleteTask={mockDeleteTask}
          toggleCompletion={mockToggleCompletion}
        />
      </Router>
    );

    expect(screen.getAllByText(/Task/i)).toHaveLength(3);
  });

});