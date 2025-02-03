import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css"; // Import the CSS for styling

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirmation do not match.");
    } else if (currentPassword === "" || newPassword === "") {
      setMessage("All fields are required.");
    } else {
      // For now, just display a success message
      setMessage("Password changed successfully!");
      setTimeout(() => {
        // Optionally redirect to the login page after successful password change
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <div className="change-password-container">
      <h1 className="change-password-heading">Change Password</h1>
      <form onSubmit={handleSubmit} className="change-password-form">
        <div className="input-group">
          <label htmlFor="currentPassword" className="label">
            Current Password:
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="input"
            placeholder="Enter your current password"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="newPassword" className="label">
            New Password:
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="input"
            placeholder="Enter your new password"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword" className="label">
            Confirm New Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="input"
            placeholder="Confirm your new password"
            required
          />
        </div>
        <button type="submit" className="button">
          Change Password
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ChangePassword;
