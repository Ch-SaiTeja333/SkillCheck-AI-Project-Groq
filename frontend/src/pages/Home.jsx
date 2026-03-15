import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";

function Home() {
  const { user } = useAuthStore();

  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="fw-bold mb-3">AI Quiz Generator</h1>

        <p className="fs-5 text-muted">
          Practice smarter with AI-generated quizzes and personalized feedback
        </p>
      </div>

      {/* Features Section */}
      <div className="row mt-5">
        {/* Card 1 */}
        <div className="col-lg-4 col-md-6 col-12 mb-4">
          <div
            className="card h-100 rounded-4 home-cards"
            style={{ backgroundColor: "var(--primary)", color: "white" }}
          >
            <div className="card-body">
              <h5 className="fw-semibold">AI-Generated Questions</h5>

              <p style={{ color: "#d6d6d6" }}>
                Generate smart quiz questions instantly using AI based on the
                topic you choose.
              </p>

              <ul className="small mt-3 ps-3" style={{ color: "#d6d6d6" }}>
                <li>Questions generated in real-time</li>
                <li>Covers multiple technical topics</li>
                <li>Improves conceptual understanding</li>
                <li>Randomized questions every attempt</li>
                <li>Helps simulate real interview scenarios</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-lg-4 col-md-6 col-12 mb-4">
          <div
            className="card h-100 rounded-4 home-cards"
            style={{ backgroundColor: "var(--accent)", color: "white" }}
          >
            <div className="card-body">
              <h5 className="fw-semibold">Personalized Difficulty</h5>

              <p style={{ color: "#d6d6d6" }}>
                Adapt the quiz difficulty to match your current knowledge level.
              </p>

              <ul className="small mt-3 ps-3" style={{ color: "#d6d6d6" }}>
                <li>Beginner to advanced levels</li>
                <li>Easy, Medium, and Hard modes</li>
                <li>Adjust difficulty anytime</li>
                <li>Practice according to your skill level</li>
                <li>Great for step-by-step learning</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-lg-4 col-md-6 col-12 mb-4">
          <div
            className="card h-100 rounded-4 home-cards"
            style={{ backgroundColor: "var(--secondary)", color: "white" }}
          >
            <div className="card-body">
              <h5 className="fw-semibold">Instant Results & Feedback</h5>

              <p style={{ color: "#d6d6d6" }}>
                Get immediate insights into your performance after completing a
                quiz.
              </p>

              <ul className="small mt-3 ps-3" style={{ color: "#d6d6d6" }}>
                <li>Detailed performance analysis</li>
                <li>View score and percentage</li>
                <li>Track learning progress</li>
                <li>Identify weak topics quickly</li>
                <li>Improve with every quiz attempt</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {user ? (
        <div className="text-center mt-5">
          <h2 className="fw-bold mb-3">Ready to Test Your Knowledge?</h2>

          <p className="fs-5 mb-4">
            Click the button below to start your quiz and track your progress!
          </p>

          <Link to="/quiz">
            <button className="btn btn-lg btn-outline-success quiz-btn">
              Take a Quiz Now
            </button>
          </Link>
        </div>
      ) : (
        <div className="text-center mt-5">
          <p>
            Create an account to track your progress and view past quiz history.
          </p>

          <div className="row justify-content-center g-2 mt-2">
            <div className="col-auto">
              <Link to="/login" className="btn btn-outline-primary quiz-btn">
                Login
              </Link>
            </div>

            <div className="col-auto">
              <Link to="/register" className="btn btn-outline-success quiz-btn">
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
