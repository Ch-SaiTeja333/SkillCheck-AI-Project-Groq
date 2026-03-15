import React, { useEffect, useState } from "react";
import axios from "axios";

function Feedback({ docId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFeedbackBtn, setIsFeedbackBtn] = useState(true);

  async function fetchFeedback() {
    //! feedback update in database
    setLoading(true);
    try {
      let res = await axios.put(
        "https://skillcheck-ai-project-groq.onrender.com/questions-api/feedback",
        { id: docId },
        { withCredentials: true },
      );
      // console.log("Feedback updated successfully", res.data);
      // setIsFeedbackVisible(true);
      if (res.data.payload) {
        setData(res.data.payload);
      }

      setLoading(false);
    } catch (err) {
      console.log("err in feedback updation .... [frontend]", err.message);
    }
  }

  useEffect(() => {
    if (data) return;
    const interval = setInterval(fetchFeedback, 2000);
    return () => clearInterval(interval);
  }, [docId, data]);

  if (isFeedbackBtn)
    return (
      <div className="text-center mb-3">
        <button
          className="btn btn-primary quiz-btn"
          onClick={() => setIsFeedbackBtn(false)}
        >
          Get Feedback
        </button>
      </div>
    );

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center mt-5">
        loading...
      </div>
    );
  }

  function backToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold">Quiz Feedback</h2>

      {/* Score + Percentage */}
      <div
        className="card shadow-sm p-3 mb-4 rounded-4"
        style={{ backgroundColor: "#F7F5FF" }}
      >
        <div className="row text-center">
          <div className="col-md-6 col-12 mb-3 mb-md-0">
            <h4 className="mb-0">Score</h4>
            <h2 className="fw-bold text-primary">{data?.score}</h2>
          </div>

          <div className="col-md-6 col-12">
            <h4 className="mb-0">Percentage</h4>
            <h2 className="fw-bold text-success">{data?.percentage}%</h2>
          </div>
        </div>
      </div>

      {/* Overall Feedback */}
      <div className="card shadow-sm mb-3 rounded-4">
        <div className="card-header bg-primary text-white">
          Overall Feedback
        </div>

        <div className="card-body">
          <p className="card-text">
            {data?.overallFeedback ||
              "No overall feedback available for this quiz."}
          </p>
        </div>
      </div>

      {/* Strengths */}
      <div className="card shadow-sm mb-3 rounded-4">
        <div className="card-header bg-success text-white">Strengths</div>

        <div className="card-body">
          <ul>
            {data?.strengths?.length > 0 ? (
              data.strengths.map((item, i) => <li key={i}>{item}</li>)
            ) : (
              <li>No specific strengths identified for this attempt.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Weak Areas */}
      <div className="card shadow-sm mb-3 rounded-4">
        <div className="card-header bg-danger text-white">Weak Areas</div>

        <div className="card-body">
          <ul>
            {data?.weakAreas?.length > 0 ? (
              data.weakAreas.map((item, i) => <li key={i}>{item}</li>)
            ) : (
              <li>No weak areas identified. Great job!</li>
            )}
          </ul>
        </div>
      </div>

      {/* Suggestions */}
      <div className="card shadow-sm mb-5 rounded-4">
        <div className="card-header bg-warning">Suggestions</div>

        <div className="card-body">
          <ul>
            {data?.suggestions?.length > 0 ? (
              data.suggestions.map((item, i) => <li key={i}>{item}</li>)
            ) : (
              <li>No suggestions available at the moment.</li>
            )}
          </ul>
        </div>
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

export default Feedback;
