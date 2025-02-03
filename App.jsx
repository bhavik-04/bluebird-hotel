import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing components for User Panel
import UserPage from "./UserPage"; // Main User Panel layout
import RoomBook from "./RoomBook"; // Room Book Component
import UserProfile from "./UserProfile"; // User Profile Component
import ViewBooking from "./ViewBooking"; // View Booking Component
import Review from "./Review"; // Review Component
import ChangePasswordUser from "./ChangePassword"; // Change Password Component for User
import LoginWindow from "./LoginWindow"; // Login Page

// Importing components for Admin Panel
import AdminPanel from "./AdminPanel"; // Admin Panel Layout
import Dashboard from "./Dashboard"; // Dashboard Component
import RoomBooking from "./RoomBooking"; // Room Booking Component
import AddRoom from "./AddRoom"; // Add Room Component
import Payment from "./Payment"; // Payment Component
import ChangePasswordAdmin from "./ChangePassword"; // Change Password Component for Admin
import Staff from "./Staff"; // Staff Component

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/" element={<LoginWindow />} />

        {/* User Panel Routes */}
        <Route path="/user" element={<UserPage />}>
          <Route path="room-book" element={<RoomBook />} />
          <Route path="user-profile" element={<UserProfile />} />
          <Route path="view-booking" element={<ViewBooking />} />
          <Route path="review" element={<Review />} />
          <Route path="change-password" element={<ChangePasswordUser />} />
        </Route>

        {/* Admin Panel Routes */}
        <Route path="/admin" element={<AdminPanel />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="roomBooking" element={<RoomBooking />} />
          <Route path="add-room" element={<AddRoom />} />
          <Route path="payment" element={<Payment />} />
          <Route path="Staff" element={<Staff />} />
          <Route path="change-password" element={<ChangePasswordAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
