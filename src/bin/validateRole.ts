import { Student } from "../db/ormModels/Student";
import { Teacher } from "../db/ormModels/Teacher";

export const validateRole = async (userName: string, role: string) => {
  switch (role) {
    case "teacher":
      const teacher = await Teacher.findOne({
        where: {
          userName: userName,
        },
      });
      if (teacher) {
        return true;
      } else {
        return false;
      }
    case "student":
      const student = await Student.findOne({ where: { userName: userName } });
      if (student) {
        return true;
      } else {
        return false;
      }
  }
};
