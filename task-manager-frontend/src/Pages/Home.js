import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
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
import { changeStatus, fetchTasks, onDelete } from "../redux/actions";
import MessageBox from "../utils/MessageBox";
import Loading from "../utils/Loading";


const Home = ({ user, tasks, fetchTasks, changeStatus, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchTasks(user._id).then((res) => {
      setLoading(false);
      setFeedback(res)
    }).catch((e) => {
      setLoading(false);
      setFeedback(e)
    })
  },[fetchTasks,user])
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const DateToString = (date) => {
    const dt = new Date(date);
    return dt.toDateString();
  }

  const onCheckClick = (taskId) => {
    changeStatus(user._id, taskId).then((res) => {
      console.log(res);
      setFeedback(res);
    }).catch((e) => {
      console.log(e);
      setFeedback(e);
    })
  }

  const handleDelete = (taskId) => {
    onDelete(user._id, taskId).then((res) => {
      setFeedback(res);
    }).catch((e) => {
      setFeedback(e);
    })
  }


  return (
    <>
      {loading && (<Loading/>)}
      {feedback && (<MessageBox data={feedback} onClose={ () => setFeedback(null)  }/>)}
      <div className={classes.home}>
        <Navbar />
        <Card>
          {tasks.map((task, index) => (
              <TaskCard key={index}>
                <div className={classes.task}>
                  <p><b>Title</b> : {task.title}</p>
                  <p><b>Description</b> : {task.description}</p>
                  <p><b>Due Date</b> : {DateToString(task.dueDate)}</p>
                  <p><b>Priority</b> : {task.priority}</p>
                  <p><b>Status</b> : { task.status }</p>
                </div>
                <div className={classes.actions}>
                  <button className={classes["edit-btn"]}>
                    <FaRegPenToSquare />
                  </button>

                  <button className={classes["delete-btn"]} onClick={() => handleDelete(task._id)}>
                    <FiTrash />
                  </button>

                <button className={classes["check-btn"]} onClick={() => onCheckClick(task._id)}>
                    <FaCheck />
                  </button>
                </div>
              </TaskCard>
            ))
          }
          
        </Card>

        <div>
          <AddButton onClick={handleModalOpen} />
        </div>
      </div>

      {isModalOpen && (
        <Modal onClose={handleModalClose}>
          <TaskForm user={user} />
          <button onClick={handleModalClose} className={classes["close-btn"]}>
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
  onDelete: PropTypes.func
}

const mapStateToProps = (state) => ({
  user: state.user,
  tasks: state.tasks
})


export default connect(mapStateToProps, {fetchTasks, changeStatus, onDelete})(Home)