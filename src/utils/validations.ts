import { message } from "antd";
import { User } from "../store/usersSlice";
import store from "../store/store";

/**
 * This function validates some user info (currently only checks name, email and location)
 * @param userFields
 * @returns
 */
export function validateForm(
  userFields: Partial<Omit<User, "image">> & { id: string }
) {
  const { name = "", email = "", location = "", id } = userFields;

  // Validate name
  if (name.length < 3) {
    message.error("Please provide a name longer than 3 characters.");
    return false;
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate email address
  if (email && !emailRegex.test(email)) {
    message.error("Please provide a valid email address.");
    return false;
  }

  // Check for duplicate emails
  if (isEmailDuplicate(email, id)) {
    message.error("The email address provided is already in use.");
    return false;
  }

  // Check for non empty location
  if (location.length === 0) {
    message.error("Please enter a location.");
    return false;
  }

  return true;
}

/**
 * This function Checks if the email rntered already exists
 * @param emailToCheck
 * @returns
 */
function isEmailDuplicate(emailToCheck: string, userId: string) {
  const currentState = store.getState();

  // Check if the email already exists in the users array
  const isDuplicate = currentState.users.users.some(
    (user: User) => user.email === emailToCheck && user.id !== userId
  );

  if (isDuplicate) {
    return true;
  }

  return false;
}
