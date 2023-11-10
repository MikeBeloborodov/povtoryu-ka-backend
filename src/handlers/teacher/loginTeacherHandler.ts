import express from "express";
import { loginTeacher } from "../../db/bin/teachers/loginTeacher";
import { validateRequest } from "../../bin/validateRequest";
import { validateBody } from "../../bin/validateBody";
import { TeacherLoginClass } from "../../classes/Teacher";
import { handleErrors } from "../../bin/handleErrors";

export const loginTeacherHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    // validate request
    await validateRequest({
      req: req,
      validateBody: validateBody,
      bodyClass: TeacherLoginClass,
      role: "teacher",
    });

    // login teacher and create a JWT
    const token = await loginTeacher(req);

    return res.status(200).send({ token: token });
    // error handling
  } catch (error) {
    handleErrors(res, error);
  }
};
