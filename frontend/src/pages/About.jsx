import React from "react";

function About() {
  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">About AI Quiz Generator</h1>

        <p className="text-muted">
          Learn, practice, and evaluate your knowledge with AI-powered quizzes.
        </p>
      </div>

      {/* Top Cards */}
      <div className="row g-4">
        <div className="col-lg-6 col-md-6 col-12">
          <div
            className="card h-100 home-cards"
            style={{ backgroundColor: "var(--accent)", color: "white" }}
          >
            <div className="card-body">
              <h5 className="fw-semibold">Project Overview</h5>

              <p style={{ color: "#d6d6d6" }}>
                The AI Quiz Generator helps users test and improve their
                knowledge through dynamically generated quizzes. Users can
                choose a topic, difficulty level, and number of questions.
              </p>
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-md-6 col-12">
          <div
            className="card h-100 home-cards"
            style={{ backgroundColor: "var(--danger)", color: "white" }}
          >
            <div className="card-body">
              <h5 className="fw-semibold">How It Works</h5>

              <p style={{ color: "#d6d6d6" }}>
                AI generates multiple-choice questions based on the selected
                topic and difficulty. After completing the quiz, the system
                calculates score and percentage and provides feedback for
                improvement.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Card */}
      <div className="row mt-4 justify-content-center">
        <div className="col-lg-5 col-md-8 col-12">
          <div
            className="card home-cards"
            style={{ backgroundColor: "var(--highlight)", color: "white" }}
          >
            <div className="card-body">
              <h5 className="fw-semibold">Key Features</h5>

              <ul className="ps-3 mb-0" style={{ color: "#d6d6d6" }}>
                <li>AI-generated quiz questions</li>
                <li>Custom topic and difficulty selection</li>
                <li>Instant score and percentage calculation</li>
                <li>Feedback to identify weak areas</li>
                <li>Simple and user-friendly interface</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
