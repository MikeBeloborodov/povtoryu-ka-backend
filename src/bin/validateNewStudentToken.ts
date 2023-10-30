import { NewStudentCodeInfo } from "../classes/Student";
import { NewStudentCodeRequestBody } from "../interfaces/Student";
import { validate } from "class-validator";
import express from "express";

export const validateNewStudentCode = async (req: express.Request) => {
  const newTokenData: NewStudentTokenRequestBody = req.body;
  const studentToken = new NewStudentTokenInfo(newTokenData);
  const validationErrors = await validate(studentToken);
  if (validationErrors.length > 0) {
    throw validationErrors;
  } else {
    return studentToken;
  }
};

export const validateTokenHeader = async (req: express.Request) => {
  const tokenHeader = req.header("Authorization")?.replace("Bearer ", "");
  const tokenBody: TokenReqBody = { token: tokenHeader };
  const token = new TokenInfo(tokenBody);
  const validationErrors = await validate(token);
  if (validationErrors.length > 0) throw validationErrors;
  return token;
};
