import type { LoginResponse } from "../types";
import api from "./axios";


export const loginApi = async (
  data: { email: string; password: string }
): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/auth/login", data);
  return res.data;
};
