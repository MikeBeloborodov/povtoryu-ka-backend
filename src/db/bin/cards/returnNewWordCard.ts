import express from "express";
import { WordCard } from "../../ormModels/WordCard";
import { Image } from "../../ormModels/Image";
import { Sentence } from "../../ormModels/Sentence";
import { Translation } from "../../ormModels/Translation";
import { returnDecodedJWT } from "../../../bin/utils";
import { JWToken } from "../../../interfaces/Token";
import { DBError } from "../../../classes/Errors";

export const returnNewWordCard = async (req: express.Request) => {
  const token = returnDecodedJWT(req) as JWToken;
  let card: any;
  try {
    card = await WordCard.findOne({
      where: { studentId: token.id, newCard: true },
      order: [["updatedAt", "ASC"]],
      attributes: {
        exclude: ["teacherId", "studentId"],
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
  } catch (error) {
    console.log(error);
    throw new DBError();
  }
  return card;
};
