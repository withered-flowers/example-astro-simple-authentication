import type { LoginPayload } from "@/definitions/global";
import * as jose from "jose";

const SECRET_KEY = import.meta.env.JWT_SECRET;
const ENCODED_SECRET_KEY = new TextEncoder().encode(SECRET_KEY);

export const signPayload = (payload: LoginPayload) => {
  return new jose.SignJWT(payload)
    .setIssuedAt()
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime("2h")
    .sign(ENCODED_SECRET_KEY);
};

export const readToken = (token: string) => {
  return jose.jwtVerify<LoginPayload>(token, ENCODED_SECRET_KEY);
};
