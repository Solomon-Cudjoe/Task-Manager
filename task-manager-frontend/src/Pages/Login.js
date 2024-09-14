import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import Card from "../components/Card";
import { FcGoogle } from "react-icons/fc";
import { handleLogin } from "../redux/actions";
import getGoogleOAuth from "../utils/google";
import MessageBox from "../utils/MessageBox";

const Login = ({ handleLogin }) => {
  const [feedback, setFeedback] = useState(null);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log(credentials);
    e.preventDefault();
    handleLogin(credentials)
      .then((res) => {
        setFeedback(res);
        setTimeout(() => navigate("/"), 1000);
      })
      .catch((e) => {
        setFeedback(e);
      });
  };
  return (
    <div className={classes.login}>
      {feedback && (
        <MessageBox data={feedback} onClose={() => setFeedback(null)} />
      )}
      <Card>
        <form action="" className="login-form">
          <input
            type="email"
            name="email"
            className=""
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            className=""
            placeholder="Password"
            onChange={handleChange}
          />
          <Link to="/forgot-password">Forgot Password?</Link>
        </form>
        <button
          type="submit"
          className={classes["login-btn"]}
          onClick={handleSubmit}
        >
          Login
        </button>
        <Link
          style={{ fontSize: 16, fontWeight: 700, marginTop: 20 }}
          to="/signup"
        >
          Don't have an account? Signup now
        </Link>

        <p>Or Login With</p>
        <hr />

        <div className={classes["login-actions"]}>
          <button
            className={classes["google-btn"]}
            onClick={() => {
              window.location.href = getGoogleOAuth();
            }}
          >
            <FcGoogle />
            <p>Google</p>
          </button>
        </div>
      </Card>
    </div>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { handleLogin })(Login);
