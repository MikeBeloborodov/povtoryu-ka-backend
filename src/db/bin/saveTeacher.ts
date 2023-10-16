import { Teacher as TeacherModel } from "../ormModels/Teacher";
import { Teacher as TeacherClass } from "../../classes/classes";
import { Model } from "sequelize";

export const saveTeacher = async (data: TeacherClass): Promise<Model> => {
  const teacher = TeacherModel.build({
    userName: data.userName,
    password: data.password,
  });
  const res = await teacher.save();
  return res;
};
