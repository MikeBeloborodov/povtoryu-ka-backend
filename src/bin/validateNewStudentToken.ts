import { NewStudentTokenInfo } from "../classes/Student";
import { NewStudentTokenRequestBody } from "../interfaces/Student";
import { validate } from "class-validator";
import express from "express";

export const validateNewStudentToken = async (req: express.Request) => {
  const newTokenData: NewStudentTokenRequestBody = req.body;
  const studentToken = new NewStudentTokenInfo(newTokenData);
  const validationErrors = await validate(studentToken);
  if (validationErrors.length > 0) {
    throw validationErrors;
  } else {
    return studentToken;
  }
};
