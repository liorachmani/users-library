import React from "react";
import { useSelector } from "react-redux";
import { selectFilteredUsers } from "../src/store/usersSlice";
import {
  UserCardsList,
  NewUserButton,
  Loading,
  ErrorComponent,
  SearchBar,
} from "./components";
import styles from "./App.module.css";
import { useFetchUsers } from "./hooks/useFetchUsers";

const App: React.FC = () => {
  const { loading, error } = useFetchUsers();
  const filteredUsers = useSelector(selectFilteredUsers);

  return (
    <>
      <h1 className={styles.appHeader}>The Best User Library App</h1>

      <SearchBar />

      <NewUserButton />

      {loading && <Loading />}

      {error && <ErrorComponent error={error} />}

      <UserCardsList users={filteredUsers} />
    </>
  );
};

export default App;
