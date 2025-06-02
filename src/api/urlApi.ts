import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL;

export const shortenUrl = async (longUrl: string) => {
  const response = await axios.post(`${API_BASE_URL}/shorten`, {
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
