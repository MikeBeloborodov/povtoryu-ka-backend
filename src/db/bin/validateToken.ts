import { Teacher } from "../ormModels/Teacher";
import { Student } from "../../db/ormModels/Student";

export const validateToken = async (
  token: string,
  userName: string,
  entity: string,
) => {
  switch (entity) {
    case "teacher":
      const teacher = await Teacher.findOne({
        where: { token: token, userName: userName },
      });
      return teacher ? true : false;
    case "user":
      const user = await Student.findOne({
        where: { token: token, userName: userName },
      });
      return user ? true : false;
  }
};
