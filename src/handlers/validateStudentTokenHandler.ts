import express from "express";
import { validateTokenHeader } from "../bin/validateTokenHeader";
import { validateRequestBody } from "../bin/validateRequestBody";
import { veiryJWToken } from "../bin/utils";

require("dotenv").config();

export const validateStudentTokenHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  let validatedData;

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
    veiryJWToken(validatedData.token, process.env.SECRET_TOKEN_KEY);
    return res.status(200).send({ message: "Verified token." });
  } catch (verificationError) {
    return res.status(400).send({ error: "Wrong JWT." });
  }
};
