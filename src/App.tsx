import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ApiUser,
  fetchUsersSuccess,
  selectFilteredUsers,
} from "../src/store/usersSlice";
import axios, { AxiosError } from "axios";
import { API_URL } from "./constants";
import {
  UserCardsList,
  NewUserButton,
  Loading,
  ErrorComponent,
  SearchBar,
} from "./components";
import styles from "./App.module.css";
import { Row } from "antd";
import { extractUserInfo } from "./utils/extractUserInfo";

type ApiInfo = {
  info: {
    page: number;
    results: number;
    seed: string;
    version: string;
  };
  results: ApiUser[];
};

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch();
  const filteredUsers = useSelector(selectFilteredUsers);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const { data }: { data: ApiInfo } = await axios.get(API_URL);

        const usersArr = data.results.map(extractUserInfo);

        setLoading(false);

        // Update the Redux store with the fetched data
        dispatch(fetchUsersSuccess(usersArr));
      } catch (error: any | AxiosError) {
        if (axios.isAxiosError(error)) {
          const { message, status } = error;
          setError(`Error => status code ${status} - message: ${message}`);
        } else {
          setError(`Error => ${error}`);
        }
        setLoading(false);
      }
    };

    // Call the fetchUsers function when the component mounts
    fetchUsers();
  }, [dispatch]);

  return (
    <>
      <h1 className={styles.appHeader}>The Best User Library App</h1>

      <SearchBar />

      <Row justify={"center"}>
        <NewUserButton />
      </Row>

      {loading && <Loading />}

      {error && <ErrorComponent error={error} />}

      <UserCardsList users={filteredUsers} />
    </>
  );
};

export default App;
