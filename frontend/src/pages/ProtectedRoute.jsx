import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";

function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);
  if(isLoading){
    return <div>.....</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
