import React from "react";
import { Card, Avatar } from "antd";
import styles from "./UserCard.module.css";
import { User } from "../../store/usersSlice";
import { EditUserButton } from "../EditUserButton";
import { DeleteUserButton } from "../DeleteUserButton";

type UserCardProps = {
  user: User;
};

const UserCard = (props: UserCardProps) => {
  const { user } = props;
  return (
    <Card className={styles.userCard}>
      <div className={styles.imageContainer}>
        <Avatar size={80} src={user.image} />
      </div>
      <div className={styles.detailsContainer}>
        <div className={styles.details}>
          <strong>Name:</strong> {user.name}
        </div>
        <div className={styles.details}>
          <strong>Email:</strong> {user.email}
        </div>
        <div className={styles.details}>
          <strong>Location:</strong> {user.location}
        </div>
        <div className={styles.details}>
          <strong>UUID:</strong> {user.id}
        </div>
      </div>
      <br />
      <EditUserButton user={user} />
      <DeleteUserButton id={user.id} />
    </Card>
  );
};

export default UserCard;
