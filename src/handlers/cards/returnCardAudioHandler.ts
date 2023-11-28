import express from "express";
import path from "path";
import { validateTokenHeader } from "../../bin/validateTokenHeader";
import { handleErrors } from "../../bin/handleErrors";
import { validateRequest } from "../../bin/validateRequest";
import { validateJWT } from "../../bin/validateJWT";
import { validateRole } from "../../bin/validateRole";
import { validateInDB } from "../../db/bin/validateInDB";
import { FileTransferError } from "../../classes/Errors";

export const returnCardAudioHandler = async (
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
      role: "student",
      requiredRole: "student",
    });
    const options = {
      root: path.resolve("./"),
    };
    const audioPath = req.query.path.toString();
    return res.status(200).sendFile(audioPath, options, (error) => {
      if (error) {
        throw new FileTransferError();
      } else {
      }
    });
  } catch (error) {
    handleErrors(res, error);
  }
};
