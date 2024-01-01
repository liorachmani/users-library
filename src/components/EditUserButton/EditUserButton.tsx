import { Button, Form, Input, message, Modal } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser, User } from "../../store/usersSlice";
import {
  isEmailDuplicate,
  validateEmail,
  validateLocation,
  validateName,
} from "../../utils/validations";

function EditUserButton({ user }: { user: User }) {
  const dispatch = useDispatch();

  const { name, email, location } = user;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [form] = Form.useForm();

  const onFinish = (userData: Omit<User, "id" | "image">) => {
    console.log(userData);
    // Update redux store
    dispatch(updateUser({ ...user, ...userData }));

    setIsModalVisible(false);
    message.success("User information has been successfully updated");
  };

  const onError = (errorInfo: any) => {
    // Handle the form validation errors
    console.log("Form validation error:", errorInfo);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{ marginRight: "1rem" }}
      >
        Edit
      </Button>
      <Modal
        title="Edit User"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout="vertical"
          onError={onError}
        >
          <Form.Item
            name="name"
            label="Name"
            initialValue={name}
            hasFeedback
            rules={[
              {
                required: true,
                min: 3,
                message: "Please provide a name longer than 3 characters",
              },
              // {
              //   validator: validateName,
              // },
            ]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            initialValue={email}
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
              {
                type: "email",
                message: "Please enter a valid email address",
              },
              // {
              //   validator: validateEmail,
              // },
              {
                validator: isEmailDuplicate,
              },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            name="location"
            label="Location"
            initialValue={location}
            rules={[
              {
                required: true,
                message: "Please enter a location",
              },
              // {
              //   validator: validateLocation,
              // },
            ]}
          >
            <Input placeholder="Enter your location" />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default EditUserButton;
