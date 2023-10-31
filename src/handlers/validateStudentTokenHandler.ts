import express from "express";
import { validateTokenHeader } from "../bin/validateTokenHeader";
import { validateRequestBody } from "../bin/validateRequestBody";
import { veiryJWToken } from "../bin/utils";
import { JWToken } from "../interfaces/Token";
import { returnStudent } from "../db/bin/returnStudent";

require("dotenv").config();

export const validateStudentTokenHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  let validatedData;
  let JWToken;

  // validate req body
  try {
    validatedData = await validateRequestBody(req, validateTokenHeader);
  } catch (validationError) {
    return res
      .status(400)
      .send({ error: "Wrong request body", error_message: validationError });
  }

  // verify jwt
  try {
    JWToken = veiryJWToken(
      validatedData.token,
      process.env.SECRET_TOKEN_KEY,
    ) as JWToken;
  } catch (verificationError) {
    return res.status(400).send({ error: "Wrong JWT." });
  }

  // search student in database
  try {
    const student = await returnStudent(JWToken.userName);
    if (student) {
      return res.status(200).send({ message: "Verified token." });
    } else {
      res.status(400).send({ error: "No student registred with this JWT." });
    }
  } catch (dbError) {
    return res.status(500).send({ error: "Error with DB. Call admin." });
  }
};
