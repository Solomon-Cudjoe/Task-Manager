import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { verifyUser } from '../redux/actions';
import MessageBox from './MessageBox';

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
    backdropFilter: 'blur(30px)',
    zIndex: 9999,
  },
  loadingBars: {
    display: 'flex',
    gap: '4px',
    '& div': {
      width: '8px',
      height: '24px',
      backgroundColor: '#f1f',
      animation: '$bounce 1.2s infinite ease-in-out',
    },
    '& div:nth-of-type(1)': {
      animationDelay: '-1.1s',
    },
    '& div:nth-of-type(2)': {
      animationDelay: '-1.0s',
    },
    '& div:nth-of-type(3)': {
      animationDelay: '-0.9s',
    },
  },
  '@keyframes bounce': {
    '0%, 80%, 100%': {
      transform: 'scaleY(1)',
    },
    '40%': {
      transform: 'scaleY(1.5)',
    },
  },
});

const Verify = ({verifyUser}) => {
  const classes = useStyles();
  const { token } = useParams();
  const effectRef = useRef(false);
  const [feedback, setFeedback] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (effectRef.current === false) {
      if (token) {
        verifyUser(token).then((res) => {
          setFeedback(res);
          setTimeout(() => {
            navigate('/')
          }, 2000)
        }).catch((e) => {
          setFeedback(e);
          setTimeout(() => {
            navigate('/')
          }, 2000)
        })

        effectRef.current = true;
      }
    }
    
  },[token, verifyUser, navigate])

  return (
    <Box className={classes.overlay}>
      {feedback && <MessageBox data={feedback} onClose={() => setFeedback(null)}/> }
      <Box textAlign="center" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Box className={classes.loadingBars}>
          <div></div>
          <div></div>
          <div></div>
        </Box>
      </Box>
    </Box>
  );
};

Verify.propTypes = {
  verifyUser: PropTypes.func
}

const mapStateToProps = (state) => ({

})


export default connect(mapStateToProps, {verifyUser})(Verify)
