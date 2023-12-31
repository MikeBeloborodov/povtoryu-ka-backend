import express from "express";
import { WordCard } from "../../ormModels/WordCard";
import { Image } from "../../ormModels/Image";
import { Sentence } from "../../ormModels/Sentence";
import { Translation } from "../../ormModels/Translation";
import { returnDecodedJWT } from "../../../bin/utils";
import { JWToken } from "../../../interfaces/Token";
import { DBError } from "../../../classes/Errors";
import { calculateNextReview } from "../utils";
import { saveWordStats } from "../stats/saveWordStats";

export const handleWordCardAnswer = async (req: express.Request) => {
  const token = returnDecodedJWT(req) as JWToken;
  let card: any;
  try {
    card = await WordCard.findOne({
      where: { studentId: token.id, id: req.body.cardId },
      attributes: {
        exclude: ["createdAt", "updatedAt", "teacherId"],
      },
      include: [
        {
          model: Sentence,
          attributes: ["id", "sentence"],
          as: "sentences",
        },
        {
          model: Translation,
          attributes: ["id", "translation"],
          as: "translations",
        },
        {
          model: Image,
          attributes: ["id", "url"],
          as: "images",
        },
      ],
    });
    const isCorrect = card.translations.some(
      (item: any) =>
        item.translation.toLowerCase() === req.body.answer.toLowerCase(),
    );

    card = calculateNextReview(isCorrect, card);
    await saveWordStats(
      card.id,
      card.studentId,
      card.word,
      req.body.answer.toLowerCase(),
      isCorrect,
    );
    await card.save();

    return isCorrect;
  } catch (error) {
    throw new DBError();
  }
};
