import React from 'react'
import { connect } from 'react-redux'
import classes from "./Card.module.css";


const Card = (props) => {
  return <div className={`${classes.card} ${props.theme === 'dark' && "darkBackground2" }`}>{props.children}</div>;
};

const mapStateToProps = (state) => ({
  theme: state.theme
})


export default connect(mapStateToProps, {})(Card)