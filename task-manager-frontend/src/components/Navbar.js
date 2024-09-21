import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classes from "./Navbar.module.css";
import { IoPersonOutline } from "react-icons/io5";
import { GoSun, GoSearch, GoX, GoMoon } from "react-icons/go";
import { AiFillEye, AiOutlineExclamationCircle } from 'react-icons/ai';
import { FaBell, FaTrash } from "react-icons/fa6";
import ProfileCard from "./ProfileCard";

import { getNotifications, onNotificationDelete, readNotification, setTheme, setUser } from "../redux/actions";

// import { IoMoonOutline } from "react-icons/io5";
// <IoMoonOutline />

const Navbar = ({
  handleSearch,
  user,
  getNotifications,
  notifications,
  setTheme,
  theme,
  readNotification,
  onNotificationDelete
}) => {
  const [keyword, setKeyword] = useState("");
  const [openNotifications, setOpenNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchClick, setSearchClick] = useState(false);

  useEffect(() => {
    getNotifications(user._id);
  },[user, getNotifications])

  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setOpenNotifications(false);
  };

  const toggleTheme = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
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

  const handleRead = (notification) => {
    if (notification.status === "unread" || !notification.status) {
      readNotification(user._id, notification._id).then(() => getNotifications(user._id));
    };
  }

  const handleDel = (id) => {
    onNotificationDelete(user._id, id).then(() => getNotifications(user._id));
  }

  return (
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
            <GoSearch />
          </button>
        </div>
        <div className={classes.leftMobile}>
          <button
            type="submit"
            className={classes["search-btn"]}
            onClick={() => setSearchClick(!searchClick)}
          >
            {searchClick ? <GoX /> : <GoSearch />}
          </button>
          <div className={searchClick ? classes.show : classes.mobileSearch}>
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
              <GoSearch />
            </button>
          </div>
        </div>

        <div className={classes.right}>
          <div className={classes.profile} onClick={toggleProfile}>
            <IoPersonOutline size={40} />
          </div>

          {showProfile && (
            <ProfileCard user={setUser} onClose={toggleProfile} />
          )}

          <div style={{ display: "flex", gap: "1rem" }}>
            <button onClick={toggleTheme} className={classes["mode-btn"]}>
              {theme === "dark" ? <GoSun size={20} /> : <GoMoon size={20} />}
            </button>
            <button className={classes["mode-btn"]} onClick={handleNotifications}>
              <FaBell size={20} />
              {notifications.filter(not => not.status !== "read").length > 0 && (
                <span className={classes["badge"]}>
                  {notifications.filter(not => not.status !== "read").length}
                </span>
              )}
            </button>
            {openNotifications && (
              <div
                className={classes["notification-container"]}
                style={{
                  position: "absolute",
                  top: "5.7rem",
                  right: "0px",
                  height: "auto",
                  maxHeight: "30rem",
                  overflowY: "auto",
                  cursor: "pointer"
                }}
              >
                {notifications.length !== 0 ? (
                  notifications.map((not, index) => (
                    <div
                      key={index}
                      className={classes.notification}
                      style={{
                        backgroundColor: not.status === "read" ? "#f0f0f0" : "#ffe6e6",
                        borderLeft: not.status === "read" ? "4px solid #ccc" : "4px solid red",
                        padding: '10px',
                        margin: '5px 0',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'background-color 0.3s',
                      }}
                      title={not.title}
                      onClick={() => handleRead(not)}
                    >
                      <span style={{ marginRight: '10px' }}>
                        {not.status === "read" ? (
                          <AiFillEye style={{ color: '#999' }} />
                        ) : (
                          <AiOutlineExclamationCircle style={{ color: 'red' }} />
                        )}
                      </span>
                      <span>{`${not.message}, kindly attend to it.`}</span>
                      <span>
                        <FaTrash style={{ zIndex: 300 }} size={20} onClick={() => handleDel(not._id)} />
                      </span>
                    </div>
                  ))
                ) : (
                  <p style={{
                    backgroundColor: "#f0f0f0",
                    paddingInline: "1rem",
                    paddingBlock: ".5rem",
                    width: "320px",
                    textAlign: "center"
                  }}>No notifications available</p>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

Navbar.propTypes = {
  handleLogout: PropTypes.func,
  getNotifications: PropTypes.func,
  user: PropTypes.object,
  notifications: PropTypes.array,
  readNotification: PropTypes.func,
  onNotificationDelete: PropTypes.func
};

const mapStateToProps = (state) => ({
  user: state.user,
  notifications: state.notifications,
  theme: state.theme,
});

export default connect(mapStateToProps, { getNotifications, setTheme, readNotification, onNotificationDelete })(Navbar);
