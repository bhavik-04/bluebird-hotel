import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"; // For navigation and nested routes
import "./AdminPanel.css"; // Importing CSS for styling

const AdminPanel = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleMenuClick = (menu) => {
    navigate(menu); // Navigate to the selected menu (using the route path)
  };

  return (
    <div className="admin-panel">
      {/* Sidebar Menu */}
      <div className="sidebar">
        <h2 className="sidebar-heading">Admin Panel</h2>
        <ul className="menu-list">
          <li
            className="menu-item"
            onClick={() => handleMenuClick("/admin/dashboard")}
          >
            <img src="/images/dashboard.png" alt="Dashboard" className="menu-icon" />
            DASHBOARD
          </li>
          <li
            className="menu-item"
            onClick={() => handleMenuClick("/admin/room-booking")}
          >
            <img src="/images/bedroom.png" alt="Room Booking" className="menu-icon" />
            ROOM BOOKING
          </li>
          <li
            className="menu-item"
            onClick={() => handleMenuClick("/admin/add-room")}
          >
            <img src="/images/bed.png" alt="Add Room" className="menu-icon" />
            ADD ROOM
          </li>
          <li
            className="menu-item"
            onClick={() => handleMenuClick("/admin/payment")}
          >
            <img src="/images/wallet.png" alt="Payment" className="menu-icon" />
            PAYMENT
          </li>
          <li
            className="menu-item"
            onClick={() => handleMenuClick("/admin/staff")}
          >
            <img src="/images/staff.png" alt="Staff" className="menu-icon" />
            STAFF
          </li>
          <li
            className="menu-item"
            onClick={() => handleMenuClick("/admin/change-password")}
          >
            <img src="/images/changepassword.jpeg" alt="Change Password" className="menu-icon" />
            CHANGE PASSWORD
          </li>
          <li
            className="menu-item"
            onClick={() => handleMenuClick("/")}
          >
            <img src="/images/logout.png" alt="Logout" className="menu-icon" />
            LOGOUT
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        <h1>Welcome, Admin!</h1>

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

        {/* Dynamic Content Rendering (based on route change) */}
        <div className="content">
          <Outlet /> {/* Render the specific content for each menu item */}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
