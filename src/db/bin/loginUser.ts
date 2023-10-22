import { User } from "../ormModels/User";
import { UserLoginInformation } from "../../classes/classes";
import { createToken } from "./createToken";

export const loginUser = async (data: UserLoginInformation) => {
  const user = await User.findOne({
    where: { userName: data.userName, password: data.password },
  });
  if (user) {
    const token = createToken();
    user.update({ token: token });
    const res = await user.save();
    return res;
  }
  return user;
};
