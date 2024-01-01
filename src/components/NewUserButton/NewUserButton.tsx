import { Button, Form, Input, message, Modal } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, User } from "../../store/usersSlice";

function NewUserButton() {
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [form] = Form.useForm();

  const onFinish = (userData: Omit<User, "id">) => {
    // Update redux store
    dispatch(addUser({ ...userData, id: crypto.randomUUID() }));

    setIsModalVisible(false);
    message.success("New user added successfully");
  };

  const onReset = () => {
    // Reset the form
    form.resetFields();
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{
          backgroundColor: "#3c5c9a",
        }}
      >
        Add User
      </Button>

      <Modal
        title="Add New User"
        open={isModalVisible}
        footer={null}
        onCancel={handleCancel}
        // onOk={handleSave}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                min: 3,
                message: "Please provide a name longer than 3 characters",
              },
            ]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
              {
                type: "email",
                message: "Please enter a valid email address",
              },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            name="location"
            label="Location"
            rules={[
              {
                required: true,
                message: "Please enter your location",
              },
            ]}
          >
            <Input placeholder="Enter your location" />
          </Form.Item>

          <Form.Item
            name="image"
            label="Image"
            rules={[
              {
                required: true,
                message: "Please enter the image URL",
              },
            ]}
          >
            <Input placeholder="Enter the image URL" />
          </Form.Item>

          <Form.Item style={{ textAlign: "right" }}>
            <Button onClick={onReset} style={{ marginRight: "1rem" }}>
              Reset
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default NewUserButton;
