import express from "express";

export const testEndpoint = (req: express.Request, res: express.Response) => {
  return res.status(200).send({ message: "Test" });
};
