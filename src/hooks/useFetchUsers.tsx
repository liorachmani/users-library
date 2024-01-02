import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { API_URL } from "../constants";
import { ApiUser, fetchUsersSuccess } from "../store/usersSlice";
import { extractUserInfo } from "../utils/extractUserInfo";

type ApiInfo = {
  info: {
    page: number;
    results: number;
    seed: string;
    version: string;
  };
  results: ApiUser[];
};
export const useFetchUsers = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const dispatch = useDispatch();

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

  return { loading, error };
};
