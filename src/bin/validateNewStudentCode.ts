import { NewStudentCodeInfo } from "../classes/Student";
import { NewStudentCodeRequestBody } from "../interfaces/Student";
import { TokenReqBody } from "../interfaces/Token";
import { TokenInfo } from "../classes/Token";
import { validate } from "class-validator";
import express from "express";

export const validateNewStudentCode = async (req: express.Request) => {
  const data: any = {};

  // validate JWT
  const tokenHeader = req.header("Authorization")?.replace("Bearer ", "");
  const tokenBody: TokenReqBody = { token: tokenHeader };
  const token = new TokenInfo(tokenBody);
  let validationErrors = await validate(token);
  if (validationErrors.length > 0) throw validationErrors;
  data.jwt = token;

  // validate request body
  const newCodeData: NewStudentCodeRequestBody = req.body;
  const studentCodeInfo = new NewStudentCodeInfo(newCodeData);
  validationErrors.concat(await validate(studentCodeInfo));
  if (validationErrors.length > 0) {
    throw validationErrors;
  } else {
    data.codeInfo = studentCodeInfo;
    return data;
  }
};
