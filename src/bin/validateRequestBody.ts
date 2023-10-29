import express from "express";

export const validateRequestBody = async (
  req: express.Request,
  validationFunc: Function,
) => {
  const res = await validationFunc(req);
  return res;
};
