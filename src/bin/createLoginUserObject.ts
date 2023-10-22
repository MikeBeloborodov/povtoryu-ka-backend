import { UserLoginData } from "../interfaces/interfaces";
import { UserLoginInformation } from "../classes/classes";
import { validate, ValidationError } from "class-validator";

export const createLoginUserObject = async (
  teacherData: UserLoginData,
): Promise<[UserLoginInformation, ValidationError[]]> => {
  const userObject = new UserLoginInformation();
  userObject.userName = teacherData.userName;
  userObject.password = teacherData.password;
  const errors = await validate(userObject);
  return [userObject, errors];
};
