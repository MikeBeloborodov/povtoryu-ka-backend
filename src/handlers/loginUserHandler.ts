import express from "express";
import { createLoginUserObject } from "../bin/createLoginUserObject";
import { loginUser } from "../db/bin/loginUser";

export const loginUserHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  let userLogin;
  let userLoginErrors;
  // check provided data with class validator
  try {
    const [userLoginRes, userLoginResErrors] = await createLoginUserObject(
      req.body,
    );
    if (userLoginResErrors.length > 0) {
      userLoginErrors = userLoginResErrors;
      throw "Bad information provided";
    }
    userLogin = userLoginRes;
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      error: "Bad information provided",
      error_message: userLoginErrors,
    });
  }
  // get teacher from DB
  try {
    const userAuth = await loginUser(userLogin);
    if (userAuth) return res.status(200).send(userAuth);
    else {
      throw "Wrong credentials";
    }
  } catch (db_error) {
    return res.status(400).send({
      error_message: db_error,
    });
  }
};
