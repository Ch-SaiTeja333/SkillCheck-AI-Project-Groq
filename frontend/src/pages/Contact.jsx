import React from "react";

function Contact() {
  return (
    <div className="container py-5">
      {/* Page Heading */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">Contact Us</h1>
        <p className="text-muted">
          If you have any questions, feedback, or suggestions about the AI Quiz
          Generator, feel free to reach out to us. We are always happy to help.
        </p>
      </div>

      <div className="row g-4">
        {/* Contact Information */}
        <div className="col-lg-5 col-md-6 col-12">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title fw-semibold mb-3">Get in Touch</h5>

              <p className="text-muted">
                Our platform aims to provide a smarter way to practice and
                evaluate knowledge using AI-generated quizzes. If you encounter
                any issues while using the application or want to suggest
                improvements, you can contact us through the information below.
              </p>

              <hr />

              <p className="mb-2">
                <strong>Email:</strong> support@aiquiz.com
              </p>

              <p className="mb-2">
                <strong>Phone:</strong> +91 9876543210
              </p>

              <p className="mb-2">
                <strong>Location:</strong> India
              </p>

              <p className="text-muted mt-3">
                Our support team usually responds within 24 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="col-lg-7 col-md-6 col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-semibold mb-3">Send a Message</h5>

              <form>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter subject"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Write your message..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 w-md-auto"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="text-center mt-5">
        <p className="text-muted">
          Thank you for using the AI Quiz Generator. Your feedback helps us
          improve the platform and provide a better learning experience.
        </p>
      </div>
    </div>
  );
}

export default Contact;
