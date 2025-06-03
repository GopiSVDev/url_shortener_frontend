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
