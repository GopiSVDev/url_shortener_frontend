import MainLayout from "@/layouts/MainLayout";
import AuthPage from "@/pages/AuthPage";
import Home from "@/pages/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Features from "@/pages/Features";

import DashboardHome from "@/pages/DashboardHome";
import UrlsPage from "@/pages/UrlsPage";
import AnalyticsPage from "@/pages/AnalyticsPage";
import UrlStatsPage from "@/components/UrlsPage/UrlStatsPage";
import { useAuth } from "@/context/AuthContext";
import RedirectWithToast from "./RedirectWithToast";
import { Loader } from "lucide-react";

const AppRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading)
    return <Loader className="animate-spin h-5 w-5 text-gray-500" />;

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="dashboard/*"
          element={
            isAuthenticated ? (
              <>
                <Routes>
                  <Route index element={<DashboardHome />} />
                  <Route path="urls" element={<UrlsPage />} />
                  <Route path="urls/:id" element={<UrlStatsPage />} />
                  <Route path="analytics" element={<AnalyticsPage />} />
                  <Route
                    path="*"
                    element={<Navigate to="/dashboard" replace />}
                  />
                </Routes>
              </>
            ) : (
              <RedirectWithToast />
            )
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
