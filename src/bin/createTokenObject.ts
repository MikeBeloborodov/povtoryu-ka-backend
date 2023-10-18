import { ValidationError, validate } from "class-validator";
import { Token as TokenClass } from "../classes/classes";
import { Token as TokenInterface } from "../interfaces/interfaces";
export const createTokenObject = async (
  tokenData: TokenInterface,
): Promise<[TokenClass, ValidationError[]]> => {
  const token = new TokenClass();
  token.token = tokenData.token;
  token.userName = tokenData.userName;
  const errors = await validate(token);
  return [token, errors];
};
