import express from "express";
import { validateTokenHeader } from "../../bin/validateTokenHeader";
import { handleErrors } from "../../bin/handleErrors";
import { validateRequest } from "../../bin/validateRequest";
import { validateJWT } from "../../bin/validateJWT";
import { validateRole } from "../../bin/validateRole";
import { validateInDB } from "../../db/bin/validateInDB";
import { validateBody } from "../../bin/validateBody";
import { NewWordCardClass } from "../../classes/Card";
import { saveWordCard } from "../../db/bin/cards/saveWordCard";

export const createWordCardHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    await validateRequest({
      req: req,
      validateHeaders: validateTokenHeader,
      validateJWT: validateJWT,
      validateBody: validateBody,
      validateInDB: validateInDB,
      bodyClass: NewWordCardClass,
      validateRole: validateRole,
      role: "teacher",
      requiredRole: "teacher",
    });

    // save card to DB
    const card = await saveWordCard(req);

    return res.status(201).send({ card: card });
  } catch (error) {
    handleErrors(res, error);
  }
};
