import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import classes from "./Login.module.css";
import Card from "../components/Card";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Signup = () => {
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
    await axios
      .post("http://localhost:5000/auth/signUp", credentials)
      .then((response) => {
        console.log(response.data);
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert(response.data.message);
          navigate("/login");
        }
      })
      .catch((err) => {
        alert("Registration failed");
        console.log(err.message);
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
        <Link style={{ fontSize: 16, fontWeight: 700, marginTop: 20 }}>
          Already have an account? SignIn now
        </Link>

        <p>Or SignUp With</p>
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

export default Signup;
