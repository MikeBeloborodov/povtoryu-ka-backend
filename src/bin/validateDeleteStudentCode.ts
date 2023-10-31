import { DeleteStudentCodeInfo } from "../classes/Student";
import { DeleteStudentCodeRequestBody } from "../interfaces/Student";
import { validate } from "class-validator";
import express from "express";

export const validateDeleteStudentCode = async (req: express.Request) => {
  const codeData: DeleteStudentCodeRequestBody = req.body;
  const studentCodeInfo = new DeleteStudentCodeInfo(codeData);
  const validationErrors = await validate(studentCodeInfo);
  if (validationErrors.length > 0) {
    throw validationErrors;
  } else {
    return studentCodeInfo;
  }
};
