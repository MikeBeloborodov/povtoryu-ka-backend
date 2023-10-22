import { User as UserModel } from "../ormModels/User";
import { User as UserClass } from "../../classes/classes";
import { UserCode } from "../ormModels/UserCode";

export const saveUser = async (data: UserClass): Promise<UserClass> => {
  const code: any = await UserCode.findOne({
    where: { code: data.specialCode },
  });
  const user = UserModel.build({
    userName: data.userName,
    password: data.password,
    teacherId: code.teacherId,
    nickname: code.nickname,
  });
  const res: any = await user.save();
  const answer = new UserClass();
  answer.id = res.id;
  answer.updatedAt = res.updatedAt;
  answer.createdAt = res.createdAt;
  answer.userName = res.userName;
  answer.teacherId = res.teacherId;
  answer.nickname = res.nickname;
  return answer;
};
