import express from "express";
import { validateSpecialCode } from "../../db/bin/validateSpecialCode";
import { saveStudent } from "../../db/bin/saveStudent";
import { validateRequest } from "../../bin/validateRequest";
import { validateBody } from "../../bin/validateBody";
import { StudentRegistrationClass } from "../../classes/Student";
import { checkForDuplication } from "../../db/bin/checkForDuplication";
import { handleErrors } from "../../bin/handleErrors";

export const registerStudentHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    // validate request
    await validateRequest({
      req: req,
      bodyClass: StudentRegistrationClass,
      validateBody: validateBody,
      checkForDuplication: checkForDuplication,
      validateSpecialCode: validateSpecialCode,
      role: "student",
    });

    // save new student
    const student = await saveStudent(req);

    return res.status(201).send(student);

    // error handling
  } catch (error) {
    handleErrors(res, error);
  }
};
