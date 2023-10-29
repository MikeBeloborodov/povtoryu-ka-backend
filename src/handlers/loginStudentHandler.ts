import express from "express";
import { loginStudent } from "../db/bin/loginStudent";
import { validateRequestBody } from "../bin/validateRequestBody";
import { validateStudentLogin } from "../bin/validateStudentLogin";

export const loginStudentHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  let validatedData;
  // validate req body
  try {
    validatedData = await validateRequestBody(req, validateStudentLogin);
  } catch (validationError) {
    return res.status(400).send({
      error: "Wrong request body.",
      error_message: validationError,
    });
  }

  // check student in DB
  try {
    const token = await loginStudent(validatedData);
    if (token) {
      return res.status(200).send({ token: token });
    } else {
      return res.status(400).send({ error: "Wrong credentials." });
    }
  } catch (db_error) {
    return res.status(500).send({
      error_message: "Error with DB, call admin.",
    });
  }
};
