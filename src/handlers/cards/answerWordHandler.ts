import express from "express";
import { validateTokenHeader } from "../../bin/validateTokenHeader";
import { validateRequest } from "../../bin/validateRequest";
import { validateJWT } from "../../bin/validateJWT";
import { validateInDB } from "../../db/bin/validateInDB";
import { handleErrors } from "../../bin/handleErrors";
import { validateRole } from "../../bin/validateRole";
import { validateBody } from "../../bin/validateBody";
import { AnswerWordCardClass } from "../../classes/Card";
import { handleWordCardAnswer } from "../../db/bin/cards/handleWordCardAnswer";

export const answerWordHandler = async (
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
      validateBody: validateBody,
      bodyClass: AnswerWordCardClass,
      requiredRole: "student",
    });

    const answer = await handleWordCardAnswer(req);

    return res.status(200).send({ isCorrect: answer });

    // error handling
  } catch (error) {
    handleErrors(res, error);
  }
};
