import { TeacherLoginBody } from "../interfaces/Teacher";
import { TeacherLoginInfo } from "../classes/Teacher";
import { validate } from "class-validator";
import express from "express";

export const validateTeacherLogin = async (req: express.Request) => {
  const teacherLoginBody: TeacherLoginBody = req.body;
  const teacherObject = new TeacherLoginInfo(teacherLoginBody);
  const validationErrors = await validate(teacherObject);
  if (validationErrors.length > 0) throw validationErrors;
  return teacherObject;
};
