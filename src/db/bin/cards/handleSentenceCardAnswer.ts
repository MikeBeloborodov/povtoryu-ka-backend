import express from "express";
import { returnDecodedJWT } from "../../../bin/utils";
import { JWToken } from "../../../interfaces/Token";
import { DBError } from "../../../classes/Errors";
import { calculateNextReview } from "../utils";
import { saveSentenceStats } from "../stats/saveSentenceStats";
import { SentenceCard } from "../../ormModels/SentenceCard";

export const handleSentenceCardAnswer = async (req: express.Request) => {
  const token = returnDecodedJWT(req) as JWToken;
  let card: any;
  try {
    card = await SentenceCard.findOne({
      where: { studentId: token.id, id: req.body.cardId },
      attributes: {
        exclude: ["createdAt", "updatedAt", "teacherId"],
      },
    });
    const isCorrect = card.answer === req.body.answer;

    card = calculateNextReview(isCorrect, card);
    await saveSentenceStats(
      card.id,
      card.studentId,
      card.word,
      req.body.answer.toLowerCase(),
      card.answer,
      isCorrect,
    );
    await card.save();

    return isCorrect;
  } catch (error) {
    throw new DBError();
  }
};
