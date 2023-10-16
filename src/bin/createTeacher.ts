import { validate, ValidationError } from "class-validator";
import { Teacher } from "../classes/classes";
import { TeacherData } from "../interfaces/interfaces";

export const createTeacherObject = async (
  data: TeacherData,
): Promise<[Teacher, ValidationError[]]> => {
  const teacher = new Teacher();
  teacher.userName = data.userName;
  teacher.password = data.password;
  const errors = await validate(teacher);
  return [teacher, errors];
};
