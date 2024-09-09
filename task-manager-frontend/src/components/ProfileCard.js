import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classes from "./ProfileCard.module.css";
import { IoPersonOutline } from "react-icons/io5";
import { FaRegPenToSquare } from "react-icons/fa6";
import { PiWarningOctagon } from "react-icons/pi";
import { IoExitOutline } from "react-icons/io5";
import { handleLogout } from "../redux/actions";

const ProfileCard = ({ user, handleLogout, children }) => {
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
  return (
    <>
      <div className={classes.profileCard}>
        {children}

        <div className={classes.profile}>
          <IoPersonOutline size={40} />
          {/* {user?.map((item) => {
            return <span key={item.id}>{item.firstName}</span>;
          })} */}
        </div>

        <div className={classes["account-info"]}>
          <Link to="/account-info">
            <FaRegPenToSquare size={20} />
            <h6 className={classes.text}>Edit Account Info</h6>
          </Link>

          <Link to="/account-verification">
            <PiWarningOctagon size={20} style={{ color: "#FFD233" }} />
            <h6 className={classes.text}>Account not verified, verify now</h6>
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
  getNotifications: PropTypes.func,
  user: PropTypes.object,
  notifications: PropTypes.array,
};

const mapStateToProps = (state) => ({
  user: state.user,
  notifications: state.notifications,
});

export default connect(mapStateToProps, { handleLogout })(ProfileCard);
