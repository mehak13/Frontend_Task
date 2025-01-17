import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskDetail from "./components/TaskDetail";
import TaskForm from "./components/TaskForm";
import Navbar from "./components/Navbar";
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);

  const saveTask = (task) => {
    if (currentTask) {
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === currentTask.id ? { ...t, ...task } : t))
      );
    } else {
      setTasks([
        ...tasks,
        { ...task, id: Date.now(), createdAt: new Date(), completed: false },
      ]);
    }
    setCurrentTask(null);
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const editTask = (task) => {
    setCurrentTask(task);
  };

  const toggleCompletion = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <Router>
      <Navbar />
      <div className="container">
        <h1>Task Management Application</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="task-form">
                  <TaskForm saveTask={saveTask} currentTask={currentTask} />
                </div>
                <div className="task-list">
                  <TaskList
                    tasks={tasks}
                    editTask={editTask}
                    deleteTask={deleteTask}
                    toggleCompletion={toggleCompletion}
                  />
                </div>
              </>
            }
          />
          <Route
            path="/task/:id"
            element={<TaskDetail tasks={tasks} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
