import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import { useState, useEffect } from "react";
import { checkAuth } from './redux/actions';

function App({checkAuth, authenticated }) {
  
  useEffect(() => {
    checkAuth();
  },[checkAuth])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={authenticated ? <Navigate to={'/'}/> : <Login />} />
          <Route path="/Signup" element={authenticated ? <Navigate to={'/'}/> : <Signup />} />
          <Route path="/" element={ !authenticated ? <Navigate to={'/Login'}/> : <Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

App.propTypes = {
  authenticated: PropTypes.bool,
  checkAuth: PropTypes.func
}

const mapStateToProps = (state) => ({
  authenticated: state.authenticated

})

export default connect(mapStateToProps, {checkAuth})(App);