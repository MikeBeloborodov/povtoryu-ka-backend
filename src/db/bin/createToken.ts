import { randomString } from "./createRandomString";

export const createToken = (): string => {
  return randomString();
};
