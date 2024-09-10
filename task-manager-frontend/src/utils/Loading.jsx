import React from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

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

const Loading = () => {
  const classes = useStyles();

  return (
    <Box className={classes.overlay}>
      <Box textAlign="center">
        <Box className={classes.loadingBars}>
          <div></div>
          <div></div>
          <div></div>
        </Box>
      </Box>
    </Box>
  );
};

export default Loading;

