import express from "express";
import { validateToken } from "../db/bin/validateToken";
import { validateRequestBody } from "../bin/validateRequestBody";
import { validateTokenBody } from "../bin/validateTokenBody";

export const validateTeacherTokenHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  let validatedData;
  // validate req body
  try {
    validatedData = await validateRequestBody(req, validateTokenBody);
  } catch (validationErrors) {
    return res
      .status(400)
      .send({ error: "Wrong request body", error_message: validationErrors });
  }

  // check token in db
  try {
    const db_res = await validateToken(
      validatedData.token,
      validatedData.userName,
      "teacher",
    );
    if (db_res) {
      return res.status(200).send(db_res);
    } else {
      return res
        .status(400)
        .send({ error: "Wrong credentials, no such token or teacher." });
    }
  } catch (db_error) {
    return res.status(500).send({ error: "Error with DB. Call admin." });
  }
};
