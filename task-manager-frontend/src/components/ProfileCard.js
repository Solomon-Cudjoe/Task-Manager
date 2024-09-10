import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classes from "./ProfileCard.module.css";
import { IoPersonOutline } from "react-icons/io5";
import { FaRegPenToSquare } from "react-icons/fa6";
import { PiWarningOctagon } from "react-icons/pi";
import { IoExitOutline } from "react-icons/io5";
import { getVerificationToken, handleLogout } from "../redux/actions";
import MessageBox from "../utils/MessageBox";

const ProfileCard = ({ user, handleLogout, children, getVerificationToken }) => {
  const [feedback, setFeedback] = useState(null)
  const logout = () => {
    handleLogout()
      .then((res) => {
        console.log(res);
        alert(res.message);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleGetToken = () => {
    if (!user.verified) {
      getVerificationToken(user.email).then((res) => {
        setFeedback(res);
      }).catch(e => setFeedback(e));
    }
  }

  return (
    <>
      {feedback && <MessageBox data={feedback} onClose={()=>setFeedback(null)}/>}
      <div className={classes.profileCard}>
        {children}

        <div className={classes.profile}>
          <IoPersonOutline size={40} />
        </div>
        <p>Hi, { user.firstName + ' ' + user.lastName } </p>
        <div className={classes["account-info"]}>
          <Link to="/account-info">
            <FaRegPenToSquare size={20} />
            <h6 className={classes.text}>Edit Account Info</h6>
          </Link>

          <Link onClick={handleGetToken}>
            <PiWarningOctagon size={20} style={{ color: user.verified ? 'green' :"#FFD233" }} />
            <h6 className={classes.text}>{ user.verified ? "Verified" : "Account not verified, verify now"}</h6>
          </Link>

          <button className={classes["logout-btn"]} onClick={logout}>
            <IoExitOutline size={20} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

ProfileCard.propTypes = {
  handleLogout: PropTypes.func,
  getVerificationToken: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { handleLogout, getVerificationToken })(ProfileCard);
