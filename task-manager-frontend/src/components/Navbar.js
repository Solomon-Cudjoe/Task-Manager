import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classes from "./Navbar.module.css";
import { IoPersonOutline } from "react-icons/io5";
import { GoSun } from "react-icons/go";
import { IoExitOutline } from "react-icons/io5";

import { handleLogout } from "../redux/actions";

// import { IoMoonOutline } from "react-icons/io5";
// <IoMoonOutline />

const Navbar = ({ handleLogout }) => {
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
      <header className={classes.header}>
        <nav className={classes.nav}>
          <div className={classes.left}>
            <input
              className={classes.input}
              type="text"
              name="search"
              placeholder="Search Tasks..."
              autoComplete="false"
            />
            <button type="submit" className={classes["search-btn"]}>
              Search
            </button>
          </div>

          <div className={classes.right}>
            <div className={classes.profile}>
              <IoPersonOutline size={40} />
            </div>

            <div>
              <button className={classes["mode-btn"]}>
                <GoSun size={20} />
              </button>

              <button className={classes["logout-btn"]} onClick={logout}>
                <IoExitOutline size={20} />
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

Navbar.propTypes = {
  handleLogout: PropTypes.func,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { handleLogout })(Navbar);
