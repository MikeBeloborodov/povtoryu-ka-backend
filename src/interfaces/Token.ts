export interface TokenReqBody {
  token: string;
}

export interface JWToken {
  id: number;
  userName: string;
  role: string;
}
