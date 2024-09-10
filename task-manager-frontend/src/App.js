import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import { useEffect, useState, useRef } from "react";
import { checkAuth } from "./redux/actions";
import MessageBox from "./utils/MessageBox";
import Loading from "./utils/Loading";
import PasswordReset from "./components/PasswordReset";
import Verify from "./utils/Verify";

function App({ checkAuth, authenticated }) {
  const effectRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (effectRef.current === false) {
      if (
        location.pathname !== "forgot-password" &&
        location.pathname !== "forgot-password/:token"
      ) {
        checkAuth()
          .then((res) => {
            setLoading(false);
          })
          .catch((e) => {
            setFeedback(e);
            setLoading(false);
          });
      }

      effectRef.current = true
    }
  }, [checkAuth, location]);

  return (
    <>
      {loading && <Loading />}
      {feedback && (
        <MessageBox data={feedback} onClose={() => setFeedback(null)} />
      )}
      <Routes>
        <Route
          path="/Login"
          element={authenticated ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/Signup"
          element={authenticated ? <Navigate to={"/"} /> : <Signup />}
        />
        <Route
          path="/"
          element={!authenticated ? <Navigate to={"/Login"} /> : <Home />}
        />
        <Route
          path="/forgot-password/:token"
          element={authenticated ? <Navigate to={"/"} /> : <PasswordReset />}
        />
        <Route
          path="/forgot-password"
          element={authenticated ? <Navigate to={"/"} /> : <PasswordReset />}
        />
        <Route
          path="/verify/:token"
          element={<Verify/>}
        />
      </Routes>
    </>
  );
}

App.propTypes = {
  authenticated: PropTypes.bool,
  checkAuth: PropTypes.func,
};

const mapStateToProps = (state) => ({
  authenticated: state.authenticated,
});

export default connect(mapStateToProps, { checkAuth })(App);
