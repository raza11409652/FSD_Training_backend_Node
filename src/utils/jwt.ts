import * as jwt from "jsonwebtoken";
const decodeJWTToken = (token: string) => {
  const payload = jwt.decode(token);
  return payload;
};

export { decodeJWTToken };
