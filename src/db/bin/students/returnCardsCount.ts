import express from "express";
import { Op } from "sequelize";
import { WordCard } from "../../ormModels/WordCard";
import { returnDecodedJWT } from "../../../bin/utils";
import { JWToken } from "../../../interfaces/Token";
import { DBError } from "../../../classes/Errors";

export const returnCardsCount = async (req: express.Request) => {
  const token = returnDecodedJWT(req) as JWToken;
  let cardsAll: any;
  let cardsNew: any;
  let cardsToReview: any;
  try {
    cardsAll = await WordCard.findAll({
      where: { studentId: token.id },
    });
    cardsNew = await WordCard.findAll({
      where: { studentId: token.id, newCard: true },
    });
    cardsToReview = await WordCard.findAll({
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
    cardsAll: cardsAll.length,
    cardsNew: cardsNew.length,
    cardsToReview: cardsToReview.length,
  };
  return cardsCount;
};
