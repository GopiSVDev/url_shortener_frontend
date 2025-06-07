import { toast } from "sonner";
import axios, { API_BASE_URL } from "./axiosInstance";

export const shortenUrl = async (data: {
  originalUrl: string;
  customCode?: string | null;
  expirationDate?: string | null;
}) => {
  let response = null;

  if (!data.customCode) {
    response = await axios.post("/shorten", {
      originalUrl: data.originalUrl,
    });
  } else {
    response = await axios.post("/shorten", {
      originalUrl: data.originalUrl,
      customCode: data.customCode,
      expirationDate: data.expirationDate,
    });
  }

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

export const deleteUrl = async (shortCode: string) => {
  try {
    await axios.delete(`/user/urls/${shortCode}`);
    toast.success("Deleted successfully");
  } catch (error) {
    toast.error("Error deleting URL");
    throw error;
  }
};
