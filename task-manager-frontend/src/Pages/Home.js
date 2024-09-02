import React, { useState } from "react";
import classes from "./Home.module.css";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import TaskCard from "../components/TaskCard";
import Modal from "../components/Modal";
import TaskForm from "../components/TaskForm";

import { FaRegPenToSquare } from "react-icons/fa6";
import { FiTrash } from "react-icons/fi";
import { FaCheck } from "react-icons/fa6";
import AddButton from "../components/AddButton";
const Home = (props) => {
  const name = "Solomon";
  const email = "solomon@gmail.com";

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

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
          </TaskCard>

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

        <div>
          <AddButton onClick={handleModalOpen} />
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={handleModalClose}>
          <TaskForm />
          <button onClick={handleModalClose} className={classes["close-btn"]}>
            Cancel
          </button>
        </Modal>
      )}
    </>
  );
};

export default Home;
