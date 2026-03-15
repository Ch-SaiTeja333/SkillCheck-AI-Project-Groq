//! mini-express
import express from "express";
import { Router } from "express";
export const questionsRoutes = Router();
import { buildPrompt, runApi, buildFeedbackPrompt } from "../Gemini_api.js";
import { questionsModel } from "../models/questions-model.js";
import mongoose from "mongoose";
questionsRoutes.post("/generate/:id", async (req, res) => {
  try {
    let { id } = req.params;
    // console.log('id....',id);
    let { topic, difficultyLevel, numberOfQuestions } = req.body;
    let prompt = buildPrompt(topic, difficultyLevel, numberOfQuestions);
    let aiResponse = await runApi(prompt);
    // console.log(aiResponse);
    // remove ```json and ```
    const cleanResponse = aiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const parsed = JSON.parse(cleanResponse);
    // Save to database
    // console.log('Parsed AI Response:', parsed);

    const questionsData = {
      userId: id,
      topic: topic,
      difficultyLevel: difficultyLevel,
      numberQuestions: numberOfQuestions,
      questions: parsed.map((item) => item.question),
      options: {
        userOptions: [],
        correctOptions: parsed.map((item) => item.correctAnswer),
        availableOptions: parsed.map((item) => item.options),
      },
      score: 0,
      percentage: 0,
      feedback: "",
    };
    // console.log('question data .... database',questionsData);
    const newQuestions = new questionsModel(questionsData);

    // console.log("generated newQuestions", newQuestions);
    await newQuestions.save();
    // console.log('Questions saved to database successfully');
    res.status(200).json({
      message: "Questions generated successfully",
      payload: newQuestions,
    });
  } catch (err) {
    console.log(
      "err in Generating questions--questions-api Backend...",
      err.message,
    );
    res.status(500).json({ message: err.message });
  }
});

questionsRoutes.put("/score-answers", async (req, res) => {
  try {
    //console.log(req.body,'data in score update api backend');
    const { score, userOptions, docId } = req.body;
    // // console.log(score);
    // // console.log(userOptions);
    // console.log(docId, "docId in score update api backend");
    const doc = await questionsModel.findById(docId);
    // console.log("update the doc", doc);
    // console.log(doc);
    if (!doc) {
      return res.status(404).json({ message: "Questions not found" });
    }
    doc.options.userOptions = userOptions;
    doc.score = score;
    doc.percentage = (score / doc.numberQuestions) * 100;
    await doc.save();
    res
      .status(200)
      .json({ message: "Score  and correct answers updated successfully" });
  } catch (err) {
    console.log(
      "err in updating score- and answers -questions-api Backend...",
      err.message,
    );
    res.status(500).json({ message: err.message });
  }
});

questionsRoutes.put("/feedback", async (req, res) => {
  try {
    const { id } = req.body;
    const record = await questionsModel.findById(id);
    if (!record) {
      return res.status(404).json({ message: "Questions not found" });
    }
    // console.log('record',record);
    const prompt = buildFeedbackPrompt(record);
    // console.log('prompt',prompt);
    const feedback = await runApi(prompt);
    // console.log('feedback',feedback);
    const clean = feedback
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    // console.log(clean);
    record.feedback = clean;

    // console.log("record", record)
    await record.save();
    const resultantFeedback = JSON.parse(clean);
    res
      .status(200)
      .json({
        message: "Feedback saved successfully",
        payload: {...resultantFeedback,score: record.score, percentage: record.percentage},
      });

  } catch (err) {
    console.log(
      "err in saving feedback--questions-api Backend...",
      err.message,
    );
    res.status(500).json({ message: err.message });
  }
});

questionsRoutes.get("/get-feedback/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const record = await questionsModel.findById(id);
    if (!record) {
      return res.status(404).json({ message: "Questions not found" });
    }
    const feedback = JSON.parse(record.feedback);
    res
      .status(200)
      .json({ message: "Feedback fetched successfully", payload: feedback });
  } catch (err) {
    console.log(
      "err in getting feedback--questions-api Backend...",
      err.message,
    );
    res.status(500).json({ message: err.message });
  }
});

questionsRoutes.get("/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // console.log('id...',id);
    const records = await questionsModel
      .find({ userId: id ,  $expr: { $ne: ["$createdAt", "$updatedAt"] } }, { topic: 1, score: 1, percentage: 1, createdAt: 1,numberQuestions:1 })
      .sort({ createdAt: -1 });
    // console.log(records)
    res
      .status(200)
      .json({
        message: "Profile details fetched successfully",
        payload: records,
      });
  } catch (err) {
    console.log(
      "err in fetching profile details--questions-api Backend...",
      err.message,
    );
    res.status(500).json({ message: err.message });
  }
});

// feedback ```json
// {
//   "overallFeedback": "Excellent performance on this easy DBMS quiz! You've demonstrated a solid understanding of fundamental concepts.",
//   "strengths": [
//     "Correctly identified the full form of DBMS.",
//     "Accurately recognized database model types.",
//     "Knew the primary language for relational databases."
//   ],
//   "weakAreas": [],
//   "suggestions": [
//     "To continue building your DBMS knowledge, consider exploring more complex topics like normalization, indexing, and transaction management in your next practice sessions."
//   ]
// }
// ```
