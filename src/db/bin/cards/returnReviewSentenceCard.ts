import express from "express";
import { Op } from "sequelize";
import { returnDecodedJWT } from "../../../bin/utils";
import { JWToken } from "../../../interfaces/Token";
import { DBError } from "../../../classes/Errors";
import { SentenceCard } from "../../ormModels/SentenceCard";

export const returnReviewSentenceCard = async (req: express.Request) => {
  const token = returnDecodedJWT(req) as JWToken;
  let card: any;
  try {
    card = await SentenceCard.findOne({
      where: {
        studentId: token.id,
        newCard: false,
        nextReview: {
          [Op.lt]: new Date(),
        },
      },
      order: [["updatedAt", "ASC"]],
      attributes: {
        exclude: ["teacherId", "studentId"],
      },
    });
  } catch (error) {
    throw new DBError();
  }
  return card;
};
