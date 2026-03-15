import React from "react";
import { useAuthStore } from "../store/authStore.js";
import axios from "axios";
import { useEffect, useState } from "react";

function Profile() {
  const user = useAuthStore((state) => state.user);

  const [profileDetails, setProfileDetails] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // console.log("User inside Profile:", user);
    if (user) {
      getUserName();
      getProfileDetials();
    }
  }, [user]);
  //! get user name
  async function getUserName() {
    // console.log("getUserName called");
    // console.log('email:...',user.email);
    try {
      let res = await axios.post(
        "http://localhost:8080/user-api/getUserName",
        { email: user.email },
        { withCredentials: true },
      );
      // console.log("user name....", res.data.payload);

      setUserName(res.data.payload);
    } catch (err) {
      console.log("err in getUserId", err.message);
    }
  }

  async function getProfileDetials() {
    // console.log('current user..',user);
    try {
      let res = await axios.get(
        `http://localhost:8080/questions-api/profile/${user?.id}`,
        { withCredentials: true },
      );
      // console.log("....",res.data.payload);
      setProfileDetails(res.data.payload);
    } catch (err) {
      console.log("err in getprofilesDetails", err.message);
    }
  }

  return (
    <div className="container py-5">
      <h3 className="fw-bold text-center mb-4">User Profile</h3>

      {/* PROFILE CARD */}
      <div className="row justify-content-center mb-5">
        <div className="col-lg-3 col-md-5 col-sm-7 col-12">
          <div className="card shadow-lg border-0 rounded-5">
            <div className="card-body text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                width="80"
                className="mb-3"
              />

              <p className="text-muted mb-1">
                <b>UserName:</b> {userName}
              </p>

              <p className="text-muted mb-1">
                <b>Email:</b> {user?.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* QUIZ TABLE */}
      <div className="card shadow border-0">
        <div className="card-body">
          <h4 className="text-center mb-4 fw-bold">Quiz Performance</h4>

          <div className="table-responsive">
            <table className="table table-hover table-bordered text-center align-middle">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Quiz Topic</th>
                  <th>Overall Score</th>
                  <th>Total Questions</th>
                  <th>Percentage</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {profileDetails.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-muted">
                      No quiz attempts yet
                    </td>
                  </tr>
                ) : (
                  profileDetails.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>

                      <td className="fw-semibold">{item.topic}</td>

                      <td>{item.score}</td>

                      <td>{item.numberQuestions}</td>

                      <td>
                        <span
                          className={`badge px-3 py-2 ${
                            item.percentage < 35
                              ? "bg-danger"
                              : item.percentage <= 75
                                ? "bg-warning text-dark"
                                : "bg-success"
                          }`}
                          style={{ width: "80px" }}
                        >
                          {item.percentage}%
                        </span>
                      </td>

                      <td>
                        {item.createdAt ? item.createdAt.split("T")[0] : "N/A"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
