import { Teacher } from "../ormModels/Teacher";

export const deleteTeacher = async (userName: string) => {
  const teacher = await Teacher.findOne({ where: { userName: userName } });
  if (!teacher) return false;
  await teacher.destroy();
  return true;
};
