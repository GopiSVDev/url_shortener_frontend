import { useQuery } from "@tanstack/react-query";
import axios from "./axiosInstance";
import { toast } from "sonner";

interface UrlAnalyticsDto {
  clicksByDate: Record<string, number>;
  clicksByDeviceType: Record<string, number>;
  clicksByCity: Record<string, number>;
  clicksByCountry: Record<string, number>;
  totalLinks: number;
  totalClicks: number;
}

const fetchStats = async (): Promise<UrlAnalyticsDto> => {
  try {
    const response = await axios.get<UrlAnalyticsDto>("/user/urls/stats");
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    toast(error?.response?.data?.message || "Failed to fetch stats");
    throw error;
  }
};

export function useUserUrlStats() {
  return useQuery<UrlAnalyticsDto>({
    queryKey: ["user-url-stats"],
    queryFn: fetchStats,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
