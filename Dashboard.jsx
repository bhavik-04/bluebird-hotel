import React, { useState, useEffect } from "react";
import "./Dashboard.css"; // CSS file for styling

const Dashboard = () => {
  const [data, setData] = useState({
    totalRooms: 0,
    bookedRooms: 0,
    totalPayment: 0,
  });

  // Mock API call to fetch dashboard data
  useEffect(() => {
    // Simulate fetching data from the backend
    const fetchData = async () => {
      // Replace with your API call
      const response = {
        totalRooms: 20,
        bookedRooms: 12,
        totalPayment: 50000,
      };
      setData(response);
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <div className="dashboard-grid">
        {/* Total Rooms Box */}
        <div className="dashboard-box">
          <h2>Total Rooms</h2>
          <p className="dashboard-number">{data.totalRooms}</p>
        </div>

        {/* Booked Rooms Box */}
        <div className="dashboard-box">
          <h2>Booked Rooms</h2>
          <p className="dashboard-number">{data.bookedRooms}</p>
        </div>

        {/* Total Payment Box */}
        <div className="dashboard-box">
          <h2>Total Payment</h2>
          <p className="dashboard-number">{data.totalPayment}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
