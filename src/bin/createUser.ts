import { validate, ValidationError } from "class-validator";
import { User } from "../classes/classes";
import { UserRegistrationData } from "../interfaces/interfaces";

export const createUserObject = async (
  data: UserRegistrationData,
): Promise<[User, ValidationError[]]> => {
  const user = new User();
  user.userName = data.userName;
  user.password = data.password;
  user.specialCode = data.specialCode;
  const errors = await validate(user);
  return [user, errors];
};
