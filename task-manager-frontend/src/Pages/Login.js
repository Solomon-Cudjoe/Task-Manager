import React from "react";
import { Link } from "react-router-dom";
import classes from "./Login.module.css";
import Card from "../components/Card";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Login = () => {
  return (
    <div className={classes.login}>
      <Card>
        <form action="" className="login-form">
          <input type="email" name="email" className="" placeholder="Email" />
          <input
            type="password"
            name="password"
            className=""
            placeholder="Password"
          />
          <Link>Forgot Password?</Link>
        </form>
        <button type="submit" className={classes["login-btn"]}>
          Login
        </button>
        <Link style={{ fontSize: 16, fontWeight: 700, marginTop: 20 }}>
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
