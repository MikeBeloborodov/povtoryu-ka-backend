import { TeacherLoginData } from "../interfaces/interfaces";
import { TeacherLoginInformation } from "../classes/classes";
import { validate, ValidationError } from "class-validator";

export const createLoginTeacherObject = async (
  teacherData: TeacherLoginData,
): Promise<[TeacherLoginInformation, ValidationError[]]> => {
  const teacherObject = new TeacherLoginInformation();
  teacherObject.userName = teacherData.userName;
  teacherObject.password = teacherData.password;
  const errors = await validate(teacherObject);
  return [teacherObject, errors];
};
