import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classes from "./Login.module.css";
import Card from "../components/Card";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import getGoogleOAuth from "../utils/google";
import { handleSignUp } from "../redux/actions";

const Signup = ({ handleSignUp }) => {
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials);
    handleSignUp(credentials)
      .then((res) => {
        console.log(res);
        alert(res.message);
        navigate("/login");
      })
      .catch((e) => {
        console.log(e);
        alert(e.error);
      });
  };

  return (
    <div className={classes.login}>
      <Card>
        <form className="login-form">
          <input
            type="text"
            name="firstName"
            placeholder="Firstname"
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Lastname"
            onChange={handleChange}
          />
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
          <input
            type="password"
            name="password"
            placeholder="Confirm Password"
            onChange={handleChange}
          />
        </form>
        <button
          type="submit"
          className={classes["login-btn"]}
          onClick={handleSubmit}
        >
          SignUp
        </button>
        <Link
          style={{ fontSize: 16, fontWeight: 700, marginTop: 20 }}
          to="/login"
        >
          Already have an account? SignIn now
        </Link>

        <p>Or SignUp With</p>
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

Signup.propTypes = {
  handleSignUp: PropTypes.func,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { handleSignUp })(Signup);
