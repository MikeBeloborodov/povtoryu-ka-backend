import express from "express";
import { validateNewStudentCode } from "../bin/validateNewStudentCode";
import { saveNewStudentCode } from "../db/bin/saveNewStudentCode";
import { validateRequestBody } from "../bin/validateRequestBody";
import { veiryJWToken } from "../bin/utils";
import { JWToken } from "../interfaces/Token";
import { validateTokenHeader } from "../bin/validateTokenHeader";

export const registerNewStudentCodeHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  // validate req body
  let validatedData;
  let tokenRaw;
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

  // validate req header
  try {
    tokenRaw = await validateTokenHeader(req);
  } catch (validationError) {}

  // verify teacher token
  try {
    verifiedToken = veiryJWToken(
      tokenRaw.token,
      process.env.SECRET_TOKEN_KEY,
    ) as JWToken;
  } catch (verificationError) {
    return res.status(400).send({ error: "Wrong JWT." });
  }

  // save new student code
  try {
    const newStudentCode = await saveNewStudentCode(
      verifiedToken.userName,
      validatedData.studentName,
    );
    return res.status(201).send(newStudentCode);
  } catch (db_error) {
    return res.status(500).send({ error: "Error with DB. Call admin." });
  }
};
