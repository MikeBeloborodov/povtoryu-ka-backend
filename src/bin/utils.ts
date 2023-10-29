import jwt from "jsonwebtoken";

export const sleep = async (timeMS: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeMS);
  });
};

export const veiryJWToken = (token: string, SECRET_KEY: string) => {
  const decoded = jwt.verify(token, SECRET_KEY);
  return decoded;
};
