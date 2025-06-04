import axios from "./axiosInstance";

interface AuthPayload {
  username: string;
  password: string;
}

export const register = async (data: AuthPayload): Promise<void> => {
  await axios.post("/auth/register", data);
};

export const login = async (data: AuthPayload): Promise<string> => {
  const response = await axios.post("/auth/login", data);
  return response.data;
};
