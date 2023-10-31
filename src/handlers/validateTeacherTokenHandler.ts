import express from "express";
import { validateRequestBody } from "../bin/validateRequestBody";
import { validateTokenHeader } from "../bin/validateTokenHeader";
import { veiryJWToken } from "../bin/utils";
import { returnTeacher } from "../db/bin/returnTeacher";
import { JWToken } from "interfaces/Token";

require("dotenv").config();

export const validateTeacherTokenHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  let validatedData;
  let JWToken;
  // validate req body
  try {
    validatedData = await validateRequestBody(req, validateTokenHeader);
  } catch (validationErrors) {
    return res
      .status(400)
      .send({ error: "Wrong request body", error_message: validationErrors });
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

  // search teacher in database
  try {
    const teacher = await returnTeacher(JWToken.userName);
    if (teacher) {
      return res.status(200).send({ message: "Verified token." });
    } else {
      res.status(400).send({ error: "No teacher registred with this JWT." });
    }
  } catch (dbError) {
    return res.status(500).send({ error: "Error with DB. Call admin." });
  }
};
