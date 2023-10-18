import { UserCode } from "../ormModels/UserCode";
import { Teacher } from "../ormModels/Teacher";
import { createToken } from "../bin/createToken";

export const saveNewStudentToken = async (
  teacherUsername: string,
  studentUsername: string,
) => {
  const teacher: any = await Teacher.findOne({
    where: { userName: teacherUsername },
  });
  const code = createToken();
  const newUserCode = UserCode.build({
    code: code,
    teacherId: teacher.id,
    nickname: studentUsername,
  });
  const res = await newUserCode.save();
  return res;
};
