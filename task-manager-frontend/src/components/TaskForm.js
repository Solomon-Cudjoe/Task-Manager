import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classes from "./TaskCard.module.css";

const TaskForm = ({ onClose }) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [dueDate, setDueDate] = useState(new Date());

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
    <div className={classes.task}>
      <h1>Add New Task</h1>
      <form className="login-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} />
      </form>
      <button
        type="submit"
        className={classes["addTask-btn"]}
        onClick={handleSubmit}
      >
        ADD
      </button>
    </div>
  );
};

export default TaskForm;
