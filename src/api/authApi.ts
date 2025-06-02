import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

interface AuthPayload {
  username: string;
  password: string;
}

export const register = async (data: AuthPayload): Promise<void> => {
  await axios.post(`${API_BASE_URL}/auth/register`, data);
};

export const login = async (data: AuthPayload): Promise<string> => {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
  return response.data;
};
