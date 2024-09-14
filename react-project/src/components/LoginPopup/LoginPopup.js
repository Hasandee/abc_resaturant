import React, { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [userType, setUserType] = useState("customer");
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { username, userEmail, password, userType };

    if (currState === "Sign up") {
      try {
        const response = await fetch('/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        if (response.ok) {
          setCurrState("Login");
        } else {
          console.error('Signup failed');
        }
      } catch (error) {
        console.error('Error during signup:', error);
      }
    } else {
      // Handle login
      if (userType === "customer") {
        navigate('/customerdashboard');
      } else if (userType === "admin") {
        navigate('/admindashboard');
      } else if (userType === "staff") {
        navigate('/staffdashboard');
      }
    }
  };

  return (
    <div className='login-popup'>
      <form className='login-popup-container' onSubmit={handleSubmit}>
        <div className='login-popup-title'>
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="close" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign up" && (
            <>
              <input 
                type="text" 
                placeholder='Your Name' 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
              />
              <div className="user-type-selection">
                <label>
                  <input 
                    type="radio" 
                    name="userType" 
                    value="customer" 
                    checked={userType === "customer"} 
                    onChange={(e) => setUserType(e.target.value)} 
                  /> Customer
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="userType" 
                    value="staff" 
                    checked={userType === "staff"} 
                    onChange={(e) => setUserType(e.target.value)} 
                  /> Staff
                </label>
                <label>
                  <input 
                    type="radio" 
                    name="userType" 
                    value="admin" 
                    checked={userType === "admin"} 
                    onChange={(e) => setUserType(e.target.value)} 
                  /> Admin
                </label>
              </div>
            </>
          )}
          <input 
            type="email" 
            placeholder='Your Email' 
            value={userEmail} 
            onChange={(e) => setUserEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder='Your Password' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">
          {currState === "Sign up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>
        {currState === "Login"
          ? <p>Create new Account? <span onClick={() => setCurrState("Sign up")}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        }
      </form>
    </div>
  );
};

export default LoginPopup;
