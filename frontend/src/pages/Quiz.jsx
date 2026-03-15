import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

function Quiz() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function submitForm(obj) {
    navigate("/attempt-quiz", { state: obj });
  }

  return (
    <div>
      {user ? (
        //!if user login
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 col-sm-8 col-12">
              <form
                onSubmit={handleSubmit(submitForm)}
                className="p-4 rounded shadow"
                style={{
                  backgroundColor: "#DFF7F2",
                  color: "black",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
                }}
              >
                <h3 className="text-center mb-4">Generate Quiz</h3>

                <div className="mb-3">
                  <label htmlFor="topic" className="form-label">
                    Topic
                  </label>

                  <input
                    type="text"
                    {...register("topic", { required: true })}
                    id="topic"
                    className="form-control"
                    placeholder="e.g. Data Structures, Algorithms, System Design"
                  />

                  {errors.topic && (
                    <p className="text-danger mt-1">Topic is required</p>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="difficultyLevel" className="form-label">
                    Difficulty Level
                  </label>

                  <select
                    {...register("difficultyLevel", { required: true })}
                    id="difficultyLevel"
                    className="form-select"
                  >
                    <option value="">Select Difficulty</option>

                    <option value="easy">Easy</option>

                    <option value="medium">Medium</option>

                    <option value="hard">Hard</option>
                  </select>

                  {errors.difficultyLevel && (
                    <p className="text-danger mt-1">
                      Difficulty Level is required
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="numberOfQuestions" className="form-label">
                    Number Of Questions
                  </label>

                  <input
                    type="number"
                    {...register("numberOfQuestions", { required: true })}
                    id="numberOfQuestions"
                    className="form-control"
                    defaultValue={3}
                    min="1"
                  />

                  {errors.numberOfQuestions && (
                    <p className="text-danger mt-1">
                      Number Of Questions is required
                    </p>
                  )}
                </div>

                <div className="text-center">
                  <button
                    className="btn btn-success w-100 quiz-btn"
                    type="submit"
                  >
                    Generate Questions
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        //!if user not login
        <div className="container d-flex justify-content-center align-items-center mt-5">
          <div
            className="card shadow-lg p-4"
            style={{ maxWidth: "500px", width: "100%" }}
          >
            <div className="card-body text-center">
              <h2 className="card-title mb-3 text-primary">Login Required</h2>

              <p className="text-muted">
                You must be logged in to access the quiz section.
              </p>

              <div className="alert alert-info text-start mt-4">
                <h6 className="fw-bold">Why login?</h6>

                <ul className="mb-0">
                  <li>Attempt multiple quizzes</li>
                  <li>Track your quiz results</li>
                  <li>View your performance analytics</li>
                  <li>Improve your technical knowledge</li>
                  <li>Get personalized quiz recommendations</li>
                </ul>
              </div>
              {/* <p> otherwise CreateAccount</p> */}
              <div className="mt-4">
                <Link to="/login">
                  <button className="btn btn-outline-primary px-4 me-3">
                    Login
                  </button>
                </Link>

                <Link to="/register">
                  <button className="btn btn-outline-secondary px-4">
                    Create Account
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
