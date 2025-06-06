import { toast } from "sonner";
import axios, { API_BASE_URL } from "./axiosInstance";

export const shortenUrl = async (longUrl: string) => {
  const response = await axios.post("/shorten", {
    originalUrl: longUrl,
  });

  const { shortCode } = response.data;
  const shortUrl = `${API_BASE_URL}/${shortCode}`;

  return {
    ...response.data,
    shortUrl,
    shortCode,
  };
};

export const fetchUrls = async () => {
  const response = await axios.get("/user/urls");

  return response.data;
};

export const updateUrl = async (
  shortCode: string,
  updatedData: {
    originalUrl: string;
    customCode: string;
    expirationDate: string;
  }
) => {
  try {
    await axios.put(`/user/urls/${shortCode}`, updatedData);
    toast.success("Update successful");
  } catch (error) {
    toast.error("Error updating URL");
    throw error;
  }
};
