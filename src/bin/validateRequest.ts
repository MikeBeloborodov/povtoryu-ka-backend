import { ValidateParameters } from "../interfaces/Parameters";

export const validateRequest = async ({
  req,
  validateBody = null,
  bodyClass = null,
  validateHeaders = null,
  validateInDB = null,
  validateRole = null,
  validateJWT = null,
  validateSpecialCode = null,
  role = null,
  checkForDuplication = null,
}: ValidateParameters) => {
  if (validateBody) {
    await validateBody(req, bodyClass);
  }
  if (validateHeaders) {
    await validateHeaders(req);
  }
  if (validateRole) {
    await validateRole(req);
  }
  if (validateSpecialCode) {
    await validateSpecialCode(req, role);
  }
  if (checkForDuplication) {
    await checkForDuplication(req, role);
  }
  if (validateJWT) {
    validateJWT(req);
  }
  if (validateInDB) {
    await validateInDB(req);
  }
};
