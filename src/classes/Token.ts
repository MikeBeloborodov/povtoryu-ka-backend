import { IsNotEmpty } from "class-validator";
import { TokenReqBody } from "../interfaces/Token";

export class TokenInfo {
  @IsNotEmpty()
  token: string;

  constructor({ token }: TokenReqBody) {
    this.token = token;
  }
}
