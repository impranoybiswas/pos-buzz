import type { Auth, LoginResponse } from "../types";
import api from "./axios";

export const loginApi = async (data: Auth): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/auth/login", data);
  return res.data;
};
