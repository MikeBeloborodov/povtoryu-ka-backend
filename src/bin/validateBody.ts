import express from "express";
import { validate } from "class-validator";
import { BodyValidationError } from "../classes/Errors";

export const validateBody = async (req: express.Request, bodyClass: any) => {
  const dataToValidate = new bodyClass(req.body);
  const errors = await validate(dataToValidate);
  if (errors.length > 0) throw new BodyValidationError(errors);
};
