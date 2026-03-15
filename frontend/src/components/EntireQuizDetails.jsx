import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function EntireQuizDetails() {
  const location = useLocation();
  const { historyId, userId } = location.state;
  const [quizDetails, setQuizDetails] = useState(null);
  // console.log("history id in entire quiz details page : ", historyId);
  // console.log("user id in entire quiz details page : ", userId);
  async function getEntireQuizDetails() {
    try {
      let res = await axios.get(
        `https://skillcheck-ai-project-groq.onrender.com/history-api/user-history/${userId}/${historyId}`,
        { withCredentials: true },
      );
      // console.log("entire quiz details : ",res.data.payload);
      setQuizDetails(res.data.payload);
    } catch (err) {
      console.log(
        "error in EntireQuizDetails...component [frontend]",
        err.message,
      );
    }
  }

  useEffect(() => {
    getEntireQuizDetails();
  }, []);

  if (!quizDetails) return <h3 className="text-center mt-5">Loading...</h3>;

  const feedback = JSON.parse(quizDetails.feedback);

  function backToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center fw-bold">
        {quizDetails.topic} Quiz Results
      </h2>

      {/* Quiz Summary */}
      <div
        className="card shadow-sm p-3 mb-4 rounded-4"
        style={{ backgroundColor: "#F7F5FF" }}
      >
        <div className="row text-center">
          <div className="col-lg col-md-4 col-12 mb-2">
            <strong>Difficulty:</strong> {quizDetails.difficultyLevel}
          </div>

          <div className="col-lg col-md-4 col-12 mb-2">
            <strong>Questions:</strong> {quizDetails.numberQuestions}
          </div>

          <div className="col-lg col-md-4 col-12 mb-2">
            <strong>Score:</strong> {quizDetails.score}
          </div>

          <div className="col-lg col-md-4 col-12 mb-2">
            <strong>Percentage:</strong> {quizDetails.percentage}%
          </div>

          <div className="col-lg col-md-4 col-12">
            <strong>Date:</strong> {quizDetails.createdAt.split("T")[0]}
          </div>
        </div>
      </div>

      {/* Questions */}
      {quizDetails.questions.map((q, index) => (
        <div
          key={index}
          className="card shadow-sm p-md-4 p-3 mb-3 rounded-4"
          style={{ backgroundColor: "#F8F9FA" }}
        >
          <h6 className="fw-semibold mb-3">
            Q{index + 1}. {q}
          </h6>

          <p>
            <strong>Your Answer:</strong>{" "}
            <span className="text-primary">
              {quizDetails.options.userOptions[index]}
            </span>
          </p>

          <p>
            <strong>Correct Answer:</strong>{" "}
            <span className="text-success">
              {quizDetails.options.correctOptions[index]}
            </span>
          </p>
        </div>
      ))}

      {/* Feedback */}
      <h4 className="mt-5 mb-3 text-center fw-bold">Feedback</h4>

      <div
        className="card shadow-sm p-md-4 p-3 rounded-4 mb-5"
        style={{ backgroundColor: "#F0F6FF" }}
      >
        <p>
          <strong>Overall:</strong> {feedback.overallFeedback}
        </p>

        <p className="mt-3">
          <strong>Strengths:</strong>
        </p>
        <ul>
          {feedback.strengths.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>

        <p className="mt-3">
          <strong>Weak Areas:</strong>
        </p>
        <ul>
          {feedback.weakAreas.map((w, i) => (
            <li key={i}>{w}</li>
          ))}
        </ul>

        <p className="mt-3">
          <strong>Suggestions:</strong>
        </p>
        <ul>
          {feedback.suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>

      {/* Back to Top */}
      <div className="text-center">
        <button className="btn btn-success mb-5" onClick={backToTop}>
          Back to Top
        </button>
      </div>
    </div>
  );
}

export default EntireQuizDetails;
