import React from "react";
import {createHashRouter  , RouterProvider } from "react-router-dom";
import { lazy , Suspense } from "react";
import Layout from "./Layout.jsx";
const Home = lazy (() => import("../pages/Home.jsx"));
const Login = lazy (() => import("../pages/Login.jsx"));
const Register = lazy (() => import("../pages/Register.jsx"));
const Quiz = lazy (() => import("../pages/Quiz.jsx"));
const History = lazy (() => import("../pages/History.jsx"));
const Logout = lazy (() => import("../pages/Logout.jsx"));
const Profile = lazy (() => import("../pages/Profile.jsx"));
const Contact = lazy (() => import("../pages/Contact.jsx"));
const About = lazy (() => import("../pages/About.jsx"));
const AttemptQuiz = lazy (() => import("../pages/AttemptQuiz.jsx"));
const EntireQuizDetails = lazy (() => import("./EntireQuizDetails.jsx"));
function Routing() {
  const browserRouterObj = createHashRouter([
    {
      path: "/",
      element: (
          <Layout></Layout>
      ),
      children: [
        {
          path: "/",
          element: (
            <Suspense>
              <Home></Home>
            </Suspense>
          ),
        },
        {
          path: "login",
          element: (
            <Suspense >
              <Login></Login>
            </Suspense>
          ),
        },
        {
          path: "register",
          element: (
            <Suspense>
              <Register></Register>
            </Suspense>
          ),
        },
        {
          path: "quiz",
          element: (
            <Suspense >
              <Quiz></Quiz>
            </Suspense>
          ),
        },
        {
          path: "history",
          element: (
            <Suspense>
              <History></History>
            </Suspense>
          ),
        },
        {
          path: "logout",
          element: (
            <Suspense>
              <Logout></Logout>
            </Suspense>
          ),
        },
        {
          path: "profile",
          element: (
            <Suspense>
              <Profile></Profile>
            </Suspense>
          ),
        },
        {
          path: "contact",
          element: (
            <Suspense>
              <Contact></Contact>
            </Suspense>
          ),
        },
        {
          path: "about",
          element: (
            <Suspense >
              <About></About>
            </Suspense>
          ),
        },
        {
          path: "attempt-quiz",
          element: (
            <Suspense>
              <AttemptQuiz></AttemptQuiz>
            </Suspense>
          ),
        },
        {
          path: "entire-quiz-details",
          element: (
            <Suspense>
              <EntireQuizDetails></EntireQuizDetails>
            </Suspense>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={browserRouterObj} />;
}

export default Routing;
