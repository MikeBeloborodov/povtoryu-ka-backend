import express from "express";
import { validateTokenHeader } from "../../bin/validateTokenHeader";
import { validateRequest } from "../../bin/validateRequest";
import { validateJWT } from "../../bin/validateJWT";
import { validateInDB } from "../../db/bin/validateInDB";
import { handleErrors } from "../../bin/handleErrors";
import { validateRole } from "../../bin/validateRole";
import { validateBody } from "../../bin/validateBody";
import { AnswerSentenceCardClass } from "../../classes/Card";
import { handleSentenceCardAnswer } from "../../db/bin/cards/handleSentenceCardAnswer";

export const answerSentenceHandler = async (
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
      bodyClass: AnswerSentenceCardClass,
      requiredRole: "student",
    });

    const answer = await handleSentenceCardAnswer(req);

    return res.status(200).send({ isCorrect: answer });

    // error handling
  } catch (error) {
    handleErrors(res, error);
  }
};
