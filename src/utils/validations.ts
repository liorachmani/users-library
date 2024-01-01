import { message } from "antd";
import { User } from "../store/usersSlice";
import store from "../store/store";

export function validateForm(userFields: Partial<User>) {
  const { name = "", email = "", image, location, id } = userFields;

  if (name.length < 3) {
    message.error("Please provide a name longer than 3 characters.");
    return false;
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email && !emailRegex.test(email)) {
    message.error("Please provide a valid email address.");
    return false;
  }

  return true;
}

export function validateName(_: any, name: string) {
  if (name.length < 3) {
    // message.error("Please provide a name longer than 3 characters.");
    Promise.reject("Please provide a name longer than 3 characters");
  }
  return Promise.resolve();
}

export function validateEmail(_: any, email: string) {
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email && !emailRegex.test(email)) {
    // message.error("Please provide a valid email address.");
    Promise.reject("Please provide a valid email address");
  }

  return Promise.resolve();
}

export function isEmailDuplicate(_: any, emailToCheck: string) {
  const currentState = store.getState();

  // Check if the email already exists in the users array
  const isDuplicate = currentState.users.users.some(
    (user: User) => user.email === emailToCheck
  );

  if (isDuplicate) {
    return Promise.reject("This email address is already in use");
  }

  return Promise.resolve();
}

/**
 * Generic function to check for empty string field
 * @param value
 * @returns
 */
function isEmptyString(value: string) {
  // Check if the value is null or undefined
  if (value === null || value === undefined) {
    return true;
  }

  // Check if the value is a string and has zero length
  if (typeof value === "string" && value.trim() === "") {
    return true;
  }

  // If the value is not null, undefined, or an empty string
  return false;
}

export function validateLocation(_: any, location: string) {
  if (isEmptyString(location)) {
    Promise.reject("Please provide a valid location");
  }

  return Promise.resolve();
}
export function validateImage(_: any, image: string) {
  if (isEmptyString(image)) {
    Promise.reject("Please provide a valid image");
  }

  return Promise.resolve();
}
