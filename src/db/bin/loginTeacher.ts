import { Teacher } from "../ormModels/Teacher";
import { TeacherLoginInfo } from "../../classes/Teacher";
import { createJWToken } from "./createJWToken";
import bcrypt from "bcrypt";

export const loginTeacher = async (data: TeacherLoginInfo) => {
  const teacher: any = await Teacher.scope("withPassword").findOne({
    where: { userName: data.userName },
  });

  if (!teacher) return null;

  // compare provided password and hashed password
  const isMatch = bcrypt.compareSync(data.password, teacher.password);
  if (isMatch) {
    const token = createJWToken(teacher.id, teacher.userName);
    return token;
  } else {
    return null;
  }
};
