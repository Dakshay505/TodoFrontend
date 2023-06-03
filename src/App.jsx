import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import "./styles/app.scss";
import { Toaster } from "react-hot-toast";
import { Context ,server} from "./main";
import axios from "axios";

const App = () => {
  const { setUser, setIsAuthenticated, setLoading } = useContext(Context);

  useEffect(() => {
    console.log("heyy"); 
    setLoading(true);
    axios
      .get(`${server}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res)
        setUser(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((error) => {
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/edit" element={<Profile />} /> */}
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
