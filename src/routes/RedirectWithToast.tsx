import { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

const RedirectWithToast = () => {
  const toastShown = useRef(false);

  useEffect(() => {
    if (!toastShown.current) {
      toast.error("Please login to continue");
      toastShown.current = true;
    }
  }, []);

  return <Navigate to="/auth" replace />;
};

export default RedirectWithToast;
