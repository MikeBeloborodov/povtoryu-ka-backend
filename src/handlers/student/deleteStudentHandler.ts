import express from "express";
import { validateTokenHeader } from "../../bin/validateTokenHeader";
import { deleteStudent } from "../../db/bin/deleteStudent";
import { validateRole } from "../../bin/validateRole";
import { validateRequest } from "../../bin/validateRequest";
import { validateJWT } from "../../bin/validateJWT";
import { validateInDB } from "../../db/bin/validateInDB";
import { handleErrors } from "../../bin/handleErrors";
import { validateBody } from "../../bin/validateBody";
import { StudentDeleteClass } from "../../classes/Student";
import { checkJWTBlackList } from "../../bin/checkJWTBlackList";

export const deleteStudentHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    // validate request
    await validateRequest({
      req: req,
      validateHeaders: validateTokenHeader,
      validateBody: validateBody,
      bodyClass: StudentDeleteClass,
      validateJWT: validateJWT,
      checkJWTBlackList: checkJWTBlackList,
      validateInDB: validateInDB,
      validateRole: validateRole,
      requiredRole: "teacher",
    });

    // delete student
    await deleteStudent(req);

    return res.status(200).send({ message: "Student deleted." });

    // error handling
  } catch (error) {
    handleErrors(res, error);
  }
};
