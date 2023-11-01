import { validate } from "class-validator";
import express from "express";
import { NewCardRequestBody } from "interfaces/Card";
import { NewCardInfo } from "classes/Card";

export const validateNewCard = async (req: express.Request) => {
  const newCardBody: NewCardRequestBody = req.body;
  const newCardInfo = new NewCardInfo(newCardBody);
  const validationErrors = await validate(newCardInfo);
  if (validationErrors.length > 0) throw validationErrors;
  return newCardInfo;
};
