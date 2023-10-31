import jwt from "jsonwebtoken";

require("dotenv").config();

export const createJWToken = (id: string, userName: string, role: string) => {
  const token = jwt.sign(
    { id: id, userName: userName, role: role },
    process.env.SECRET_TOKEN_KEY,
    {
      expiresIn: "365 days",
    },
  );
  return token;
};
