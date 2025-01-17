import React, { useState } from "react";
import { Table, Button, Select, Tag } from "antd";
import { Link } from "react-router-dom";

const { Option } = Select;

function TaskList({ tasks, editTask, deleteTask, toggleCompletion }) {
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Date");

  // Filter tasks based on status
  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed;
    if (filter === "Incomplete") return !task.completed;
    return true;
  });

  // Sort tasks based on selected criteria
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === "Priority") return a.priority.localeCompare(b.priority);
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  // Define columns for Ant Design Table
  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <span >
          {new Date(createdAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Status",
      dataIndex: "completed",
      key: "completed",
      render: (completed) => (
        <Tag color={completed ? "green" : "red"}>
          {completed ? "Completed" : "Incomplete"}
        </Tag>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => {
        let color = "blue";
        if (priority === "High") color = "red";
        else if (priority === "Medium") color = "orange";
        else if (priority === "Low") color = "green";
        return <Tag color={color}>{priority}</Tag>;
      },
    },
   
    {
      title: "Actions",
      key: "actions",
      render: (_, task) => (
        <div className="actions-cell">
          <Button onClick={() => toggleCompletion(task.id)} type="link">
            {task.completed ? "Mark Incomplete" : "Mark Complete"}
          </Button>
          <Link to={`/task/${task.id}`}>
            <Button type="link">Show More</Button>
          </Link>
          <Button onClick={() => editTask(task)} type="link">
            Edit
          </Button>
          <Button onClick={() => deleteTask(task.id)} type="link" danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="task-list-container">
      {/* Filters and Sort Options */}
      <div className="filters-container">
        <label>
          Filter:{" "}
          <Select
            onChange={(value) => setFilter(value)}
            value={filter}
            style={{ width: 120, marginRight: 16 }}
          >
            <Option value="All">All</Option>
            <Option value="Completed">Completed</Option>
            <Option value="Incomplete">Incomplete</Option>
          </Select>
        </label>

        <label>
          Sort:{" "}
          <Select
            onChange={(value) => setSort(value)}
            value={sort}
            style={{ width: 120 }}
          >
            <Option value="Date">Date</Option>
            <Option value="Priority">Priority</Option>
          </Select>
        </label>
      </div>

      {/* Ant Design Table */}
      <Table
        dataSource={sortedTasks}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 3 }}
      />
    </div>
  );
}

export default TaskList;
