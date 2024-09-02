import React from "react";
import classes from "./Navbar.module.css";
import { IoPersonOutline } from "react-icons/io5";
import { GoSun } from "react-icons/go";

// import { IoMoonOutline } from "react-icons/io5";
// <IoMoonOutline />

const Navbar = () => {
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
              autoFocus="true"
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
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
