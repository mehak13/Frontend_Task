import React from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button, Typography, Tag, Space } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

function TaskDetail({ tasks }) {
  const { id } = useParams();
  const task = tasks.find((task) => task.id === parseInt(id));

  if (!task) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Title level={4}>Task not found.</Title>
        <Link to="/">
          <Button type="primary" icon={<ArrowLeftOutlined />}>
            Back to Task List
          </Button>
        </Link>
      </div>
    );
  }

  const priorityColors = {
    High: "red",
    Medium: "orange",
    Low: "green",
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <Card
        title={<Title level={3}>Task Details</Title>}
        bordered={false}
        style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
      >
        <Space direction="vertical" size="large">
          <div>
            <Text strong>Title:</Text>
            <br />
            <Text>{task.title}</Text>
          </div>
          <div>
            <Text strong>Description:</Text>
            <br />
            <Text>{task.description}</Text>
          </div>
          <div>
            <Text strong>Priority:</Text>
            <br />
            <Tag color={priorityColors[task.priority] || "blue"}>
              {task.priority}
            </Tag>
          </div>
          <div>
            <Text strong>Status:</Text>
            <br />
            <Tag color={task.completed ? "green" : "volcano"}>
              {task.completed ? "Completed" : "Incomplete"}
            </Tag>
          </div>
        </Space>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Link to="/">
            <Button type="primary" icon={<ArrowLeftOutlined />}>
              Back to Task List
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default TaskDetail;
