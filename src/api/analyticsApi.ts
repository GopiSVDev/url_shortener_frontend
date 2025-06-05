import { useEffect, useState } from "react";
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

export function useUserUrlStats() {
  const [stats, setStats] = useState<UrlAnalyticsDto | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get<UrlAnalyticsDto>("/user/urls/stats");
        setStats(response.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast(error || "Unknown Error");
      }
    };

    fetchStats();
  }, []);

  return { stats };
}
