import express from "express";
import { WordCard } from "../../ormModels/WordCard";
import { NewWordCardRequestBody } from "../../../interfaces/Card";
import { Sentence } from "../../ormModels/Sentence";
import {
  DBError,
  NoStudentFoundError,
  NoTeacherFoundError,
} from "../../../classes/Errors";
import { Translation } from "../../ormModels/Translation";
import { Image } from "../../ormModels/Image";
import { Teacher } from "../../ormModels/Teacher";
import { Student } from "../../ormModels/Student";
import { returnDecodedJWT } from "../../../bin/utils";
import { JWToken } from "../../../interfaces/Token";

export const saveWordCard = async (req: express.Request) => {
  const token = returnDecodedJWT(req) as JWToken;
  const requestBody = req.body as NewWordCardRequestBody;
  const teacher: any = await Teacher.findOne({
    where: { id: token.id },
  });
  const student: any = await Student.findOne({
    where: { id: requestBody.studentId },
  });
  if (!teacher) throw new NoTeacherFoundError();
  if (!student) throw new NoStudentFoundError();
  try {
    let partOfSpeechRu;
    switch (requestBody.partOfSpeech) {
      case "noun":
        partOfSpeechRu = "существительное";
        break;
      case "verb":
        partOfSpeechRu = "глагол";
        break;
      case "adjective":
        partOfSpeechRu = "прилагательное";
        break;
      default:
        partOfSpeechRu = "не указана";
        break;
    }
    const card = WordCard.build({
      word: requestBody.word,
      partOfSpeech: requestBody.partOfSpeech,
      partOfSpeechRu: partOfSpeechRu,
      definition: requestBody.definition,
      newCard: true,
      teacherId: token.id,
      studentId: requestBody.studentId,
    });
    const cardRes: any = await card.save();
    // save sentences
    for (let i = 0; i < requestBody.sentences.length; i++) {
      const sentence = Sentence.build({
        sentence: requestBody.sentences[i],
        cardId: cardRes.id,
      });
      await sentence.save();
    }
    // save translations
    for (let i = 0; i < requestBody.translations.length; i++) {
      const translation = Translation.build({
        translation: requestBody.translations[i],
        cardId: cardRes.id,
      });
      await translation.save();
    }
    // save images
    for (let i = 0; i < requestBody.images.length; i++) {
      const image = Image.build({
        url: requestBody.images[0],
        cardId: cardRes.id,
      });
      await image.save();
    }
    return cardRes;
  } catch (error) {
    throw new DBError();
  }
};
