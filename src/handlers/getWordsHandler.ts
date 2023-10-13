import express from "express";
import { createWordObjects, createCardObjects } from "../bin/processWords";
import { Word } from "../classes/classes";

export const getWordsHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    // process data from user, check it and create word objects
    const [errorsArray, checkedWords] = await createWordObjects(req.body);
    // exit if any errors and send them to user
    if (errorsArray.length > 0) return res.status(400).send(errorsArray);

    // create card objects from word objects
    const [readyCards, errors, validationErrors] = await createCardObjects(
      checkedWords as Word[],
    );
    // exit if any errors
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }
    if (validationErrors.length > 0) {
      return res.status(400).send(validationErrors);
    }

    // if all good
    return res.send(readyCards);
  } catch (error) {
    return res.status(500).send(error);
  }
};
