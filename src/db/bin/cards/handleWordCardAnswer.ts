import express from "express";
import { WordCard } from "../../ormModels/WordCard";
import { Image } from "../../ormModels/Image";
import { Sentence } from "../../ormModels/Sentence";
import { Translation } from "../../ormModels/Translation";
import { returnDecodedJWT } from "../../../bin/utils";
import { JWToken } from "../../../interfaces/Token";
import { DBError } from "../../../classes/Errors";

export const handleWordCardAnswer = async (req: express.Request) => {
  const token = returnDecodedJWT(req) as JWToken;
  let card: any;
  try {
    card = await WordCard.findOne({
      where: { studentId: token.id, id: req.body.cardId },
      attributes: {
        exclude: ["createdAt", "updatedAt", "teacherId", "studentId"],
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
    return card.translations.some(
      (item: any) =>
        item.translation.toLowerCase() === req.body.answer.toLowerCase(),
    );
  } catch (error) {
    throw new DBError();
  }
};
