import { Student as StudentModel } from "../ormModels/Student";
import { Student as StudentClass } from "../../classes/Student";
import { StudentCode } from "../ormModels/StudentCode";
import bcrypt from "bcrypt";

export const saveStudent = async (studentInfo: StudentClass) => {
  const saltRounds = 10;
  bcrypt.hash(
    studentInfo.password,
    saltRounds,
    async (error: any, hash: string) => {
      if (error) throw error;
      const studentCode: any = await StudentCode.findOne({
        where: { code: studentInfo.specialCode },
      });
      const user = StudentModel.build({
        userName: studentInfo.userName,
        password: hash,
        teacherId: studentCode.teacherId,
        nickname: studentCode.nickname,
      });
      await user.save();
    },
  );
};
