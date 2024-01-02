import React, { useState } from "react";
import { Input, Row, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { selectUsers, updateFilteredUsers, User } from "../../store/usersSlice";
import styles from "./SearchBar.module.css";

const { Search } = Input;
const { Option } = Select;

const SearchBar = () => {
  // State to indicate what field we are filtering on
  const [searchItem, setSearchItem] = useState<keyof User>("name");

  const [searchQuery, setSearchQuery] = useState("");
  const allUsers = useSelector(selectUsers);
  const dispatch = useDispatch();

  const handleSearch = (value: string) => {
    // Filter users based on the selected search item and query
    const usersAfterFilter: User[] = allUsers.filter((user) =>
      user[searchItem].toLowerCase().includes(value.toLowerCase())
    );

    // Dispatch an action to update the filtered users in the Redux store
    dispatch(updateFilteredUsers(usersAfterFilter));
  };

  const handleSelectChange = (value: keyof User) => {
    setSearchItem(value);
  };

  return (
    <Row
      gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      className={styles.searchBarContainer}
    >
      <Search
        placeholder={`Search by ${searchItem}`}
        onSearch={handleSearch}
        enterButton
        onChange={(e) => setSearchQuery(e.target.value)}
        className={styles.searchBarInput}
        value={searchQuery}
      />
      <Select
        value={searchItem}
        onChange={handleSelectChange}
        className={styles.searchBarDropdownMenu}
      >
        <Option value="name">Name</Option>
        <Option value="email">Email</Option>
        <Option value="id">ID</Option>
        <Option value="location">Location</Option>
      </Select>
    </Row>
  );
};

export default SearchBar;
