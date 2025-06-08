import UrlStatsPage from "@/components/UrlsPage/UrlStatsPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import DashboardHome from "@/pages/DashboardHome";
import UrlsPage from "@/pages/UrlsPage";
import { Navigate, Route, Routes } from "react-router-dom";

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route index element={<DashboardHome />} />
      <Route path="urls" element={<UrlsPage />} />
      <Route path="urls/:shortCode" element={<UrlStatsPage />} />
      <Route path="analytics" element={<AnalyticsPage />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default DashboardRoutes;
