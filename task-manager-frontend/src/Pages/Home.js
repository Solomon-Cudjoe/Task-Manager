import React from "react";
import classes from "./Home.module.css";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { FaRegPenToSquare } from "react-icons/fa6";
import { FiTrash } from "react-icons/fi";
import { FaCheck } from "react-icons/fa6";

const Home = () => {
  const data = ["name", "email", "password"];
  return (
    <>
      <div className={classes.home}>
        <Navbar />

        <Card>
          <div></div>
          <div className={classes["task-card"]}>
            {data.map((item) => {
              return <p>{item}</p>;
            })}
          </div>
          <div className={classes.actions}>
            <button className={classes["edit-btn"]}>
              <FaRegPenToSquare />
            </button>

            <button className={classes["delete-btn"]}>
              <FiTrash />
            </button>

            <button className={classes["check-btn"]}>
              <FaCheck />
            </button>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Home;
