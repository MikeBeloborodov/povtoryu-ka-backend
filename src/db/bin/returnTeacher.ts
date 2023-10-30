import { Teacher } from "../ormModels/Teacher";

export const returnTeacher = async (userName: string) => {
  const teacher = await Teacher.findOne({ where: { userName: userName } });
  return teacher;
};
