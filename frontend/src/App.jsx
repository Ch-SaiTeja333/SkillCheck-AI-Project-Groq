import React, { useEffect } from "react";
import Login from "./pages/Login.jsx";
import axios from "axios";
import Routing from "./components/Routing.jsx";
import { useAuthStore } from "./store/authStore.js";
import "./index.css";
function App() {
  const setUser = useAuthStore((s) => s.setUser);
  async function me() {
    try {
      let res = await axios.get(
        "https://skillcheck-ai-project-groq.onrender.com/user-api/me",
        {
          withCredentials: true,
        },
      );
      // console.log("..........",res);
      setUser(res.data.payload);
    } catch (err) {
      console.log(err, "err in login submit form [FRONTEND]...");
    }
  }

  useEffect(() => {
    me();
  }, []);

  return (
    <div>
      <Routing></Routing>
    </div>
  );
}

export default App;
