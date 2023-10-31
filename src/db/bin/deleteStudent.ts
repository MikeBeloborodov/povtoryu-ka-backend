import { Student } from "../ormModels/Student";

export const deleteStudent = async (studentName: string, teacherId: number) => {
  const student = await Student.findOne({
    where: { nickname: studentName, teacherId: teacherId },
  });
  if (!student) return false;
  await student.destroy();
  return true;
};
