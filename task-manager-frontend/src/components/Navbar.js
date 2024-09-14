import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classes from "./Navbar.module.css";
import { IoPersonOutline } from "react-icons/io5";
import { GoSun, GoSearch, GoX, GoMoon } from "react-icons/go";

import { FaBell } from "react-icons/fa6";
import ProfileCard from "./ProfileCard";

import { getNotifications, setTheme } from "../redux/actions";

// import { IoMoonOutline } from "react-icons/io5";
// <IoMoonOutline />

const Navbar = ({
  handleSearch,
  user,
  getNotifications,
  notifications,
  setTheme,
  theme,
}) => {
  const [keyword, setKeyword] = useState("");
  const [openNotifications, setOpenNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchClick, setSearchClick] = useState(false);

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

          {showProfile && <ProfileCard user={user} onClose={toggleProfile} />}

          <div style={{ display: "flex", gap: "1rem" }}>
            <button onClick={toggleTheme} className={classes["mode-btn"]}>
              {theme === "dark" ? <GoSun size={20} /> : <GoMoon size={20} />}
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
                  right: "0px",
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
                      backgroundColor: not.status === "read" ? "red" : "#FFF",
                    }}
                  >
                    <span>{` ${not.message}, kindly attend to it.`}</span>
                  </div>
                ))}
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
};

const mapStateToProps = (state) => ({
  user: state.user,
  notifications: state.notifications,
  theme: state.theme,
});

export default connect(mapStateToProps, { getNotifications, setTheme })(Navbar);
