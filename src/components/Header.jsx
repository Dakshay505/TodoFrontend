import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context, server } from "../main";
import axios from "axios";
import { toast } from "react-hot-toast";
const Header = () => {
  const { isAuthenticated,setIsAuthenticated,setLoading } = useContext(Context);
  const logoutHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await axios.get(
        `${server}/users/logout`,
        {
          withCredentials: true,
        }
      );
      toast.success("Logout Successfully");
      setLoading(false);
      setIsAuthenticated(false);
    } catch (error) {
      setLoading(false);
      setIsAuthenticated(true);
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
 
  return (
    <nav className="header">
      <div>
        <h2>Cryptic_505</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        {isAuthenticated ? (
          <Link to={"/logout"} onClick={logoutHandler}>Logout</Link>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </article>
    </nav>
  );
};

export default Header;
