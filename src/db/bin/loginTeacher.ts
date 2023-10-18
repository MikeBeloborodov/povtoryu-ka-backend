import { Teacher } from "../ormModels/Teacher";
import { TeacherLoginInformation } from "../../classes/classes";
import { createToken } from "./createToken";

export const loginTeacher = async (data: TeacherLoginInformation) => {
  const teacher = await Teacher.findOne({
    where: { userName: data.userName, password: data.password },
  });
  if (teacher) {
    const token = createToken();
    teacher.update({ token: token });
    const res = await teacher.save();
    return res;
  }
  return teacher;
};
