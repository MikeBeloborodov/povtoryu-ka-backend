import express from "express";
import { JWToken } from "../interfaces/Token";
import { veiryJWToken } from "../bin/utils";
import { validateRequestBody } from "../bin/validateRequestBody";
import { deleteStudentCode } from "../db/bin/deleteStudentCode";
import { validateDeleteStudentCode } from "../bin/validateDeleteStudentCode";
import { validateTokenHeader } from "../bin/validateTokenHeader";

export const deleteStudentCodeHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  let validatedData;
  let JWToken;
  let tokenRaw;
  // validate req body
  try {
    validatedData = await validateRequestBody(req, validateDeleteStudentCode);
  } catch (validationErrors) {
    return res
      .status(400)
      .send({ error: "Wrong request body", error_message: validationErrors });
  }
  //
  // validate req header
  try {
    tokenRaw = await validateTokenHeader(req);
  } catch (validationError) {
    return res
      .status(400)
      .send({ error: "Wrong request body", error_message: validationError });
  }

  // verify teacher token
  try {
    JWToken = veiryJWToken(
      tokenRaw.token,
      process.env.SECRET_TOKEN_KEY,
    ) as JWToken;
  } catch (verificationError) {
    return res.status(400).send({ error: "Wrong JWT." });
  }

  // delete teacher from DB
  try {
    const isDeleted = await deleteStudentCode(
      JWToken.id,
      validatedData.studentName,
    );
    if (isDeleted) {
      return res.status(200).send({ message: "Student code deleted." });
    } else {
      return res
        .status(400)
        .send({ error: "Could not find student code in DB" });
    }
  } catch (dbError) {
    return res.status(500).send({ error: "Error with DB. Call admin." });
  }
};
