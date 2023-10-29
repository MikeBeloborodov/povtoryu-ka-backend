import { StudentCode } from "../ormModels/StudentCode";
import { Teacher } from "../ormModels/Teacher";
import { createCode } from "../bin/createCode";

export const saveNewStudentCode = async (
  teacherUsername: string,
  studentUsername: string,
) => {
  const teacher: any = await Teacher.findOne({
    where: { userName: teacherUsername },
  });
  const code = createCode();
  const newStudentCode = StudentCode.build({
    code: code,
    teacherId: teacher.id,
    nickname: studentUsername,
  });
  const res = await newStudentCode.save();
  return res;
};
