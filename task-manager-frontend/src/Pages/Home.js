import React from "react";
import classes from "./Home.module.css";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import TaskCard from "../components/TaskCard";

import { FaRegPenToSquare } from "react-icons/fa6";
import { FiTrash } from "react-icons/fi";
import { FaCheck } from "react-icons/fa6";

const Home = () => {
  const name = "Solomon";
  const email = "solomon@gmail.com";
  return (
    <>
      <div className={classes.home}>
        <Navbar />

        <Card>
          <TaskCard>
            <h2>{name}</h2>
            <p>{email}</p>
            <h2>{name}</h2>
            <p>{email}</p>
            <h2>{name}</h2>
            <p>{email}</p>
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
          </TaskCard>
        </Card>
      </div>
    </>
  );
};

export default Home;
