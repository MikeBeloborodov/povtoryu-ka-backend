import express from "express";
import { validateNewStudentCode } from "../bin/validateNewStudentCode";
import { saveNewStudentCode } from "../db/bin/saveNewStudentCode";
import { validateRequestBody } from "../bin/validateRequestBody";
import { veiryJWToken } from "../bin/utils";
import { JWToken } from "../interfaces/Token";

export const registerNewStudentCodeHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  // validate req body
  let validatedData;
  let verifiedToken;
  try {
    validatedData = await validateRequestBody(req, validateNewStudentCode);
  } catch (validationError) {
    console.log(validationError);
    return res.status(400).send({
      error: "Wrong request body.",
      error_message: validationError,
    });
  }

  // validate teacher token
  try {
    verifiedToken = veiryJWToken(
      validatedData.jwt.token,
      process.env.SECRET_TOKEN_KEY,
    ) as JWToken;
  } catch (verificationError) {
    return res.status(400).send({ error: "Wrong JWT." });
  }

  // save new student code
  try {
    console.log(validatedData);
    console.log(verifiedToken);
    const newStudentCode = await saveNewStudentCode(
      verifiedToken.userName,
      validatedData.codeInfo.studentName,
    );
    return res.status(201).send(newStudentCode);
  } catch (db_error) {
    console.log(db_error);
    return res.status(500).send({ error: "Error with DB. Call admin." });
  }
};
