import express from "express";
import { loginStudent } from "../db/bin/loginStudent";
import { validateRequestBody } from "../bin/validateRequestBody";
import { validateStudentLogin } from "../bin/validateStudentLogin";

export const loginStudentHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  // validate req body
  try {
    await validateRequestBody(req, validateStudentLogin);
  } catch (validationError) {
    return res.status(400).send({
      error: "Wrong request body.",
      error_message: validationError,
    });
  }

  // check student in DB
  try {
    await loginStudent(req, res);
  } catch (db_error) {
    return res.status(500).send({
      error_message: "Error with DB, call admin.",
    });
  }
};
