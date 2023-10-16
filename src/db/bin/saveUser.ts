import { User as UserModel } from "../ormModels/User";
import { User as UserClass } from "../../classes/classes";

export const saveUser = async (data: UserClass) => {
  try {
    const user = UserModel.build({
      userName: data.userName,
      password: data.password,
      teacherId: data.teacherId,
    });
    user.save();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
