import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginWindow.css"; // Importing the CSS file

const LoginWindow = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [currentBgIndex, setCurrentBgIndex] = useState(0); // Track the current background index
  const [showCreateAccount, setShowCreateAccount] = useState(false); // Toggle account creation form
  const [newAccountData, setNewAccountData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const bgImages = [
    "/images/bg1.jpeg", // Path to the first background image
    "/images/bg2.jpeg", // Path to the second background image
    "/images/bg3.jpeg", // Path to the third background image
  ];

  // Automatically change the background image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    }, 3000); // 3000ms = 3 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [bgImages.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNewAccountChange = (e) => {
    const { name, value } = e.target;
    setNewAccountData({ ...newAccountData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = formData;

    if (username === "bhavik" && password === "123456") {
      navigate("/user");
    } else if (username === "admin" && password === "1234") {
      navigate("/admin");
    } else {
      setMessage("Invalid username or password.");
    }
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    console.log("Account Created:", newAccountData);
    alert("Account created successfully!");
    setShowCreateAccount(false); // Close account creation form
  };

  return (
    <div
      className="container"
      style={{
        backgroundImage: `url(${bgImages[currentBgIndex]})`, // Set dynamic background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out", // Smooth transition
      }}
    >
      <h1 className="hotel-name">Bluebird Hotel</h1>
      <div className="login-box">
        {!showCreateAccount ? (
          <>
            <h2 className="heading">User Login</h2>
            <form onSubmit={handleSubmit} className="form">
              <div className="input-group">
                <label htmlFor="username" className="label">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="input"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="password" className="label">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button type="submit" className="button">Login</button>
            </form>
            <a href="/forgot-password" className="link">Forgot Password?</a>
            <button onClick={() => navigate("/google-login")} className="google-button">
              Login with Google
            </button>
            <button
              onClick={() => setShowCreateAccount(true)} // Show the account creation form
              className="create-account-button"
            >
              Create Account
            </button>
            {message && <p className="message">{message}</p>}
          </>
        ) : (
          <>
            <h2 className="heading">Create Account</h2>
            <form onSubmit={handleCreateAccount} className="form">
              <div className="input-group">
                <label htmlFor="new-username" className="label">Username:</label>
                <input
                  type="text"
                  id="new-username"
                  name="username"
                  value={newAccountData.username}
                  onChange={handleNewAccountChange}
                  className="input"
                  placeholder="Enter new username"
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="new-password" className="label">Password:</label>
                <input
                  type="password"
                  id="new-password"
                  name="password"
                  value={newAccountData.password}
                  onChange={handleNewAccountChange}
                  className="input"
                  placeholder="Enter new password"
                  required
                />
              </div>
              <button type="submit" className="button">Create Account</button>
            </form>
            <button
              onClick={() => setShowCreateAccount(false)} // Go back to login form
              className="back-button"
            >
              Back to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginWindow;
