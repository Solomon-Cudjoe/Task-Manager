import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classes from "./Navbar.module.css";
import { IoPersonOutline } from "react-icons/io5";
import { GoSun } from "react-icons/go";
import { IoExitOutline } from "react-icons/io5";
import { FaBell } from "react-icons/fa6";

import { getNotifications, handleLogout } from "../redux/actions";

// import { IoMoonOutline } from "react-icons/io5";
// <IoMoonOutline />

const Navbar = ({
  handleLogout,
  handleSearch,
  user,
  getNotifications,
  notifications,
}) => {
  const [keyword, setKeyword] = useState("");
  const [openNotifications, setOpenNotifications] = useState(false);
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

  const handleNotifications = () => {
    getNotifications(user._id)
      .then(() => {
        setOpenNotifications(!openNotifications);
      })
      .catch((e) => alert(e.error));
  };

  const onInputChange = (e) => {
    handleSearch(e.target.value);
    setKeyword(e.target.value);
  };

  const onSearchClick = () => {
    handleSearch(keyword);
  };

  return (
    <>
      <header className={classes.header}>
        <nav className={classes.nav}>
          <div className={classes.left}>
            <input
              className={classes.input}
              type="text"
              name="search"
              onChange={onInputChange}
              placeholder="Search Tasks..."
              autoComplete="false"
            />
            <button
              type="submit"
              className={classes["search-btn"]}
              onClick={onSearchClick}
            >
              Search
            </button>
          </div>

          <div className={classes.right}>
            <div className={classes.profile}>
              <IoPersonOutline size={40} />
            </div>

            <div style={{ display: "flex", gap: "1rem" }}>
              <button className={classes["mode-btn"]}>
                <GoSun size={20} />
              </button>
              <button
                className={classes["mode-btn"]}
                onClick={handleNotifications}
              >
                <FaBell size={20} />
              </button>
              <button className={classes["logout-btn"]} onClick={logout}>
                <IoExitOutline size={20} />
                Logout
              </button>

              {openNotifications && (
                <div
                  style={{
                    position: "absolute",
                    top: "5.7rem",
                    height: "auto",
                    maxHeight: "30rem",
                    overflowY: "auto",
                  }}
                >
                  {notifications.map((not, index) => (
                    <div key={index}>
                      <p>Title : {not.title}</p>
                      <p>Message : {not.message}</p>
                      <p>Status: {not.status || "Unread"}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

Navbar.propTypes = {
  handleLogout: PropTypes.func,
  getNotifications: PropTypes.func,
  user: PropTypes.object,
  notifications: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user,
  notifications: state.notifications,
});

export default connect(mapStateToProps, { handleLogout, getNotifications })(
  Navbar
);
