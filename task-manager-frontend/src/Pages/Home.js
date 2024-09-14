import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

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
import { changeStatus, fetchTasks, onDelete, setUser } from "../redux/actions";
import MessageBox from "../utils/MessageBox";
import Loading from "../utils/Loading";

const Home = ({ user, tasks, fetchTasks, changeStatus, onDelete }) => {
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const effectRef = useRef(false);
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [selectedTask, setSeletedTask] = useState({});
  const [active, setActive] = useState("pending");

  useEffect(() => {
    if (effectRef.current === false) {
      setLoading(true);
      fetchTasks()
        .then((res) => {
          setFilteredTasks(
            res.tasks.filter((task) =>
              task.status.toLowerCase().includes(active.toLowerCase())
            )
          );
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          setFeedback(e);
        });

      effectRef.current = true;
    }
  }, [fetchTasks, user, active]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const DateToString = (date) => {
    const dt = new Date(date);
    return dt.toDateString();
  };

  const handleSearch = (keyword) => {
    setActive(null);
    const newTasks = tasks.filter((task) =>
      task.title.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredTasks(newTasks);
  };

  const filterStatus = (type) => {
    const newTasks = tasks.filter((task) =>
      task.status.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredTasks(newTasks);
  };

  const onEditClick = (task) => {
    setSeletedTask(task);
    setIsEditing(true);
  };

  const onCheckClick = (taskId) => {
    changeStatus(user._id, taskId)
      .then((res) => {
        setFeedback(res);
        fetchTasks(user._id).then((res) =>
          setFilteredTasks(
            res.tasks.filter((task) =>
              task.status.toLowerCase().includes(active.toLowerCase())
            )
          )
        );
      })
      .catch((e) => {
        console.log(e);
        setFeedback(e);
      });
  };

  const handleDelete = (taskId) => {
    onDelete(user._id, taskId)
      .then((res) => {
        setFeedback(res);
        fetchTasks(user._id).then((res) =>
          setFilteredTasks(
            res.tasks.filter((task) =>
              task.status.toLowerCase().includes(active.toLowerCase())
            )
          )
        );
      })
      .catch((e) => {
        setFeedback(e);
      });
  };

  return (
    <>
      {loading && <Loading />}
      {feedback && (
        <MessageBox data={feedback} onClose={() => setFeedback(null)} />
      )}
      <div className={classes.home}>
        <Navbar handleSearch={handleSearch} user={setUser} />
        <Card>
          <div className={classes.filteringLinks}>
            <p
              className={active === "" && classes.active}
              onClick={() => {
                filterStatus("");
                setActive("");
              }}
            >
              All
            </p>
            <p
              className={active === "pending" && classes.active}
              onClick={() => {
                filterStatus("pending");
                setActive("pending");
              }}
            >
              Pending
            </p>
            <p
              className={active === "completed" && classes.active}
              onClick={() => {
                filterStatus("completed");
                setActive("completed");
              }}
            >
              Completed
            </p>
          </div>
          {filteredTasks.length !== 0 ? (
            filteredTasks.map((task, index) => (
              <TaskCard key={index}>
                <div className={classes.task}>
                  <p>
                    <b>Title</b> : {task.title}
                  </p>
                  <p>
                    <b>Description</b> : {task.description}
                  </p>
                  <p>
                    <b>Due Date</b> : {DateToString(task.dueDate)}
                  </p>
                  <p>
                    <b>Priority</b> : {task.priority}
                  </p>
                  <p>
                    <b>Status</b> : {task.status}
                  </p>
                </div>
                <div className={classes.actions}>
                  <button
                    style={{ margin: 0 }}
                    className={classes["edit-btn"]}
                    onClick={() => onEditClick(task)}
                  >
                    <FaRegPenToSquare />
                  </button>

                  <button
                    style={{ margin: 0 }}
                    className={classes["delete-btn"]}
                    onClick={() => handleDelete(task._id)}
                  >
                    <FiTrash />
                  </button>

                  <button
                    style={{ margin: 0 }}
                    className={classes["check-btn"]}
                    onClick={() => onCheckClick(task._id)}
                  >
                    <FaCheck />
                  </button>
                </div>
              </TaskCard>
            ))
          ) : (
            <p>No tasks available</p>
          )}
        </Card>
        <div>
          <AddButton onClick={handleModalOpen} />
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={handleModalClose}>
          <TaskForm
            handleModalClose={handleModalClose}
            setFeedback={setFeedback}
            active={active}
            setFilteredTasks={setFilteredTasks}
            user={setUser}
          />
          <button onClick={handleModalClose} className={classes["close-btn"]}>
            Cancel
          </button>
        </Modal>
      )}

      {isEditing && (
        <Modal
          onClose={() => {
            setIsEditing(false);
            setSeletedTask({});
          }}
        >
          <TaskForm
            handleModalClose={() => {
              setIsEditing(false);
              setSeletedTask({});
            }}
            setFeedback={setFeedback}
            isEditing={isEditing}
            selectedTask={selectedTask}
            active={active}
            setFilteredTasks={setFilteredTasks}
          />
          <button
            onClick={() => {
              setIsEditing(false);
              setSeletedTask({});
            }}
            className={classes["close-btn"]}
          >
            Cancel
          </button>
        </Modal>
      )}
    </>
  );
};

Home.propTypes = {
  user: PropTypes.object,
  tasks: PropTypes.array,
  fetchTasks: PropTypes.func,
  changeStatus: PropTypes.func,
  onDelete: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.user,
  tasks: state.tasks,
});

export default connect(mapStateToProps, { fetchTasks, changeStatus, onDelete })(
  Home
);
