import express from "express";
import { returnDecodedJWT } from "./utils";
import { JWToken } from "../interfaces/Token";
import { RoleRequirementError } from "../classes/Errors";

export const validateRole = async (
  req: express.Request,
  requiredRole: string,
) => {
  const token = returnDecodedJWT(req) as JWToken;
  if (requiredRole !== token.role) throw new RoleRequirementError();
};
