import express from "express";
import { validateNewStudentToken } from "../bin/validateNewStudentToken";
import { validateToken } from "../db/bin/validateToken";
import { saveNewStudentCode } from "../db/bin/saveNewStudentCode";
import { validateRequestBody } from "../bin/validateRequestBody";

export const registerNewStudentCodeHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  // validate req body
  let validatedData;
  try {
    validatedData = await validateRequestBody(req, validateNewStudentToken);
  } catch (validationError) {
    return res.status(400).send({
      error: "Wrong request body.",
      error_message: validationError,
    });
  }

  // validate teacher token
  try {
    if (
      !(await validateToken(
        validatedData.token,
        validatedData.teacherName,
        "teacher",
      ))
    ) {
      return res.status(400).send({
        error_message: "Provided teacher token or username is invalid.",
      });
    }
  } catch (db_errors) {
    return res.status(500).send({
      error: "Error with DB. Call admin.",
    });
  }

  // save new student code
  try {
    const newStudentCode = await saveNewStudentCode(
      validatedData.teacherName,
      validatedData.studentName,
    );
    return res.status(201).send(newStudentCode);
  } catch (db_error) {
    return res.status(500).send({ error: "Error with DB. Call admin." });
  }
};
