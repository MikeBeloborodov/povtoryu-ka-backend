import express from "express";
import { validateRequestBody } from "../bin/validateRequestBody";
import { validateTokenHeader } from "../bin/validateTokenHeader";
import { veiryJWToken } from "../bin/utils";

require("dotenv").config();

export const validateTeacherTokenHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  let validatedData;
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
    veiryJWToken(validatedData.token, process.env.SECRET_TOKEN_KEY);
    return res.status(200).send({ message: "Verified token." });
  } catch (verificationError) {
    return res.status(400).send({ error: "Wrong JWT." });
  }
};
