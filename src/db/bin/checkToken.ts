import { Teacher } from "../ormModels/Teacher";
import { User } from "../ormModels/User";

export const checkToken = async (
  token: string,
  userName: string,
  entity: string,
) => {
  switch (entity) {
    case "teacher":
      const teacher = await Teacher.findOne({
        where: { token: token, userName: userName },
      });
      return teacher;
    case "user":
      const user = await User.findOne({
        where: { token: token, userName: userName },
      });
      return user;
  }
};
