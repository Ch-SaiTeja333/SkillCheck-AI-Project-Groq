import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (!isAuthenticated) {
    navigate("/login");
  }

  return children;
}

export default ProtectedRoute;
