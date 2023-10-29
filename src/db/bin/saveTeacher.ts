import { Teacher as TeacherModel } from "../ormModels/Teacher";
import { TeacherRegInfo } from "../../classes/Teacher";
import bcrypt from "bcrypt";

export const saveTeacher = async (data: TeacherRegInfo) => {
  const saltRounds = 10;
  const hash = bcrypt.hashSync(data.password, saltRounds);
  if (!hash) throw "Hashing error";
  const teacher = TeacherModel.build({
    userName: data.userName,
    password: hash,
  });
  await teacher.save();
};
