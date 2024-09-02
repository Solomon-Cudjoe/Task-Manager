import React from "react";
import { Link } from "react-router-dom";
import classes from "./Login.module.css";
import Card from "../components/Card";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Signup = () => {
  return (
    <div className={classes.login}>
      <Card>
        <form action="" className="login-form">
          <input
            type="text"
            name="firstname"
            className=""
            placeholder="Firstname"
          />
          <input
            type="text"
            name="lastname"
            className=""
            placeholder="Lastname"
          />
          <input type="email" name="email" className="" placeholder="Email" />
          <input
            type="password"
            name="password"
            className=""
            placeholder="Password"
          />
          <input
            type="password"
            name="password"
            className=""
            placeholder="Confirm Password"
          />
        </form>
        <button type="submit" className={classes["login-btn"]}>
          Login
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
