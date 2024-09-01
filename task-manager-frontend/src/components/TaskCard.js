import React from "react";
import classes from "./TaskCard.module.css";

const TaskCard = (props) => {
  return <div className={classes["task-card"]}>{props.children}</div>;
};

export default TaskCard;
