import express from "express";
import { createUserObject } from "../bin/createUser";
import { saveUser } from "../db/bin/saveUser";

export const createUserHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  let user;
  let userErrors;
  try {
    // process data from user, check it and create teacher object
    const [userRes, userErrorsRes] = await createUserObject(req.body);
    userErrors = userErrorsRes;
    // exit if any errors and send them to user
    if (userErrorsRes.length > 0) throw userErrors;
    user = userRes;
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ error: "Wrong data provided.", error_message: userErrors });
  }
  try {
    // save a user to DB
    user = await saveUser(user);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ error: "Could not save data to db.", error_message: error });
  }
  // if all good
  return res.status(201).send(user);
};
