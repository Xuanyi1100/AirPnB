import axiosInstance from "../../config";

import { useContext, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
    email:undefined
  });

  const location = useLocation();
  const conditionRender = location.state?.isLongin || "default";
  
  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClickLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axiosInstance.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const handleClickRegister = async (e) => {
    // e.preventDefault();
    // dispatch({ type: "LOGIN_START" });
    try {
      const res = await axiosInstance.post("/auth/register", credentials);
      // dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/login" ,{ state: { isLongin: "longin" } })
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    conditionRender==="longin"? 
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClickLogin} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
    : conditionRender==="register"?
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClickRegister} className="lButton">
          Register
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
    :
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClickLogin} className="lButton">
          Login
        </button>
        <button disabled={loading} onClick={handleClickRegister} className="lButton">
          Register
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
    
};

export default Login;
