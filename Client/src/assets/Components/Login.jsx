import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import userIcon from "../Icons/userIcon.svg";
import emailIcon from "../Icons/emailIcon.svg";
import passwordIcon from "../Icons/passwordIcon.svg";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for react-toastify

toast('🦄 Login Successful !',{
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
});



const Login = () => {
  const [action, setAction] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (response.ok) {
        setAction("Log In");
      } else {
        // Handle signup failure
        console.error("Signup failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        // Redirect to dashboard or profile page on successful login
        navigate("/home");
        <ToastContainer />;
      } else {
        // Handle login failure
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  

  return (
    <div className="main">
      <div className="container">
        <div className="header">
          {action}
          <div className="underline"></div>
        </div>

        <form>
          <div className="inputs">
            {action === "Log In" ? (
              <div></div>
            ) : (
              <div className="input name">
                <img src={userIcon} alt="" />
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div className="input mail">
              <img src={emailIcon} alt="" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input password">
              <img src={passwordIcon} alt="" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </form>

        {action === "Sign Up" ? (
          <div></div>
        ) : (
          <div className="forgotPassword">
            Forgot Password? <span>Click Me!</span>
          </div>
        )}
        <div className="buttons">
          <div className="signup button" onClick={handleSignup}>
            Sign Up
          </div>
          <div className="logIn button" onClick={handleLogin} >
            Log In
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
