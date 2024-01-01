import { Button, Form, Input, message, Modal } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser, User } from "../../store/usersSlice";
import { validateForm } from "../../utils/validations";

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
    if (!validateForm({ ...userData, id: user.id })) return;

    // Update redux store
    dispatch(updateUser({ ...user, ...userData }));

    setIsModalVisible(false);
    message.success("User information has been successfully updated");
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
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item name="name" label="Name" initialValue={name}>
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item name="email" label="Email" initialValue={email}>
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item name="location" label="Location" initialValue={location}>
            <Input placeholder="Enter your location" />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            <Button onClick={handleCancel} style={{ marginRight: "1rem" }}>
              Cancel
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

export default EditUserButton;
