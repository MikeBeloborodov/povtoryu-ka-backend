import express from "express";
import { Op } from "sequelize";
import { WordCard } from "../../ormModels/WordCard";
import { returnDecodedJWT } from "../../../bin/utils";
import { JWToken } from "../../../interfaces/Token";
import { DBError } from "../../../classes/Errors";
import { SentenceCard } from "../../ormModels/SentenceCard";

export const returnCardsCount = async (req: express.Request) => {
  const token = returnDecodedJWT(req) as JWToken;
  let wordCardsAll: any;
  let wordCardsNew: any;
  let wordCardsToReview: any;
  let sentenceCardsAll: any;
  let sentenceCardsNew: any;
  let sentenceCardsToReview: any;
  try {
    wordCardsAll = await WordCard.findAll({
      where: { studentId: token.id },
    });
    wordCardsNew = await WordCard.findAll({
      where: { studentId: token.id, newCard: true },
    });
    wordCardsToReview = await WordCard.findAll({
      where: {
        studentId: token.id,
        newCard: false,
        nextReview: {
          [Op.lt]: new Date(),
        },
      },
    });
    sentenceCardsAll = await SentenceCard.findAll({
      where: { studentId: token.id },
    });
    sentenceCardsNew = await SentenceCard.findAll({
      where: { studentId: token.id, newCard: true },
    });
    sentenceCardsToReview = await SentenceCard.findAll({
      where: {
        studentId: token.id,
        newCard: false,
        nextReview: {
          [Op.lt]: new Date(),
        },
      },
    });
  } catch (error) {
    throw new DBError();
  }
  const cardsCount = {
    cardsAll: wordCardsAll.length + sentenceCardsAll.length,
    cardsNew: wordCardsNew.length + sentenceCardsNew.length,
    cardsToReview: wordCardsToReview.length + sentenceCardsToReview.length,
  };
  return cardsCount;
};
