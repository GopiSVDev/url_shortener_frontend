import MainLayout from "@/layouts/MainLayout";
import AuthPage from "@/pages/AuthPage";
import Home from "@/pages/Home";
import { Route, Routes } from "react-router-dom";
import Features from "@/pages/Features";

import { useAuth } from "@/context/AuthContext";
import RedirectWithToast from "./RedirectWithToast";
import { Loader } from "lucide-react";
import DashboardRoutes from "./DashboardRoutes";

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
            isAuthenticated ? <DashboardRoutes /> : <RedirectWithToast />
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
