import React from "react";
import { FaPlus } from "react-icons/fa6";
import classes from "./AddButton.module.css";

const AddButton = (props) => {
  return (
    <div>
      <button className={classes["add-btn"]} onClick={props.onClick}>
        <FaPlus size={20} />
      </button>
    </div>
  );
};

export default AddButton;
