import express from "express";

export const handleErrors = (res: express.Response, error: Error) => {
  switch (error.name) {
    case "BodyValidationError":
    case "HeadersValidationError":
      return res.status(400).send({ errorMessage: error });
    case "JWTValidationError":
    case "RoleRequirementError":
    case "SpecialCodeValidationError":
    case "WrongPasswordError":
      return res.status(403).send({ errorMessage: error });
    case "NoTeacherFoundError":
    case "NoStudentCodeError":
    case "NoStudentFoundError":
      return res.status(404).send({ errorMessage: error });
    case "EntityAlreadyExistsInDB":
      return res.status(409).send({ errorMessage: error });
    case "DBError":
      return res.status(500).send({ errorMessage: error.message });
    default:
      return res.status(500).send({
        errorMessage: "Something wrong with the server.",
      });
  }
};
