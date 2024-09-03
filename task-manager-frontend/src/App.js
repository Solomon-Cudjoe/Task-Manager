import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import axios from 'axios';
import "./App.css";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const handleLogin = async (credentials) => {
    await axios
      .post("http://localhost:5001/auth/login", credentials, {
        withCredentials: true
      })
      .then((response) => {
        if (response.data.error) {
          return Promise.reject(response.data.error);
        } else {
          setAuthenticated(true);
          setUser(response.data.user);
          alert(response.data.message);
          return Promise.resolve(response.data);
        }
      })
      .catch((err) => {
        return Promise.reject(err.response.data.error);
      });
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER}/auth/authenticate`, {
          withCredentials: true
        });
        setUser(res.data.user);
        setAuthenticated(true);
      } catch (err) {
        setUser(null);
      }
    };
    checkAuth();
  },[])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={authenticated ? <Navigate to={'/'}/> : <Login handleLogin={handleLogin} />} />
          <Route path="/Signup" element={authenticated ? <Navigate to={'/'}/> : <Signup />} />
          <Route path="/" element={ !authenticated ? <Navigate to={'/Login'}/> : <Home user={user}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
