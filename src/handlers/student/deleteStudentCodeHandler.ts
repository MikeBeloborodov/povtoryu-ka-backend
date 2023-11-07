import express from "express";
import { deleteStudentCode } from "../../db/bin/deleteStudentCode";
import { validateTokenHeader } from "../../bin/validateTokenHeader";
import { validateRequest } from "../../bin/validateRequest";
import { DeleteStudentCodeClass } from "../../classes/Student";
import { validateBody } from "../../bin/validateBody";
import { validateJWT } from "../../bin/validateJWT";
import { handleErrors } from "../../bin/handleErrors";
import { validateInDB } from "../../db/bin/validateInDB";
import { validateRole } from "../../bin/validateRole";

export const deleteStudentCodeHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    // validate request
    await validateRequest({
      req: req,
      bodyClass: DeleteStudentCodeClass,
      validateBody: validateBody,
      validateHeaders: validateTokenHeader,
      validateJWT: validateJWT,
      validateInDB: validateInDB,
      validateRole: validateRole,
      requiredRole: "teacher",
      role: "teacher",
    });

    // delete student code
    await deleteStudentCode(req);

    return res.status(200).send({ message: "Student code deleted." });

    // error handling
  } catch (error) {
    handleErrors(res, error);
  }
};
