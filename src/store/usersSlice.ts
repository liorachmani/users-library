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
  filteredUsers: User[];
};

const initialState: UsersState = {
  users: [],
  filteredUsers: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    fetchUsersSuccess(state: UsersState, action: PayloadAction<User[]>) {
      state.users = action.payload;
      state.filteredUsers = action.payload;
    },

    updateUser(state: UsersState, action: PayloadAction<User>) {
      const { id, image, ...userInfo } = action.payload;
      const existingUser = state.users.find((user: User) => user.id === id);
      const existingUserFiltered = state.filteredUsers.find(
        (user: User) => user.id === id
      );

      if (existingUser) {
        Object.assign(existingUser, userInfo);
      }
      if (existingUserFiltered) {
        Object.assign(existingUserFiltered, userInfo);
      }
    },

    deleteUser(state: UsersState, action: PayloadAction<string>) {
      const id = action.payload;

      state.users = state.users.filter((user: User) => user.id !== id);
      state.filteredUsers = state.filteredUsers.filter(
        (user: User) => user.id !== id
      );
    },

    addUser(state: UsersState, action: PayloadAction<User>) {
      state.users.push(action.payload);
      state.filteredUsers.push(action.payload);
    },

    updateFilteredUsers(state: UsersState, action: PayloadAction<User[]>) {
      state.filteredUsers = action.payload;
    },
  },
});

export const {
  fetchUsersSuccess,
  updateUser,
  deleteUser,
  addUser,
  updateFilteredUsers,
} = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.users;
export const selectFilteredUsers = (state: RootState) =>
  state.users.filteredUsers;

export default usersSlice.reducer;
