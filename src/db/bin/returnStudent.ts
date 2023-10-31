import { Student } from "../ormModels/Student";

export const returnStudent = async (userName: string) => {
  const teacher = await Student.findOne({ where: { userName: userName } });
  return teacher;
};
