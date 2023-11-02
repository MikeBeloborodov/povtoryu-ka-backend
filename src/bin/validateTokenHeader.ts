import { validate } from "class-validator";
import { TokenInfo } from "../classes/Token";
import { TokenReqBody } from "../interfaces/Token";
import express from "express";
import { HeadersValidationError } from "../classes/Errors";

export const validateTokenHeader = async (req: express.Request) => {
  const tokenHeader = req.header("Authorization")?.replace("Bearer ", "");
  const tokenBody: TokenReqBody = { token: tokenHeader };
  const token = new TokenInfo(tokenBody);
  const validationErrors = await validate(token);
  if (validationErrors.length > 0)
    throw new HeadersValidationError(validationErrors);
  return token;
};
