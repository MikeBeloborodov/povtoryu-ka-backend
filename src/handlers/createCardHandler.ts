import express from "express";
import { validateRequestBody } from "../bin/validateRequestBody";
import { validateNewCard } from "../bin/validateNewCard";
import { validateTokenHeader } from "../bin/validateTokenHeader";
import { veiryJWToken } from "../bin/utils";
import { JWToken } from "../interfaces/Token";
import { validateRole } from "../bin/validateRole";

export const createCard = async (
  req: express.Request,
  res: express.Response,
) => {
  let validatedData;
  let tokenRaw;
  let verifiedToken;

  // validate req body
  try {
    validatedData = await validateRequestBody(req, validateNewCard);
  } catch (validationError) {
    return res
      .status(400)
      .send({ error: "Wrong request body", error_message: validationError });
  }

  // validate req header
  try {
    tokenRaw = await validateTokenHeader(req);
  } catch (validationError) {
    return res.status(400).send({ error: "No JWT provided." });
  }

  // verify token
  try {
    verifiedToken = veiryJWToken(
      tokenRaw.token,
      process.env.SECRET_TOKEN_KEY,
    ) as JWToken;
  } catch (verificationError) {
    return res.status(400).send({ error: "Wrong JWT." });
  }

  // validate role
  try {
    const isValid = await validateRole(verifiedToken.userName, "teacher");
    if (!isValid) {
      return res
        .status(403)
        .send({ error: "You are not allowed to delete users." });
    }
  } catch (dbError) {
    return res.status(500).send({ error: "Error with DB. Call admin." });
  }
};
