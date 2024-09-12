import React, { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import classes from "./AccountInfo.module.css";
import Card from "../components/Card";
import { changePassword, editUser } from "../redux/actions";
import Loading from "../utils/Loading"
import MessageBox from "../utils/MessageBox"

const AccountInfo = ({user, editUser, changePassword}) => {
  const [credentials, setCredentials] = useState({ firstName: '', lastName: '', email: '' });
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isClicked, setIsClicked] = useState('profile');
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const effectRef = useRef(false);
  
  const switchSettings = (value) => {
        setIsClicked(value);
  }
  
  useEffect(() => {
    if (effectRef.current === false) {
      setCredentials({
        ...credentials,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email
      })
      effectRef.current = true;
    }
  },[credentials, user, setCredentials])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name] : value
    })
  }

  const handleEdit = () => {
    setLoading(true)
    editUser(user.email, credentials).then(() => setLoading(false));
  }

  const handlePasswordChange = () => {
    setLoading(true)
    if (newPassword !== confirmPassword) {
      setFeedback({ error: 'Passwords do not match' });
      setLoading(false);
    }
    changePassword(user.email, password, newPassword).then((res) => {
      setFeedback(res);
      setLoading(false);
      setPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }).catch(e => { setFeedback(e);  setLoading(false)});
  }

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {loading && <Loading />}
      {feedback && <MessageBox data={ feedback } onClose={() => setFeedback(null)} />}
      <Card>
        <div className={classes.slider}>
          <button 
            className={isClicked === "profile" ? classes.slider_active : classes.slider_btn}
            onClick={() => switchSettings("profile")}
          >Profile Settings</button>
          <button 
              className={isClicked === "password" ? classes.slider_active : classes.slider_btn}
              onClick={() => switchSettings("password")}
          >Change Password</button>
        </div>
        <div className={classes.AccountInfo}>
          {
            isClicked === 'profile' ? (
              <div>
                <h1>Change Account Information</h1>
                <div className={classes.firstname}>
                  <label htmlFor="firstname">First Name</label>
                  <input onChange={handleChange} type="text" name="firstName" required value={credentials.firstName}/>
                </div>

                <div className={classes.lastname}>
                  <label htmlFor="lastName">Last Name</label>
                  <input onChange={handleChange} type="text" name="lastName" required value={credentials.lastName}/>
                </div>
                <div className={classes.lastname}>
                  <label htmlFor="email">Email</label>
                  <input onChange={handleChange} type="email" name="email" required value={credentials.email}/>
                </div>
                <button className={classes.acc_btn} onClick={handleEdit}>Update</button>
              </div>
            ) : (
                <div>
                  <h1>Change Password</h1>
                  <div className={classes.password}>
                    <label htmlFor="oldPassword">Old Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" required />

                    <label htmlFor="newPassword">New Password</label>
                    <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" name="password" required />

                    <label htmlFor="confirmNewPassword">Confirm New Password</label>
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="password" required />
                  </div>
                  <button className={classes.acc_btn} onClick={handlePasswordChange}>Change Password</button>
                </div>
            )
          }
        </div>
      </Card>
    </div>
  );
};

AccountInfo.propTypes = {
  user: PropTypes.object,
  editUser: PropTypes.func,
  changePassword: PropTypes.func
}

const mapStateToProps = (state) => ({
  user: state.user
})


export default connect(mapStateToProps, {editUser, changePassword})(AccountInfo)