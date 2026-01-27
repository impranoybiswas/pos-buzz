import type { User } from "../types/User";
import api from "./axios";

export const loginApi = async (data : User) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};
