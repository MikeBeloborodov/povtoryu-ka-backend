import { Teacher } from "../ormModels/Teacher";

export const checkToken = async (token: string, userName: string) => {
  const teacher = await Teacher.findOne({
    where: { token: token, userName: userName },
  });
  return teacher;
};
