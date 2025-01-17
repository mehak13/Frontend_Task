import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Typography } from "antd";

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

function TaskForm({ saveTask, currentTask }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (currentTask) {
      form.setFieldsValue({
        title: currentTask.title,
        description: currentTask.description,
        priority: currentTask.priority,
      });
    } else {
      form.resetFields(); // Reset fields when there's no current task
    }
  }, [currentTask, form]);

  const handleSubmit = (values) => {
    saveTask(values);
    form.resetFields(); // Clear the form fields after saving
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        title: currentTask?.title || "",
        description: currentTask?.description || "",
        priority: currentTask?.priority || "Low",
      }}
    >
      <Title level={4}>{currentTask ? "Edit Task" : "Add Task"}</Title>
      <Form.Item
        label="Task Title"
        name="title"
        rules={[
          { required: true, message: "Please enter the task title!" },
        ]}
      >
        <Input placeholder="Enter task title" />
      </Form.Item>
      <Form.Item label="Task Description" name="description">
        <TextArea
          placeholder="Enter task description"
          rows={4}
        />
      </Form.Item>
      <Form.Item label="Priority" name="priority">
        <Select>
          <Option value="Low">Low</Option>
          <Option value="Medium">Medium</Option>
          <Option value="High">High</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {currentTask ? "Update Task" : "Add Task"}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default TaskForm;
