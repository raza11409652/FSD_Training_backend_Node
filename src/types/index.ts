export interface QueryParam {
  page: number;
  size: number;
}
export interface GCAuth {
  type: "authorized_user";
  client_id: string;
  client_secret: string;
  refresh_token: string;
}
export interface GCPJWTTokenPayload {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: boolean;
  at_hash: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
}

export interface JWTToken {
  email: string;
  role: string;
  type: "SESSION" | "REFRESH";
}
