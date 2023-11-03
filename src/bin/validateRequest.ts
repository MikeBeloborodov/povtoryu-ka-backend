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
  requiredRole = null,
  checkForDuplication = null,
  checkJWTBlackList = null,
}: ValidateParameters) => {
  if (validateBody) {
    await validateBody(req, bodyClass);
  }
  if (validateHeaders) {
    await validateHeaders(req);
  }
  if (checkJWTBlackList) {
    await checkJWTBlackList(req);
  }
  if (validateJWT) {
    validateJWT(req);
  }
  if (validateRole) {
    await validateRole(req, requiredRole);
  }
  if (validateInDB) {
    await validateInDB(req);
  }
  if (validateSpecialCode) {
    await validateSpecialCode(req, role);
  }
  if (checkForDuplication) {
    await checkForDuplication(req, role);
  }
};
