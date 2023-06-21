import "./navbar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext,useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user,dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLongin,setIslongin]=useState("isLongin")

  const handleClickLogin = () => {
    navigate("/login", { state: { isLongin: "longin" } });
    };

  const handleClickRegister = () => {
      navigate("/login", { state: { isLongin: "register" } });
      };
  

  const handleClickLogout=()=>{
    dispatch({ type: "LOGOUT" })
  };
 

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">AirPnB</span>
        </Link>
        {user ? 
        <div className="navItems">
          {user.username} 
          <button className="navButton" onClick={handleClickLogout}>Logout</button>
        </div>
        : 
          <div className="navItems">
            <button className="navButton" onClick={handleClickRegister} >Register</button>
            <button className="navButton" onClick={handleClickLogin}>Login</button>
          </div>
        }
      </div>
    </div>
  );
};

export default Navbar;
