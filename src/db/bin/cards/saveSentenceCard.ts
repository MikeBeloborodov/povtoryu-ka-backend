import express from "express";
import multiparty from "multiparty";
import { Form } from "multiparty";
import { SentenceCard } from "../../ormModels/SentenceCard";
import { DBError, NoStudentFoundError } from "../../../classes/Errors";
import { Image } from "../../ormModels/Image";
import { Student } from "../../ormModels/Student";
import { returnDecodedJWT } from "../../../bin/utils";
import { JWToken } from "../../../interfaces/Token";
import { saveAudioFile } from "../utils";
import { FormHandleError } from "../../../classes/Errors";
import { NewSentenceCardClass } from "classes/Card";

const returnFormData = async (req: express.Request) => {
  return new Promise((resolve, reject) => {
    let data: any;
    const form = new multiparty.Form();
    form.on("error", (error) => {
      reject(new FormHandleError());
    });
    form.parse(req, (err, fields, files) => {
      console.log(fields);
      console.log(files);
      resolve(data);
    });
  });
};

export const saveSentenceCard = async (
  req: express.Request,
  formData: NewSentenceCardClass,
) => {
  const token = returnDecodedJWT(req) as JWToken;
  let audioPath;
  let cardRes: any;
  const student: any = await Student.findOne({
    where: { id: formData.studentId },
  });
  if (!student) throw new NoStudentFoundError();
  try {
    const card = SentenceCard.build({
      sentence: formData.sentence,
      word: formData.word,
      answer: formData.answer,
      sentenceTranslation: formData.sentenceTranslation,
      definition: formData.definition,
      pos: formData.pos,
      newCard: true,
      image: formData.image,
      teacherId: token.id,
      studentId: formData.studentId,
    });

    cardRes = await card.save();
  } catch (error) {
    console.log(error);
    throw new DBError();
  }

  // save audio
  audioPath = `./audio/${cardRes.id + "_" + cardRes.word}.mp3`;
  await saveAudioFile(formData.audio, audioPath);
  cardRes.audio = audioPath;
  try {
    cardRes = await cardRes.save();
    return cardRes;
  } catch (error) {
    console.log(error);
    throw new DBError();
  }
};
