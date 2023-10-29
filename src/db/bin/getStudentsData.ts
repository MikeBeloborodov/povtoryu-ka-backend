import { Teacher } from "../ormModels/Teacher";
import { Student } from "../ormModels/Student";

export const getStudentsData = async (userName: string) => {
  const teacher: any = await Teacher.findOne({ where: { userName: userName } });
  if (teacher) {
    const users = await Student.scope("teacherScope").findAll({
      where: { teacherId: teacher.id },
    });
    return users;
  } else {
    return null;
  }
};
