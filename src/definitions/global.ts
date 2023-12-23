import * as jose from "jose";

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginPayload extends jose.JWTPayload {
  email: string;
  date: Date;
}

export interface LoginResponseData {
  token: string;
}

export interface LoginResponse {
  statusCode: number;
  data: LoginResponseData;
}
