import React from "react";
import { useAuthStore } from "../store/authStore.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Logout() {
  const { clearAuth } = useAuthStore();
  const navigate = useNavigate();
  async function backendCall() {
    try {
      let res = await axios.post(
        "https://skillcheck-ai-project-groq.onrender.com/user-api/logout",
        { data: "logout" },
        { withCredentials: true },
      );
      clearAuth();
      navigate("/");
    } catch (err) {
      console.log(err, "err in login submit form [FRONTEND]...");
    }
  }
  useEffect(() => {
    backendCall();
  }, []);

  return <div></div>;
}

export default Logout;
