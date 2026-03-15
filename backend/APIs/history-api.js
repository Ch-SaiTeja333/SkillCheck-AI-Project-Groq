//! mini express
import express from "express";
import { Router } from "express";
export const historyRoutes = Router();
import { questionsModel } from "../models/questions-model.js";
//!Define routes
historyRoutes.get("/user-history/:id", async (req, res) => {
  try {
    let { id } = req.params;
    // console.log("called hid");
    let history = await questionsModel
      .find(
        { userId: id,$expr:{$ne :["$createdAt","$updatedAt"]} },
        {
          topic: 1,
          difficultyLevel: 1,
          numberQuestions: 1,
          score: 1,
          percentage: 1,
          createdAt: 1,
        },
      )
      .sort({ createdAt: -1 });
    // console.log(history);
    return res.status(200).json({
      message: "User history fetched successfully",
      payload: history,
    });
  } catch (err) {
    return res.status(500).json({
      message: `err in fetching user history--history-api Backend...${err.message}`,
    });
  }
});

historyRoutes.get("/user-history/:id/:historyId", async (req, res) => {
  try {
    let { id, historyId } = req.params;
    let history = await questionsModel.findOne({ _id: historyId, userId: id });
    if (!history) {
      return res.status(404).json({ message: "History record not found" });
    }
    return res.status(200).json({
      message: "User history record fetched successfully",
      payload: history,
    });
  } catch (err) {
    console.log(
      `err in fetching user history record--history-api Backend...${err.message}`,
    );
  }
});
