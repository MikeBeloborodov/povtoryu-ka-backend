import { Teacher as TeacherModel } from "../ormModels/Teacher";
import { Teacher as TeacherClass } from "../../classes/classes";
import { TeacherCode } from "../ormModels/TeacherCode";

export const saveTeacher = async (
  data: TeacherClass,
): Promise<TeacherClass> => {
  const code = await TeacherCode.findOne({ where: { code: data.specialCode } });
  if (code) {
    const teacher = TeacherModel.build({
      userName: data.userName,
      password: data.password,
    });
    const res: any = await teacher.save();
    const answer = new TeacherClass();
    answer.userName = res.userName;
    answer.id = res.id;
    answer.createdAt = res.createdAt;
    answer.updatedAt = res.updatedAt;
    return answer;
  } else {
    throw "Wrong special code";
  }
};
