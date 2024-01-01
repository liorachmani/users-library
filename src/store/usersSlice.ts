import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./rootReducer";

export type ApiUser = {
  cell: string;
  dob: { date: string; age: number };
  email: string;
  gender: string;
  id: { name: string; value: string | null };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number;
  };
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
  };
  name: { title: string; first: string; last: string };
  nat: string;
  phone: string;
  picture: { large: string; medium: string; thumbnail: string };
  registered: { date: string; age: number };
};

export type User = {
  name: string;
  email: string;
  location: string;
  image: string;
  id: string;
};

type UsersState = {
  users: User[];
};

const initialState: UsersState = {
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsersSuccess(state: UsersState, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    updateUser(state: UsersState, action: PayloadAction<User>) {
      const { id, image, ...userInfo } = action.payload;
      let existingUser = state.users.find((user: User) => user.id === id);

      if (existingUser) {
        Object.assign(existingUser, userInfo);
      }
    },
  },
});

export const { fetchUsersSuccess, updateUser } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users;

export default usersSlice.reducer;
