import { api } from "./client";
import type { User } from "../types/user";

type SignupData = {
  username: string;
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

export function signup(data: SignupData) {
  return api<User>("/user/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function login(data: LoginData) {
  return api<User>("/user/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}