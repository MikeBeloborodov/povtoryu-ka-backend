import express from "express";
import { loginTeacher } from "../db/bin/loginTeacher";
import { validateRequestBody } from "../bin/validateRequestBody";
import { validateTeacherLogin } from "../bin/validateTeacherLogin";

export const loginTeacherHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  let validatedData;
  // validate req body
  try {
    validatedData = await validateRequestBody(req, validateTeacherLogin);
  } catch (validationError) {
    return res.status(400).send({ error: "Wrong request body." });
  }

  // login teacher / return token
  try {
    await loginTeacher(res, validatedData);
  } catch (db_error) {
    return res.status(500).send({
      error_message: "Error with DB. Call admin.",
    });
  }
};
