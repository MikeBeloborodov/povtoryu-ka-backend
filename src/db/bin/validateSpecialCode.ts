import { StudentCode } from "../ormModels/StudentCode";
import { TeacherCode } from "../ormModels/TeacherCode";

export const validateSpecialCode = async (code: string, entity: string) => {
  switch (entity) {
    case "teacher":
      const teacherCode = await TeacherCode.findOne({ where: { code: code } });
      if (!teacherCode) return false;
      return true;
    case "student":
      const studentCode = await StudentCode.findOne({ where: { code: code } });
      if (!studentCode) return false;
      return true;
  }
};
