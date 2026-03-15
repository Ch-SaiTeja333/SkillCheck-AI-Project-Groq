import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function History() {
  const { user } = useAuthStore();
  const [history, setHistory] = useState([]);
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);

  const navigate = useNavigate();

  async function getHistory() {
    try {
      let res = await axios.get(
        `http://localhost:8080/history-api/user-history/${user.id}`,
        { withCredentials: true },
      );
      // console.log(res.data.payload);
      setHistory(res.data.payload);

      setIsBackToTopVisible(res.data.payload.length > 6);
    } catch (err) {
      console.log("err in history page...[frontend]", err.message);
    }
  }

  useEffect(() => {
    if (user?.id) getHistory();
  }, [user]);

  function backToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Quiz History</h2>

      {history.length === 0 ? (
        <div className="text-center mt-5">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            width="120"
            className="mb-3"
            alt="No history"
          />

          <h5 className="text-muted">No Quiz History Yet</h5>

          <p className="text-muted">
            Start your first quiz to see results here.
          </p>

          <Link to="/quiz" className="btn btn-success mt-2 quiz-btn">
            Take a Quiz
          </Link>
        </div>
      ) : (
        <div>
          <div className="row">
            {history.map((quiz) => (
              <div className="col-lg-4 col-md-6 col-12 mb-4" key={quiz._id}>
                <div
                  className="card h-100 quiz-history-card"
                  style={{ backgroundColor: "#DFF7F2" }}
                >
                  <div className="card-body">
                    <h4 className="card-title text-center">
                      <b>{quiz.topic}</b>
                    </h4>

                    <p>
                      <strong>Difficulty:</strong> {quiz.difficultyLevel}
                    </p>

                    <p>
                      <strong>Questions:</strong> {quiz.numberQuestions}
                    </p>

                    <p>
                      <strong>Score:</strong> {quiz.score}
                    </p>

                    <p>
                      <strong>Percentage:</strong> {quiz.percentage}%
                    </p>

                    <p>
                      <strong>Date:</strong>{" "}
                      {quiz.createdAt ? quiz.createdAt.split("T")[0] : "N/A"}
                    </p>

                    <div className="d-flex justify-content-center mt-3">
                      <button
                        className="btn shadow-sm w-75 w-md-auto"
                        style={{
                          color: "black",
                          backgroundColor: "#8dd9a8",
                          border: "1px solid #F5B7B1",
                        }}
                        onClick={() => {
                          navigate(`/entire-quiz-details`, {
                            state: {
                              historyId: quiz._id,
                              userId: user.id,
                            },
                          });
                        }}
                      >
                        View Results
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {isBackToTopVisible && (
            <div className="d-flex justify-content-center m-4">
              <button className="btn btn-success" onClick={backToTop}>
                Back to Top
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default History;
