import express from "express";
import { validate } from "class-validator";
import { TeacherCredentialsBody } from "../interfaces/Teacher";
import { TeacherCredentialsInfo } from "../classes/Teacher";

export const validateTeacherCredentials = async (req: express.Request) => {
  const teacherCredentialsBody: TeacherCredentialsBody = req.body;
  const teacherCredentials = new TeacherCredentialsInfo(teacherCredentialsBody);
  const validationError = await validate(teacherCredentials);
  if (validationError.length > 0) throw validationError;
  return teacherCredentials;
};
