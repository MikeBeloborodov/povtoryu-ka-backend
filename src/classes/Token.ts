import { IsNotEmpty } from "class-validator";
import { TokenReqBody } from "../interfaces/Token";

export class TokenInfo {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  userName: string;

  constructor({ token, userName }: TokenReqBody) {
    this.token = token;
    this.userName = userName;
  }
}
