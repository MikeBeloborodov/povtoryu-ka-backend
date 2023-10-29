import { validate } from "class-validator";
import { StudentRegInfo } from "../classes/Student";
import { StudentRegRequestBody } from "../interfaces/Student";
import express from "express";

export const validateStudentRegBody = async (req: express.Request) => {
  const studentRegData: StudentRegRequestBody = req.body;
  const student = new StudentRegInfo(studentRegData);
  const validationErrors = await validate(student);
  if (validationErrors.length > 0) throw validationErrors;
  return student;
};
