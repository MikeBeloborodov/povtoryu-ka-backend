import express from "express";
import { saveTeacher } from "../db/bin/saveTeacher";
import { validateSpecialCode } from "../db/bin/validateSpecialCode";
import { validateRequest } from "../bin/validateRequest";
import { validateBody } from "../bin/validateBody";
import { TeacherRegistrationClass } from "../classes/Teacher";
import { checkForDuplication } from "../db/bin/checkForDuplication";
import { handleErrors } from "../bin/handleErrors";

export const registerTeacherHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    // validate request
    await validateRequest({
      req: req,
      validateBody: validateBody,
      bodyClass: TeacherRegistrationClass,
      validateSpecialCode: validateSpecialCode,
      checkForDuplication: checkForDuplication,
      role: "teacher",
    });

    // save new teacher
    await saveTeacher(req);

    return res.status(201).send({ message: "Teacher registered." });
    // error handling
  } catch (error) {
    handleErrors(res, error);
  }
};
