import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Box, Button, TextField, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useParams, useNavigate } from 'react-router-dom';
import { forgotPassword, resetPassword } from '../redux/actions';
import MessageBox from '../utils/MessageBox';
import Loading from '../utils/Loading';

const useStyles = makeStyles({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
  }
});

const PasswordReset = ({forgotPassword, resetPassword}) => {
    const classes = useStyles();
    const { token } = useParams();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [feedback, setFeedback] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(token);
    }, [token]);

  const handleTokenRequest = () => {
      setLoading(true)
      if(email !== ''){
        forgotPassword(email).then((res) => {
          setFeedback(res);
          setEmail('');
          navigate('/login')
        }).catch(e => { setFeedback(e);  setLoading(false)});
      } else {
        setFeedback({ error: 'Email is required' });
        setLoading(false);
      }
    }

  const handlePasswordReset = () => {
      setLoading(true)
      if(password === ''){
        setFeedback({ error: 'Password is required' });
        setLoading(false);
      } else if (password !== confirmPassword) {
        setFeedback({ error: "Password do not match" })
        setLoading(false);
      } else {
        resetPassword(token, password).then((res) => {
          setFeedback(res);
          setPassword('');
          setConfirmPassword('');
          navigate('/login')
        }).catch(e => { setFeedback(e);  setLoading(false)} )
      }
  }

  return (
    <Box className={classes.overlay}>
      {!token ? (
        <Box sx={{display: 'flex', flexDirection: 'column', gap: '1rem', width: "340px", height: 'auto'}}>
          <Typography variant='h4' sx={{textAlign: 'center', fontSize: '1.5rem'}}>Enter your email to receive a password reset email</Typography>
          <TextField label="Enter your email" name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
          <Button color='primary' onClick={handleTokenRequest}>Send Email</Button>
        </Box>
      ) : (
          <Box sx={{display: 'flex', flexDirection: 'column', gap: '1rem', width: "340px", height: 'auto'}}>
            <Typography variant='h4' sx={{textAlign: 'center', fontSize: '1.5rem'}}>Enter and confirm your new password</Typography>
            <TextField label="New Password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <TextField label="Confirm Password" name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
            <Button color='primary' onClick={handlePasswordReset}>Save</Button>
          </Box>
      )}

      {feedback && <MessageBox data={feedback} onClose={() => setFeedback(null)} />}
      {loading && <Loading/>}
    </Box>
  );
};

PasswordReset.propTypes = {
  forgotPassword: PropTypes.func,
  resetPassword: PropTypes.func
}

const mapStateToProps = (state) => ({})


export default connect(mapStateToProps, {forgotPassword, resetPassword})(PasswordReset)