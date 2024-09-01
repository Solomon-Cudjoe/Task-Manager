import React from "react";
import classes from "./Home.module.css";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <div className={classes.home}>
        <Navbar />
      </div>
    </>
  );
};

export default Home;
