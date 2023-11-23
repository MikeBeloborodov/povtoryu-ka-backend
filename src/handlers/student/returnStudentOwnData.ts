import express from "express";
import { validateTokenHeader } from "../../bin/validateTokenHeader";
import { validateRequest } from "../../bin/validateRequest";
import { validateJWT } from "../../bin/validateJWT";
import { validateInDB } from "../../db/bin/validateInDB";
import { handleErrors } from "../../bin/handleErrors";
import { returnStudentData } from "../../db/bin/students/returnStudentData";

export const returnStudentOwnData = async (
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
    });

    // get students data from db
    const student = await returnStudentData(req, true);

    return res.status(200).send(student);

    // error handling
  } catch (error) {
    handleErrors(res, error);
  }
};
