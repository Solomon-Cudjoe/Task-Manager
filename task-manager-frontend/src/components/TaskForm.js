import React, { useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import classes from "./TaskCard.module.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  fetchTasks,
  getTags,
  handleTaskCreation,
  handleTaskEdit,
} from "../redux/actions";
const TaskForm = ({
  user,
  setFeedback,
  handleModalClose,
  handleTaskCreation,
  isEditing,
  selectedTask,
  categories,
  getTags,
  handleTaskEdit,
  fetchTasks,
  active,
  setFilteredTasks}) => {
  const effectRef = useRef(false)
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    dueDate: null,
    priority: "low",
    category: "",
  });

  useEffect(() => {
    if(effectRef.current === false){
      getTags()
      if (isEditing) {
        setTaskForm({
          title: selectedTask.title,
          description: selectedTask.description,
          dueDate: selectedTask.dueDate,
          priority: selectedTask.priority,
          category: selectedTask.category ? selectedTask.category : null
        })
      }
      effectRef.current = true;
    }
    
  },[isEditing, selectedTask, getTags, setTaskForm]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskForm({ ...taskForm, [name]: value });
  };

  const handleDateChange = (date) => {
    setTaskForm({ ...taskForm, dueDate: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      handleTaskEdit(user._id, selectedTask._id, taskForm)
        .then((response) => {
          setFeedback(response);
          fetchTasks(user._id).then((res) => {
            setFilteredTasks(res.tasks.filter((task) => task.status.toLowerCase().includes(active.toLowerCase())))
          });
          handleModalClose();
        })
        .catch((err) => {
          setFeedback(err);
        });
    } else {
      handleTaskCreation(user._id, taskForm)
        .then((response) => {
          setFeedback(response);
          fetchTasks(user._id).then((res) => {
            setFilteredTasks(res.tasks.filter((task) => task.status.toLowerCase().includes(active.toLowerCase())))
          });
          handleModalClose();
        })
        .catch((err) => {
          setFeedback(err);
        });
    }
  };

  return (
    <div className={classes.task}>
      <h1 style={{ color: "#6c63ff", textAlign: "center" }}>Add New Task</h1>
      <form>
        <input
          type="text"
          name="title"
          value={taskForm.title}
          placeholder="Title"
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={taskForm.description}
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

        {isEditing && (
          <select
            name="category"
            onChange={handleChange}
            value={taskForm.category ? taskForm.category : ""}
            className={classes.select}
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((cat, index) => (
              <option
                key={index}
                value={cat._id}
                style={{ textTransform: "capitalize" }}
              >
                {cat.name}
              </option>
            ))}
          </select>
        )}
      </form>
      <button
        type="submit"
        className={classes["addTask-btn"]}
        onClick={handleSubmit}
      >
        {isEditing ? "Save" : "Add"}
      </button>
    </div>
  );
};

TaskForm.propTypes = {
  user: PropTypes.object,
  handleTaskCreation: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.user,
  categories: state.categories,
});

export default connect(mapStateToProps, {
  handleTaskCreation,
  getTags,
  fetchTasks,
  handleTaskEdit,
})(TaskForm);