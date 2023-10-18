import express from "express";
import { createTokenObject } from "../bin/createTokenObject";
import { checkToken } from "../db/bin/checkToken";

export const checkTeacherTokenHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  let token;
  let tokenErrors;
  // check token with class-validator
  try {
    const [tokenRes, tokenErrorsRes] = await createTokenObject(req.body);
    tokenErrors = tokenErrorsRes;
    if (tokenErrorsRes.length > 0) {
      throw "Bad token body provided";
    }
    token = tokenRes;
  } catch (error) {
    return res
      .status(400)
      .send({ error: "Bad token body provided", error_message: tokenErrors });
  }
  // check token in db
  try {
    const db_res = await checkToken(token.token, token.userName);
    if (db_res) {
      return res.status(200).send(db_res);
    } else {
      throw { error: "Wrong credentials, no such token or teacher." };
    }
  } catch (db_error) {
    return res
      .status(400)
      .send({ error: "Failed checking token in DB", error_message: db_error });
  }
};
