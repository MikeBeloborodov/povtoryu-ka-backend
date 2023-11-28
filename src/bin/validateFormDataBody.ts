import express from "express";
import multiparty from "multiparty";
import { validate } from "class-validator";
import { BodyValidationError } from "../classes/Errors";
import { FormHandleError } from "../classes/Errors";
import { NewSentenceCardClass } from "../classes/Card";

export const validateFormDataBody = async (
  req: express.Request,
): Promise<NewSentenceCardClass> => {
  return new Promise((resolve, reject) => {
    let dataToValidate = new NewSentenceCardClass();
    const form = new multiparty.Form();
    form.on("error", (error) => {
      reject(new FormHandleError());
    });
    form.parse(req, async (err, fields, files) => {
      dataToValidate.sentence = fields["sentence"][0];
      dataToValidate.word = fields["word"][0];
      dataToValidate.answer = fields["answer"][0];
      dataToValidate.sentenceTranslation = fields["sentenceTranslation"][0];
      dataToValidate.definition = fields["definition"][0];
      dataToValidate.pos = fields["pos"][0];
      dataToValidate.image = fields["image"][0];
      dataToValidate.studentId = fields["studentId"][0];
      dataToValidate.audio = files["audio"][0];
      const errors = await validate(dataToValidate);
      if (errors.length > 0) reject(new BodyValidationError(errors));
      resolve(dataToValidate);
    });
  });
};
