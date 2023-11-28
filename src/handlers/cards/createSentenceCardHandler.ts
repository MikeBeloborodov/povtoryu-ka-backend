import express from "express";
import { validateTokenHeader } from "../../bin/validateTokenHeader";
import { handleErrors } from "../../bin/handleErrors";
import { validateRequest } from "../../bin/validateRequest";
import { validateJWT } from "../../bin/validateJWT";
import { validateRole } from "../../bin/validateRole";
import { validateInDB } from "../../db/bin/validateInDB";
import { saveSentenceCard } from "../../db/bin/cards/saveSentenceCard";
import { validateFormDataBody } from "../../bin/validateFormDataBody";

export const createSentenceCardHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    await validateRequest({
      req: req,
      validateHeaders: validateTokenHeader,
      validateJWT: validateJWT,
      validateInDB: validateInDB,
      validateRole: validateRole,
      role: "teacher",
      requiredRole: "teacher",
    });

    const formData = await validateFormDataBody(req);

    // save card to DB
    const card = await saveSentenceCard(req, formData);

    return res.status(201).send({ card: card });
  } catch (error) {
    handleErrors(res, error);
  }
};
