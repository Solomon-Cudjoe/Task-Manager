import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classes from "./TaskCard.module.css";

const TaskForm = ({ user }) => {
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    dueDate: null,
    priority: "low",
  });
  //   const [dueDate, setDueDate] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskForm({ ...taskForm, [name]: value });
  };

  const handleDateChange = (date) => {
    setTaskForm({ ...taskForm, dueDate: date });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(taskForm);
    await axios
      .post(`http://localhost:5001/task/${user._id}`, taskForm)
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
        alert(err.response.data.error);
        console.log(err);
      });
  };

  return (
    <div className={classes.task}>
      <h1 style={{ color: "#6c63ff", textAlign: "center" }}>Add New Task</h1>
      <form>
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

        <DatePicker
          selected={taskForm.dueDate}
          onChange={handleDateChange}
          dateFormat="MMMM d, yyyy"
          className={classes.datepicker}
          placeholderText="Select due date"
        />

        <select
          name="priority"
          value={taskForm.priority}
          onChange={handleChange}
          className={classes.select}
        >
          <option value="" disabled>
            Select priority
          </option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </form>
      <button
        type="submit"
        className={classes["addTask-btn"]}
        onClick={handleSubmit}
      >
        Add
      </button>
    </div>
  );
};

export default TaskForm;
