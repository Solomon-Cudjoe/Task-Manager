import React from "react";
import classes from "./AccountInfo.module.css";
import Card from "../components/Card";

const AccountInfo = () => {
  return (
    <>
      <Card>
        <div className={classes.AccountInfo}>
          <h1>Change Account Information</h1>

          <div className={classes.firstname}>
            <label htmlFor="firstname">First Name</label>
            <input type="text" name="firstName" required />
          </div>

          <div className={classes.lastname}>
            <label htmlFor="firstname">Last Name</label>
            <input type="text" name="lastName" required />
          </div>

          <h1>Change Password</h1>

          <div className={classes.password}>
            <label htmlFor="oldPassword">Old Password</label>
            <input type="password" name="password" required />

            <label htmlFor="newPassword">New Password</label>
            <input type="password" name="password" required />

            <label htmlFor="confirmNewPassword">Confirm New Password</label>
            <input type="password" name="password" required />
          </div>

          <button type="submit">Update</button>
        </div>
      </Card>
    </>
  );
};

export default AccountInfo;
