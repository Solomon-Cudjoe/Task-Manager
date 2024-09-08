import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import { useEffect, useState } from "react";
import { checkAuth } from "./redux/actions";
import MessageBox from "./utils/MessageBox";
import Loading from "./utils/Loading";

function App({ checkAuth, authenticated }) {
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    checkAuth().then((res) => {
      setFeedback(res);
      setLoading(false);
    }).catch((e) => {
      setFeedback(e);
      setLoading(false);
    });
  }, [checkAuth]);

  return (
    <>
      {loading && (<Loading/>)}
      {feedback && (<MessageBox data={feedback} onClose={ () => setFeedback(null)  }/>)}
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
