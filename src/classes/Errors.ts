import { ValidationError } from "class-validator";

export class BodyValidationError extends Error {
  errorsArr: ValidationError[];

  constructor(errorsArr: ValidationError[]) {
    super();
    this.message = "Wrong request body.";
    this.name = "BodyValidationError";
    this.errorsArr = errorsArr;
  }
}

export class HeadersValidationError extends Error {
  errorsArr: ValidationError[];

  constructor(errorsArr: ValidationError[]) {
    super();
    this.message = "Wrong request headers.";
    this.name = "HeadersValidationError";
    this.errorsArr = errorsArr;
  }
}

export class DBError extends Error {
  constructor() {
    super();
    this.message = "Error with database. Call admin.";
    this.name = "DBError";
  }
}

export class RoleRequirementError extends Error {
  constructor() {
    super();
    this.message = "Wrong role for this action.";
    this.name = "RoleRequirementError";
  }
}

export class SpecialCodeValidationError extends Error {
  constructor() {
    super();
    this.message = "This special code does not exist.";
    this.name = "SpecialCodeValidationError";
  }
}

export class EntityAlreadyExistsInDB extends Error {
  constructor() {
    super();
    this.message = "This entity already exists in data base.";
    this.name = "EntityAlreadyExistsInDB";
  }
}

export class JWTValidationError extends Error {
  constructor() {
    super();
    this.message = "JWT is not valid.";
    this.name = "JWTValidationError";
  }
}

export class NoStudentCodeError extends Error {
  constructor() {
    super();
    this.message = "No student code with this userName found.";
    this.name = "NoStudentCodeError";
  }
}

export class NoTeacherFoundError extends Error {
  constructor() {
    super();
    this.message = "No teacher with these credentials found in the DB.";
    this.name = "NoTeacherFoundError";
  }
}

export class WrongPasswordError extends Error {
  constructor() {
    super();
    this.message = "Wrong password.";
    this.name = "WrongPasswordError";
  }
}

export class NoStudentFoundError extends Error {
  constructor() {
    super();
    this.message = "No student with these credentials found in the DB.";
    this.name = "NoStudentFoundError";
  }
}
