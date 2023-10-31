import { validate } from "class-validator";
import { StudentDeleteInfo } from "../classes/Student";
import { StudentDeleteRequestBody } from "../interfaces/Student";
import express from "express";

export const validateStudentDelete = async (req: express.Request) => {
  const studentDeleteBody: StudentDeleteRequestBody = req.body;
  const studentDeleteData = new StudentDeleteInfo(studentDeleteBody);
  const validationErrors = await validate(studentDeleteData);
  if (validationErrors.length > 0) throw validationErrors;
  return studentDeleteData;
};
