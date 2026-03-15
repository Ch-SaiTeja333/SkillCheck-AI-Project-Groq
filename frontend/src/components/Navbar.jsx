import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuthStore } from "../store/authStore.js";

const beforeLoginLeft = [
  { label: "Home", to: "/" },
  { label: "Quiz", to: "/quiz" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const beforeLoginRight = [
  { label: "Login", to: "/login" },
  { label: "Register", to: "/register" },
];

const afterLoginLeft = [
  { label: "Home", to: "/" },
  { label: "Quiz", to: "/quiz" },
  { label: "History", to: "/history" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const afterLoginRight = [{ label: "Logout", to: "/logout" }];

function Navbar() {
  const { isAuthenticated } = useAuthStore();

  let left = [];
  let right = [];

  if (isAuthenticated) {
    left = afterLoginLeft;
    right = afterLoginRight;
  } else {
    left = beforeLoginLeft;
    right = beforeLoginRight;
  }

  // function to close navbar on click
  function closeNavbar() {
    const navbar = document.getElementById("navbarNav");
    if (navbar.classList.contains("show")) {
      navbar.classList.remove("show");
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/" onClick={closeNavbar}>
          SkillCheck AI
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Left Side */}
          <ul className="navbar-nav me-auto">
            {left.map((item, index) => (
              <li className="nav-item" key={index}>
                <Link
                  className="nav-link fw-semibold px-3"
                  to={item.to}
                  onClick={closeNavbar}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side */}
          <ul className="navbar-nav align-items-end">
            {right.map((item, index) => (
              <li className="nav-item" key={index}>
                <Link
                  className="nav-link fw-semibold px-3"
                  to={item.to}
                  onClick={closeNavbar}
                >
                  {item.label}
                </Link>
              </li>
            ))}

            {isAuthenticated && (
              <li className="nav-item ms-2">
                <Link
                  to="/profile"
                  className="text-decoration-none"
                  onClick={closeNavbar}
                >
                  <div
                    className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white shadow-sm"
                    style={{
                      width: "38px",
                      height: "38px",
                      cursor: "pointer",
                    }}
                  >
                    <FaUserCircle size={18} />
                  </div>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
