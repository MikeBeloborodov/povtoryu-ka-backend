import express from "express";
import { returnDecodedJWT } from "../../../bin/utils";
import { JWToken } from "../../../interfaces/Token";
import { DBError } from "../../../classes/Errors";
import { SentenceCard } from "../../ormModels/SentenceCard";

export const returnNewSentenceCard = async (req: express.Request) => {
  const token = returnDecodedJWT(req) as JWToken;
  let card: any;
  try {
    card = await SentenceCard.findOne({
      where: { studentId: token.id, newCard: true },
      order: [["updatedAt", "ASC"]],
    });
  } catch (error) {
    throw new DBError();
  }
  return card;
};
