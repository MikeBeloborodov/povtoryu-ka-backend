import { validate, ValidationError } from "class-validator";
import { Teacher } from "../classes/classes";
import { TeacherRegistrationData } from "../interfaces/interfaces";

export const createTeacherObject = async (
  data: TeacherRegistrationData,
): Promise<[Teacher, ValidationError[]]> => {
  const teacher = new Teacher();
  teacher.userName = data.userName;
  teacher.password = data.password;
  teacher.specialCode = data.specialCode;
  const errors = await validate(teacher);
  return [teacher, errors];
};
