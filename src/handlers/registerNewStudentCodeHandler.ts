import express from "express";
import { validateNewStudentToken } from "../bin/validateNewStudentToken";
import { saveNewStudentCode } from "../db/bin/saveNewStudentCode";
import { validateRequestBody } from "../bin/validateRequestBody";
import { veiryJWToken } from "../bin/utils";

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
    veiryJWToken(validatedData.token, process.env.SECRET_TOKEN_KEY);
  } catch (verificationError) {
    return res.status(400).send({ error: "Wrong JWT." });
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
