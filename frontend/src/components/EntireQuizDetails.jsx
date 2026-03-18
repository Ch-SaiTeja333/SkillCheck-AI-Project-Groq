import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function EntireQuizDetails() {
  const location = useLocation();
  const { historyId, userId } = location.state;

  const [quizDetails, setQuizDetails] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  // Fetch quiz details
  async function getEntireQuizDetails() {
    try {
      let res = await axios.get(
        `http://localhost:8080/history-api/user-history/${userId}/${historyId}`,
        { withCredentials: true },
      );
      setQuizDetails(res.data.payload);
    } catch (err) {
      console.log(
        "error in EntireQuizDetails component [frontend]",
        err.message,
      );
    }
  }

  // Fetch feedback on button click
  async function getFeedback() {
    try {
      if (!quizDetails?._id) return;

      setLoadingFeedback(true);

      let res = await axios.put(
        `http://localhost:8080/questions-api/feedback`,
        { id: quizDetails._id },
        { withCredentials: true },
      );

      console.log("feedback details : ", res.data.payload);
      setFeedback(res.data.payload);
    } catch (err) {
      console.log(
        "error in fetching feedback in EntireQuizDetails component",
        err.message,
      );
    } finally {
      setLoadingFeedback(false);
    }
  }

  useEffect(() => {
    if (quizDetails?.feedback) {
      try {
        const parsed = JSON.parse(quizDetails.feedback);
        setFeedback(parsed);
      } catch (err) {
        console.log("Error parsing feedback:", err.message);
      }
    }
  }, [quizDetails]);

  if (!quizDetails) return <h3 className="text-center mt-5">Loading...</h3>;

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

      {/* Feedback Section */}
      <h4 className="mt-5 mb-3 text-center fw-bold">Feedback</h4>

      {feedback ? (
        <div
          className="card shadow-sm p-md-4 p-3 rounded-4 mb-5"
          style={{ backgroundColor: "#F0F6FF" }}
        >
          <p>
            <strong>Overall:</strong> {feedback.overallFeedback}
          </p>

          {/* Optional detailed feedback */}
          {feedback.strengths && (
            <>
              <p className="mt-3">
                <strong>Strengths:</strong>
              </p>
              <ul>
                {feedback.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </>
          )}

          {feedback.weakAreas && (
            <>
              <p className="mt-3">
                <strong>Weak Areas:</strong>
              </p>
              <ul>
                {feedback.weakAreas.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </>
          )}

          {feedback.suggestions && (
            <>
              <p className="mt-3">
                <strong>Suggestions:</strong>
              </p>
              <ul>
                {feedback.suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      ) : (
        <div>
          <p className="text-center">No feedback available.</p>
          <button
            className="btn btn-primary d-block mx-auto"
            onClick={getFeedback}
            disabled={loadingFeedback}
          >
            {loadingFeedback ? "Fetching..." : "Get Feedback"}
          </button>
        </div>
      )}

      {/* Back to Top */}
      <div className="text-center">
        <button className="btn btn-success mt-4 mb-5" onClick={backToTop}>
          Back to Top
        </button>
      </div>
    </div>
  );
}

export default EntireQuizDetails;
