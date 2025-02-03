import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"; // Import Outlet for nested routes
import "./UserPage.css"; // Importing CSS for styling

const UserPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("userProfile")) || {
      photo: "https://via.placeholder.com/50", // Placeholder image
      name: "Bhavik Santhaliya",
    }
  );
  const navigate = useNavigate(); // Hook for navigation

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleMenuClick = (menu) => {
    navigate(menu); // Navigate to the selected menu (using the route path)
  };

  useEffect(() => {
    // Save profile to localStorage whenever it changes
    localStorage.setItem("userProfile", JSON.stringify(profile));
  }, [profile]);

  return (
    <div className="user-panel">
      {/* Sidebar Menu */}
      <div className="sidebar">
        <h2 className="sidebar-heading">User Panel</h2>
        <ul className="menu-list">
          <li
            className="menu-item"
            onClick={() => handleMenuClick("/user/room-book")}
          >
            Room Book
          </li>
          <li
            className="menu-item"
            onClick={() => handleMenuClick("/user/user-profile")}
          >
            User Profile
          </li>
          <li
            className="menu-item"
            onClick={() => handleMenuClick("/user/view-booking")}
          >
            View Booking
          </li>
          <li
            className="menu-item"
            onClick={() => handleMenuClick("/user/review")}
          >
            Review
          </li>
          <li
            className="menu-item"
            onClick={() => handleMenuClick("/user/change-password")}
          >
            Change Password
          </li>
          <li
            className="menu-item"
            onClick={() => handleMenuClick("/")}
          >
            Logout
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        <h1>Welcome, {profile.name}!</h1>

        {/* Search Box */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        {/* Profile Picture */}
        <div className="profile-picture">
          <img
            src={profile.photo} // Displaying dynamic profile photo
            alt="Profile"
            className="profile-img"
          />
        </div>

        {/* Dynamic Content Rendering (based on route change) */}
        <div className="content">
          <Outlet /> {/* Render the specific content for each menu item */}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
