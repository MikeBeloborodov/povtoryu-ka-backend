import express from "express";
import { validateTokenHeader } from "../bin/validateTokenHeader";
import { validateRequest } from "../bin/validateRequest";
import { NewStudentCodeRegistrationClass } from "../classes/Student";
import { validateBody } from "../bin/validateBody";
import { validateJWT } from "../bin/validateJWT";
import { saveNewStudentCode } from "../db/bin/saveNewStudentCode";
import { handleErrors } from "../bin/handleErrors";
import { validateInDB } from "../db/bin/validateInDB";
import { checkJWTBlackList } from "../bin/checkJWTBlackList";

export const registerNewStudentCodeHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    // validate request
    await validateRequest({
      req: req,
      bodyClass: NewStudentCodeRegistrationClass,
      validateBody: validateBody,
      validateHeaders: validateTokenHeader,
      validateJWT: validateJWT,
      checkJWTBlackList: checkJWTBlackList,
      validateInDB: validateInDB,
      role: "teacher",
    });

    // save student code
    const studentCode = await saveNewStudentCode(req);

    return res.status(201).send(studentCode);

    // error handling
  } catch (error) {
    handleErrors(res, error);
  }
};
