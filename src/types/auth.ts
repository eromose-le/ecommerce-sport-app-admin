import { type User } from "./user";

export interface LoginResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthTokenResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface AuthTokenRequest {
  email: string;
  token: string;
}
