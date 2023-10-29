import express from "express";
import { validateTokenBody } from "../bin/validateTokenBody";
import { validateToken } from "../db/bin/validateToken";
import { validateRequestBody } from "../bin/validateRequestBody";

export const validateStudentTokenHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  let validatedData;
  // validate req body
  try {
    validatedData = await validateRequestBody(req, validateTokenBody);
  } catch (validationError) {
    return res
      .status(400)
      .send({ error: "Wrong request body", error_message: validationError });
  }

  // check token in db
  try {
    const db_res = await validateToken(
      validatedData.token,
      validatedData.userName,
      "user",
    );
    if (db_res) {
      return res.status(200).send(db_res);
    } else {
      return res
        .status(400)
        .send({ error: "Wrong credentials, no such token or user." });
    }
  } catch (db_error) {
    return res.status(500).send({ error: "Error with DB. Call admin." });
  }
};
