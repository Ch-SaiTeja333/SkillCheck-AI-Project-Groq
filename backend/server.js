import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { userRoutes } from "./APIs/user-api.js";
import { historyRoutes } from "./APIs/history-api.js";
import { questionsRoutes } from "./APIs/questions-api.js";
import cors from "cors";

import morgan from "morgan";
import { verifyToken } from "./middlewares/verifyToken.js";
const app = express();
const PORT = 8080;

app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "https://skillcheck-ai-project-groq-1.onrender.com",
    credentials: true,
  }),
);
app.use(cookieParser());

app.use("/user-api", userRoutes);
app.use("/questions-api", verifyToken, questionsRoutes);
app.use("/history-api", verifyToken, historyRoutes);

//! connect to database
mongoose
  .connect(
    "mongodb+srv://chintakrindasaiteja_db_user:n8y1AuHluMBLOBiA@cluster0.1n1pqtg.mongodb.net/skill-check-ai-groq-project",
  )
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database connection failed..", err.message);
  });
