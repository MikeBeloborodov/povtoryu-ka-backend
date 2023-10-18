import { NewStudentToken } from "../classes/classes";
import { NewUserTokenData } from "../interfaces/interfaces";
import { validate, ValidationError } from "class-validator";

export const createNewUserToken = async (
  userData: NewUserTokenData,
): Promise<[NewStudentToken, ValidationError[]]> => {
  const studentToken = new NewStudentToken();
  studentToken.studentName = userData.studentName;
  studentToken.token = userData.token;
  studentToken.teacherName = userData.teacherName;
  const errors = await validate(studentToken);

  return [studentToken, errors];
};
