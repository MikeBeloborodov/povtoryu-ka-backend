import { sequelize as seq } from "../db/db";
import { User } from "../db/apiModels/User";
export const testDBHandler = async () => {
  const testUser = User.build({
    userName: "misha",
    password: "misha",
    teacherId: 1,
  });
  testUser.save();
};
