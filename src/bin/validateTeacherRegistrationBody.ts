import { validate } from "class-validator";
import { TeacherRegistrationClass } from "../classes/Teacher";
import { TeacherRegistrationBody } from "../interfaces/Teacher";
import { BodyValidationError } from "../classes/Errors";
import express from "express";

export const validateTeacherRegistrationBody = async (req: express.Request) => {
  const teacherRegBody: TeacherRegistrationBody = req.body;
  const teacherRegClass = new TeacherRegistrationClass(teacherRegBody);
  const validationErrors = await validate(teacherRegClass);
  if (validationErrors.length > 0)
    throw new BodyValidationError(validationErrors);
};
