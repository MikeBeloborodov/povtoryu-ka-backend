import express from "express";
import { validateRequest } from "../bin/validateRequest";
import { validateTokenHeader } from "../bin/validateTokenHeader";
import { validateJWT } from "../bin/validateJWT";
import { validateInDB } from "../db/bin/validateInDB";
import { handleErrors } from "../bin/handleErrors";

require("dotenv").config();

export const validateTeacherTokenHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    // validate request
    await validateRequest({
      req: req,
      validateHeaders: validateTokenHeader,
      validateJWT: validateJWT,
      validateInDB: validateInDB,
      role: "teacher",
    });

    return res.status(200).send({ message: "Token is valid" });

    // error handling
  } catch (error) {
    handleErrors(res, error);
  }
};
