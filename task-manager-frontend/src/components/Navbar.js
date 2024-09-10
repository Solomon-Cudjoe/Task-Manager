import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classes from "./Navbar.module.css";
import { IoPersonOutline } from "react-icons/io5";
import { GoSun } from "react-icons/go";

import { FaBell } from "react-icons/fa6";
import ProfileCard from "./ProfileCard";

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
  const [showProfile, setShowProfile] = useState(false);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setOpenNotifications(false);
  };

  const handleNotifications = () => {
    setShowProfile(false);
    if (!openNotifications) {
      getNotifications(user._id)
        .then(() => {
          setOpenNotifications(!openNotifications);
        })
        .catch((e) => alert(e.error));
    } else {
      setOpenNotifications(!openNotifications);
    }
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
            <div className={classes.profile} onClick={toggleProfile}>
              <IoPersonOutline size={40} />
            </div>

            {showProfile && <ProfileCard user={user} onClose={toggleProfile} />}

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

              {openNotifications && (
                <div
                  className={classes["notification-container"]}
                  style={{
                    position: "absolute",
                    top: "5.7rem",
                    height: "auto",
                    maxHeight: "30rem",
                    overflowY: "auto",
                  }}
                >
                  {notifications.map((not, index) => (
                    <div
                      key={index}
                      className={classes.notification}
                      style={{
                        backgroundColor:
                          not.status === "read" ? "red" : "#4ECB71",
                      }}
                    >
                      <span>{` ${not.message}, kindly attend to it.`}</span>

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
  notifications: PropTypes.array,
};

const mapStateToProps = (state) => ({
  user: state.user,
  notifications: state.notifications,
});

export default connect(mapStateToProps, { handleLogout, getNotifications })(
  Navbar
);
