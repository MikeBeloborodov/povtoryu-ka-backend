import express from "express";
import { validateTokenHeader } from "../../bin/validateTokenHeader";
import { validateRequest } from "../../bin/validateRequest";
import { validateJWT } from "../../bin/validateJWT";
import { validateInDB } from "../../db/bin/validateInDB";
import { handleErrors } from "../../bin/handleErrors";
import { returnCardsCount } from "../../db/bin/students/returnCardsCount";

export const returnCardsCountHandler = async (
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
    });

    // get students data from db
    const cardsCount = await returnCardsCount(req);

    return res.status(200).send(cardsCount);

    // error handling
  } catch (error) {
    handleErrors(res, error);
  }
};
