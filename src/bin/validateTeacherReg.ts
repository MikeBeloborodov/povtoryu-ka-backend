import { validate } from "class-validator";
import { TeacherRegInfo } from "../classes/Teacher";
import { TeacherRegBody } from "interfaces/Teacher";
import express from "express";

export const validateTeacherReg = async (req: express.Request) => {
  const teacherRegBody: TeacherRegBody = req.body;
  const teacherRegInfo = new TeacherRegInfo(teacherRegBody);
  const validationErrors = await validate(teacherRegInfo);
  if (validationErrors.length > 0) throw validationErrors;
  return teacherRegInfo;
};
