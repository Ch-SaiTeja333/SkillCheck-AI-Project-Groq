import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import Feedback from "../components/Feedback";
import { Link } from "react-router-dom";
function AttemptQuiz() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  const { user } = useAuthStore();
  // console.log("data in attempt",data)
  // console.log(user,".......................................")
  const [resdata, setResdata] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [docId, setDocId] = useState(null);
  const [isSubmit, setIsSubmit] = useState(true);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [isresluts, setISResults] = useState(false);
  // console.log("current  user :........", user);
  async function getQuestions() {
    try {
      let res = await axios.post(
        `http://localhost:8080/questions-api/generate/${user.id}`,
        data,
        { withCredentials: true },
      );
      // console.log("res  ...", res.data.payload);
      setDocId(res.data.payload._id);
      setResdata(res.data.payload);
      // initialize user answers
      setUserAnswers(Array(res.data.payload.questions.length).fill(""));
    } catch (err) {
      console.log(err, "err in Quiz generated form [FRONTEND]...");
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to generate quiz. Please try again.";
      toast.error(errorMessage);
      navigate("/quiz");
    }
  }
  useEffect(() => {
    getQuestions();
  }, []);
  function handleChange(index, value) {
    let updated = [...userAnswers];
    updated[index] = value;
    setUserAnswers(updated);
  }
  function displayError() {
    const unanswered = [];
    userAnswers.forEach((ans, index) => {
      if (!ans) {
        unanswered.push(index + 1);
      }
    });
    if (unanswered.length > 0) {
      // alert(`Please answer Question ${unanswered.join(", ")}`);
      toast.error(`Please answer Question ${unanswered.join(", ")}`);
      setIsSubmit(true);
      setISResults(false);
      return true;
    }
    return false;
  }
  async function submitQuiz() {
    setIsSubmit(false);
    setISResults(true);
    if (displayError()) return;
    let score = 0;
    userAnswers.forEach((ans, index) => {
      if (ans === resdata.options.correctOptions[index]) {
        score++;
      }
    });
    // alert(`Your Score: ${score}/${resdata.questions.length}`);
    toast.success(`Your Score: ${score}/${resdata.questions.length}`);

    //! score and correct answers update in database
    try {
      // console.log(resdata);
      let res = await axios.put(
        `http://localhost:8080/questions-api/score-answers`,
        { score: score, userOptions: userAnswers, docId: docId },
        { withCredentials: true },
      );
      setIsFeedbackVisible(true);
      // console.log("Score updated successfully", res.data);
    } catch (error) {
      console.log("error in Score updation .... [frontend]", error.message);
    }
  }

  if (!resdata) {
    return (
      <div className="d-flex align-items-center justify-content-center mt-5 ">
        <div class="spinner-3"></div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold">Attempt Quiz</h2>

      {/* Quiz Info */}
      <div
        className="card shadow-sm p-3 mb-4 rounded-4"
        style={{ backgroundColor: "#F7F5FF" }}
      >
        <div className="row text-center">
          <div className="col-md-4 col-12 mb-2">
            <strong>Topic:</strong> {data.topic}
          </div>

          <div className="col-md-4 col-12 mb-2">
            <strong>Difficulty:</strong> {data.difficultyLevel}
          </div>

          <div className="col-md-4 col-12">
            <strong>No of Questions:</strong> {data.numberOfQuestions}
          </div>
        </div>
      </div>

      {/* Questions */}
      {resdata.questions.map((q, index) => (
        <div
          key={index}
          className="card shadow-sm p-md-4 p-3 mb-3 rounded-4"
          style={{ backgroundColor: "#F8F9FA" }}
        >
          <h5 className="mb-3 fw-semibold">
            Q{index + 1}. {q}
          </h5>

          <select
            className="form-select"
            value={userAnswers[index]}
            onChange={(e) => handleChange(index, e.target.value)}
          >
            <option value="">Select Answer</option>

            {resdata.options.availableOptions[index].map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      ))}

      {/* Submit Button */}
      {isSubmit && (
        <div className="text-center mt-4 mb-5">
          <button
            className="btn btn-success px-4 py-2 quiz-btn"
            onClick={submitQuiz}
          >
            Submit Quiz
          </button>
        </div>
      )}
      
      {/* Feedback Section */}
      {isFeedbackVisible && <Feedback docId={docId} />}
    </div>
  );
}

export default AttemptQuiz;
