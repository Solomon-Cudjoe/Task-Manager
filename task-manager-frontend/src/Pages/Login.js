import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import classes from "./Login.module.css";
import Card from "../components/Card";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Login = () => {
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
    e.preventDefault();
    console.log(credentials);
    await axios
      .post("http://localhost:5001/auth/login", credentials)
      .then((response) => {
        console.log(response.data);
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert(response.data.message);
          navigate("/");
        }
      })
      .catch((err) => {
        alert("Failed to login");
        console.log(err.message);
      });
  };
  return (
    <div className={classes.login}>
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
          <Link>Forgot Password?</Link>
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
          <button className={classes["google-btn"]}>
            <FcGoogle />
            <p>Google</p>
          </button>

          <button className={classes["google-btn"]}>
            <FaFacebook />
            <p>Facebook</p>
          </button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
