import { User } from "../db/ormModels/User";
export const testDBHandler = async () => {
  const testUser = User.build({
    userName: "misha",
    password: "misha",
    teacherId: 1,
  });
  testUser.save();
};
