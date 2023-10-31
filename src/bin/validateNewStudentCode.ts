import { NewStudentCodeInfo } from "../classes/Student";
import { NewStudentCodeRequestBody } from "../interfaces/Student";
import { validate } from "class-validator";
import express from "express";

export const validateNewStudentCode = async (req: express.Request) => {
  const newCodeData: NewStudentCodeRequestBody = req.body;
  const studentCodeInfo = new NewStudentCodeInfo(newCodeData);
  const validationErrors = await validate(studentCodeInfo);
  if (validationErrors.length > 0) {
    throw validationErrors;
  } else {
    return studentCodeInfo;
  }
};
