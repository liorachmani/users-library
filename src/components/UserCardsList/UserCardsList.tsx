import React from "react";
import { Row, Col } from "antd";
import { User } from "../../store/usersSlice";
import { UserCard } from "../UserCard";

type UserCardsListProps = {
  users: User[];
};

function UserCardsList(props: UserCardsListProps) {
  const { users } = props;
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      {users.map((user) => (
        <Col key={user.id} xs={24} sm={12} md={8} lg={6}>
          <UserCard user={user} />
        </Col>
      ))}
    </Row>
  );
}

export default UserCardsList;
