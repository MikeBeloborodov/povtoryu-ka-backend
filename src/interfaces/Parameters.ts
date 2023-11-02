import express from "express";

export interface ValidateParameters {
  req: express.Request;
  validateBody?: Function;
  bodyClass?: any;
  validateHeaders?: Function;
  validateInDB?: Function;
  validateRole?: Function;
  validateJWT?: Function;
  validateSpecialCode?: Function;
  role?: string;
  checkForDuplication?: Function;
}
