import { NewStudentCodeInfo } from "../classes/Student";
import { NewStudentCodeRequestBody } from "../interfaces/Student";
import { validate } from "class-validator";
import express from "express";

export const validateNewStudentCode = async (req: express.Request) => {
  const newTokenData: NewStudentCodeRequestBody = req.body;
  const studentToken = new NewStudentCodeInfo(newTokenData);
  const validationErrors = await validate(studentToken);
  if (validationErrors.length > 0) {
    throw validationErrors;
  } else {
    return studentToken;
  }
};
