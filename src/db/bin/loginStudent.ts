import { Student } from "../ormModels/Student";
import { StudentLoginInfo } from "../../classes/Student";
import { createJWToken } from "./createJWToken";
import bcrypt from "bcrypt";

export const loginStudent = async (studentData: StudentLoginInfo) => {
  const student: any = await Student.scope("withPassword").findOne({
    where: { userName: studentData.userName },
  });
  if (!student) return null;

  const isMatch = bcrypt.compareSync(studentData.password, student.password);
  if (isMatch) {
    const token = createJWToken(student.id, student.userName, student.role);
    return token;
  } else {
    return null;
  }
};
