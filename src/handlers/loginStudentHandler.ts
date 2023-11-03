import express from "express";
import { loginStudent } from "../db/bin/loginStudent";
import { validateRequest } from "../bin/validateRequest";
import { validateBody } from "../bin/validateBody";
import { StudentLoginClass } from "../classes/Student";
import { handleErrors } from "../bin/handleErrors";

export const loginStudentHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    // validate request
    await validateRequest({
      req: req,
      validateBody: validateBody,
      bodyClass: StudentLoginClass,
      role: "student",
    });

    // login student and create a JWT
    const token = await loginStudent(req);

    return res.status(200).send({ token: token });
    // error handling
  } catch (error) {
    handleErrors(res, error);
  }
};
