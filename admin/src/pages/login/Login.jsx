import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../config";

// import { AuthContext } from "../../context/AuthContext";
import "./login.scss";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axiosInstance.post("/auth/login", credentials);
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

        navigate("/admin");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
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
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;




// import axios from "axios";
// import { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
// import "./login.scss";

// // 星空背景组件
// const StarryBackground = () => {
//   useEffect(() => {
//     const canvas = document.getElementById('canvas');
//     if(!canvas) {
//       return;
//     }

//     const ctx = canvas.getContext('2d');
//     const w = canvas.width = window.innerWidth;
//     const h = canvas.height = window.innerHeight;
//     const hue = 217;
//     const stars = [];
//     let count = 0;
//     const maxStars = 1200; //星星数量
//     const canvas2 = document.createElement('canvas');
//     let ctx2 = canvas2.getContext('2d');
//     canvas2.width = 100;
//     canvas2.height = 100;
//     const half = canvas2.width / 2;
//     const gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
//     gradient2.addColorStop(0.025, '#fff');
//     gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
//     gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
//     gradient2.addColorStop(1, 'transparent');

//     ctx2.fillStyle = gradient2;
//     ctx2.beginPath();
//     ctx2.arc(half, half, half, 0, Math.PI * 2);
//     ctx2.fill();

//     // End cache

//     function random(min, max) {
//       if (arguments.length < 2) {
//         max = min;
//         min = 0;
//       }

//       return Math.random() * (max - min) + min;
//     }

//     function maxOrbit(x, y) {
//       const max = Math.max(x, y);
//       const diameter = Math.round(Math.sqrt(max * max + max * max));
//       return diameter / 2;
//     }

//     const Star = function() {
//       this.orbitRadius = random(maxOrbit(w, h));
//       this.radius = random(60, this.orbitRadius) / 8;
//       this.orbitX = w / 2;
//       this.orbitY = h / 2;
//       this.timePassed = random(0, maxStars);
//       this.speed = random(0.01, 0.03);
//       this.alpha = random(0.8, 2.0);

//       count++;
//       stars[count] = this;
//     }

//     Star.prototype.draw = function() {
//       const x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
//           y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
//           twinkle = random(0, 10);

//       if (twinkle === 1 && this.alpha > 0) {
//         this.alpha -= 0.05;
//       } else if (twinkle === 2 && this.alpha < 1) {
//         this.alpha += 0.05;
//       }

//       ctx.globalAlpha = this.alpha;
//       ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
//       this.timePassed += this.speed;
//     }

//     for (let i = 0; i < maxStars; i++) {
//       new Star();
//     }

//     function animation() {
//       ctx.globalCompositeOperation = 'source-over';
//       ctx.globalAlpha = 0.5; //尾巴
//       ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)';
//       ctx.fillRect(0, 0, w, h)
//       ctx.globalCompositeOperation = 'lighter';
//       for (let i = 1, l = stars.length; i < l; i++) {
//         stars[i].draw();
//       };
//       window.requestAnimationFrame(animation);
//     }

//     animation();
//   }, []);

//   return <canvas id="canvas"></canvas>;
// };


// const Login = () => {
//   const [credentials, setCredentials] = useState({
//     username: undefined,
//     password: undefined,
//   });

//   const { loading, error, dispatch } = useContext(AuthContext);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
//   };

//   const handleClick = async (e) => {
//     e.preventDefault();
//     dispatch({ type: "LOGIN_START" });
//     try {
//       const res = await axios.post("/auth/login", credentials);
//       if (res.data.isAdmin) {
//         dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

//         navigate("/");
//       } else {
//         dispatch({
//           type: "LOGIN_FAILURE",
//           payload: { message: "You are not allowed!" },
//         });
//       }
//     } catch (err) {
//       dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
//     }
//   };

//   return (
//     <>
//       <StarryBackground />
//       <div className="login">
//         <div className="lContainer">
//           <input
//             type="text"
//             placeholder="username"
//             id="username"
//             onChange={handleChange}
//             className="lInput"
//           />
//           <input
//             type="password"
//             placeholder="password"
//             id="password"
//             onChange={handleChange}
//             className="lInput"
//           />
//           <button disabled={loading} onClick={handleClick} className="lButton">
//             Login
//           </button>
//           {error && <span>{error.message}</span>}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

