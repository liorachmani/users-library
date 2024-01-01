import { ApiUser } from "./../store/usersSlice";
import { User } from "../store/usersSlice";

/**
 * This function extracts the user information
 * @param apiUser
 * @returns object contains relevant user data
 */
export function extractUserInfo(apiUser: ApiUser): User {
  const name = `${apiUser.name.title} ${apiUser.name.first} ${apiUser.name.last}`;
  const email = apiUser.email;
  const image = apiUser.picture.medium;
  const location = `${apiUser.location.country}, ${apiUser.location.city}, ${apiUser.location.street.name} - ${apiUser.location.street.name}`;
  const id = apiUser.login.uuid;

  return { name, email, image, location, id };
}
