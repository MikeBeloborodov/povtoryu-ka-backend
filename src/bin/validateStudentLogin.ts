import { StudentLoginRequestBody } from "../interfaces/Student";
import { StudentLoginInfo } from "../classes/Student";
import { validate } from "class-validator";
import express from "express";

export const validateStudentLogin = async (req: express.Request) => {
  const loginBody: StudentLoginRequestBody = req.body;
  const studentInfoObject = new StudentLoginInfo(loginBody);
  const errors = await validate(studentInfoObject);
  if (errors.length > 0) throw errors;
  return studentInfoObject;
};
