import { useEffect, useState } from "react";
import axios from "./axiosInstance";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<UrlAnalyticsDto>("/user/urls/stats");
        setStats(response.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || "Failed to fetch stats");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
}
