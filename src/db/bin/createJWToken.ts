import jwt from "jsonwebtoken";

require("dotenv").config();

export const createJWToken = (id: string, userName: string) => {
  const token = jwt.sign(
    { _id: id, userName: userName },
    process.env.SECRET_TOKEN_KEY,
    {
      expiresIn: "365 days",
    },
  );
  return token;
};
