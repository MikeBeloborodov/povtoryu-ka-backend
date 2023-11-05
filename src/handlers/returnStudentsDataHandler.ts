import { getStudentsData } from "../db/bin/getStudentsData";
import { validateTokenHeader } from "../bin/validateTokenHeader";
import express from "express";
import { validateRequest } from "../bin/validateRequest";
import { validateJWT } from "../bin/validateJWT";
import { validateInDB } from "../db/bin/validateInDB";
import { checkJWTBlackList } from "../bin/checkJWTBlackList";
import { handleErrors } from "../bin/handleErrors";

export const returnStudentsDataHandler = async (
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
      checkJWTBlackList: checkJWTBlackList,
      role: "teacher",
    });

    // get students data from db
    const studentsData = await getStudentsData(req);

    return res.status(200).send({ studentsData: studentsData });

    // error handling
  } catch (error) {
    handleErrors(res, error);
  }
};
