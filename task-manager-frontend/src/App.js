import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import "./App.css";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const handleLogin = async (credentials) => {
    await axios
      .post("http://localhost:5001/auth/login", credentials, {
        withCredentials: true
      })
      .then((response) => {
        if (response.data.error) {
          return Promise.reject(response.data.error);
        } else {
          setUser(response.data.user);
          alert(response.data.message);
          return Promise.resolve(response.data);
        }
      })
      .catch((err) => {
        return Promise.reject(err.response.data.error);
      });
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/" element={<Home user={user}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
