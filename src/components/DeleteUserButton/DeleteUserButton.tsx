import { Button } from "antd";
import { useDispatch } from "react-redux";
import { deleteUser, User } from "../../store/usersSlice";

type DeleteUserButtonProps = Pick<User, "id">;

function DeleteUserButton(props: DeleteUserButtonProps) {
  const dispatch = useDispatch();

  return (
    <Button danger onClick={() => dispatch(deleteUser(props.id))}>
      Delete
    </Button>
  );
}

export default DeleteUserButton;
