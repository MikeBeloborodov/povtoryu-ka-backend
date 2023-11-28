import express from "express";
import { Op } from "sequelize";
import { Student } from "../../ormModels/Student";
import { returnDecodedJWT } from "../../../bin/utils";
import { JWToken } from "../../../interfaces/Token";
import { DBError } from "../../../classes/Errors";
import { WordCard } from "../../ormModels/WordCard";
import { SentenceCard } from "../..//ormModels/SentenceCard";

export const returnStudentsData = async (req: express.Request) => {
  const token = returnDecodedJWT(req) as JWToken;
  let wordCardsAll: any;
  let wordCardsNew: any;
  let wordCardsToReview: any;
  let sentenceCardsAll: any;
  let sentenceCardsNew: any;
  let sentenceCardsToReview: any;
  let studentsData: any = [];
  try {
    const students: any = await Student.scope("teacherScope").findAll({
      where: { teacherId: token.id },
      order: [["id", "ASC"]],
    });
    for (let i = 0; i < students.length; i++) {
      wordCardsAll = await WordCard.findAll({
        where: { studentId: students[i].id },
      });
      wordCardsNew = await WordCard.findAll({
        where: { studentId: students[i].id, newCard: true },
      });
      wordCardsToReview = await WordCard.findAll({
        where: {
          studentId: students[i].id,
          newCard: false,
          nextReview: {
            [Op.lt]: new Date(),
          },
        },
      });
      sentenceCardsAll = await SentenceCard.findAll({
        where: { studentId: students[i].id },
      });
      sentenceCardsNew = await SentenceCard.findAll({
        where: { studentId: students[i].id, newCard: true },
      });
      sentenceCardsToReview = await SentenceCard.findAll({
        where: {
          studentId: students[i].id,
          newCard: false,
          nextReview: {
            [Op.lt]: new Date(),
          },
        },
      });
      const cardsCount = {
        cardsAll: wordCardsAll.length + sentenceCardsAll.length,
        cardsNew: wordCardsNew.length + sentenceCardsNew.length,
        cardsToReview: wordCardsToReview.length + sentenceCardsToReview.length,
      };
      studentsData.push({ student: students[i], cardsCount: cardsCount });
    }
    return studentsData;
  } catch (error) {
    throw new DBError();
  }
};
