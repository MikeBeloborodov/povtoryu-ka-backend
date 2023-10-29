import { Teacher as TeacherModel } from "../ormModels/Teacher";
import { TeacherRegInfo } from "../../classes/Teacher";
import bcrypt from "bcrypt";

export const saveTeacher = async (data: TeacherRegInfo) => {
  const saltRounds = 10;
  bcrypt.hash(data.password, saltRounds, async (error: any, hash: string) => {
    if (error) throw error;
    const teacher = TeacherModel.build({
      userName: data.userName,
      password: hash,
    });
    await teacher.save();
  });
};
