import express from "express";
import { Op } from "sequelize";
import { Student } from "../../ormModels/Student";
import { returnDecodedJWT } from "../../../bin/utils";
import { JWToken } from "../../../interfaces/Token";
import { DBError } from "../../../classes/Errors";
import { WordCard } from "../../ormModels/WordCard";

export const returnStudentsData = async (req: express.Request) => {
  const token = returnDecodedJWT(req) as JWToken;
  let cardsAll: any;
  let cardsNew: any;
  let cardsToReview: any;
  let studentsData: any = [];
  try {
    const students: any = await Student.scope("teacherScope").findAll({
      where: { teacherId: token.id },
      order: [["id", "ASC"]],
    });
    for (let i = 0; i < students.length; i++) {
      cardsAll = await WordCard.findAll({
        where: { studentId: students[i].id },
      });
      cardsNew = await WordCard.findAll({
        where: { studentId: students[i].id, newCard: true },
      });
      cardsToReview = await WordCard.findAll({
        where: {
          studentId: students[i].id,
          newCard: false,
          nextReview: {
            [Op.lt]: new Date(),
          },
        },
      });
      const cardsCount = {
        cardsAll: cardsAll.length,
        cardsNew: cardsNew.length,
        cardsToReview: cardsToReview.length,
      };
      studentsData.push({ student: students[i], cardsCount: cardsCount });
    }
    return studentsData;
  } catch (error) {
    throw new DBError();
  }
};
