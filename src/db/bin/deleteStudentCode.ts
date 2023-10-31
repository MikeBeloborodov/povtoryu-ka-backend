import { StudentCode } from "../ormModels/StudentCode";

export const deleteStudentCode = async (
  teacherId: number,
  studentName: string,
) => {
  const code = await StudentCode.findOne({
    where: { teacherId: teacherId, nickname: studentName },
  });
  if (!code) return false;
  await code.destroy();
  return true;
};
