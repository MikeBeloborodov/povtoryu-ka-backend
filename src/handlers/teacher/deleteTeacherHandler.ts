import express from "express";
import { validateTokenHeader } from "../../bin/validateTokenHeader";
import { deleteTeacher } from "../../db/bin/deleteTeacher";
import { validateRequest } from "../../bin/validateRequest";
import { validateJWT } from "../../bin/validateJWT";
import { validateInDB } from "../../db/bin/validateInDB";
import { handleErrors } from "../../bin/handleErrors";
import { validateRole } from "../../bin/validateRole";

export const deleteTeacherHandler = async (
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
      validateRole: validateRole,
      requiredRole: "teacher",
    });

    // delete teacher
    await deleteTeacher(req);

    return res.status(200).send({ message: "Teacher deleted." });

    // error handling
  } catch (error) {
    handleErrors(res, error);
  }
};
