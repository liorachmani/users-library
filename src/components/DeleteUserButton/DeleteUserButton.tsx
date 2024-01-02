import { Button, Modal } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUser, User } from "../../store/usersSlice";

type DeleteUserButtonProps = Pick<User, "id">;

function DeleteUserButton(props: DeleteUserButtonProps) {
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button danger onClick={showModal}>
        Delete
      </Button>

      <Modal
        title="Delet User"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={() => dispatch(deleteUser(props.id))}
      >
        <div>
          Are you sure you want to delete the user with id "{props.id}" ?
        </div>
      </Modal>
    </>
  );
}

export default DeleteUserButton;
