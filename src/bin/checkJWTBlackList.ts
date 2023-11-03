import express from "express";
import { JWTBlackList } from "../db/ormModels/JWTBlackList";
import { returnRawJWT } from "./utils";
import { DBError, JWTInBlackListError } from "../classes/Errors";

export const checkJWTBlackList = async (req: express.Request) => {
  const tokenRaw = returnRawJWT(req);
  let jwt: any;
  try {
    jwt = await JWTBlackList.findOne({
      where: {
        jwt: tokenRaw,
      },
    });
  } catch (error) {
    throw new DBError();
  }
  if (jwt) throw new JWTInBlackListError();
};
