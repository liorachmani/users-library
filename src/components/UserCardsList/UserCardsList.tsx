import React from "react";
import { Row, Col } from "antd";
import { User } from "../../store/usersSlice";
import { UserCard } from "../UserCard";

type UserCardsListProps = {
  users: User[];
  //   onEdit: (editedUser: User) => void;
};

function UserCardsList(props: UserCardsListProps) {
  const { users } = props;
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      {users.map((user) => (
        <Col span={6} key={user.id}>
          <UserCard user={user} />
        </Col>
      ))}
    </Row>
  );
}

export default UserCardsList;
