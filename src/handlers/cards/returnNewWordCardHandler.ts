import express from "express";
import { validateTokenHeader } from "../../bin/validateTokenHeader";
import { validateRequest } from "../../bin/validateRequest";
import { validateJWT } from "../../bin/validateJWT";
import { validateInDB } from "../../db/bin/validateInDB";
import { handleErrors } from "../../bin/handleErrors";
import { validateRole } from "../../bin/validateRole";
import { returnNewWordCard } from "../../db/bin/cards/returnNewWordCard";

export const returnNewWordCardHandler = async (
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

    const card = await returnNewWordCard(req);

    return res.status(200).send(card);

    // error handling
  } catch (error) {
    handleErrors(res, error);
  }
};
