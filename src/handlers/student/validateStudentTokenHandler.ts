import express from "express";
import { validateTokenHeader } from "../../bin/validateTokenHeader";
import { validateRequest } from "../../bin/validateRequest";
import { validateJWT } from "../../bin/validateJWT";
import { validateInDB } from "../../db/bin/validateInDB";
import { handleErrors } from "../../bin/handleErrors";
import { checkJWTBlackList } from "../../bin/checkJWTBlackList";

require("dotenv").config();

export const validateStudentTokenHandler = async (
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
      checkJWTBlackList: checkJWTBlackList,
      role: "student",
    });

    return res.status(200).send({ message: "Token is valid" });

    // error handling
  } catch (error) {
    handleErrors(res, error);
  }
};
