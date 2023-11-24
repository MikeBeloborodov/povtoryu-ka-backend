import express from "express";
import { validateTokenHeader } from "../../bin/validateTokenHeader";
import { validateRequest } from "../../bin/validateRequest";
import { validateJWT } from "../../bin/validateJWT";
import { validateInDB } from "../../db/bin/validateInDB";
import { handleErrors } from "../../bin/handleErrors";
import { validateRole } from "../../bin/validateRole";
import { returnReviewWordCard } from "../../db/bin/cards/returnReviewWordCard";

export const returnReviewWordCardHandler = async (
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
      requiredRole: "student",
    });

    const card = await returnReviewWordCard(req);

    return card ? res.status(200).send(card) : res.status(204).send({});

    // error handling
  } catch (error) {
    handleErrors(res, error);
  }
};
