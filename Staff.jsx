import React, { useState } from "react";
import "./Staff.css"; // CSS file for styling

const Staff = () => {
  const [staffList, setStaffList] = useState([]); // To store added staff
  const [name, setName] = useState(""); // Store name input
  const [work, setWork] = useState(""); // Store selected work role
  const [isFormValid, setIsFormValid] = useState(true); // To manage form validation

  // Handle form submission
  const handleAddStaff = (e) => {
    e.preventDefault();

    // Validate form inputs
    if (name && work) {
      const newStaff = { name, work };
      setStaffList([...staffList, newStaff]); // Add new staff to the list
      setName(""); // Clear the name input
      setWork(""); // Clear the work selection
      setIsFormValid(true); // Reset form validation status
    } else {
      setIsFormValid(false); // Set form invalid if fields are empty
    }
  };

  return (
    <div className="staff-container">
      <h1>Manage Staff</h1>

      {/* Staff Form */}
      <form className="staff-form" onSubmit={handleAddStaff}>
        <div className="form-row">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              placeholder="Enter staff name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Work:</label>
            <select
              value={work}
              onChange={(e) => setWork(e.target.value)}
              required
            >
              <option value="">Select work role</option>
              <option value="Manager">Manager</option>
              <option value="Cook">Cook</option>
              <option value="Helper">Helper</option>
              <option value="Cleaner">Cleaner</option>
              <option value="Waiter">Waiter</option>
            </select>
          </div>
        </div>

        <button type="submit" className="add-staff-btn">
          Add Staff
        </button>

        {!isFormValid && <p className="error-msg">Please fill out all fields.</p>}
      </form>

      {/* Display Staff List */}
      <div className="staff-list">
        {staffList.length > 0 ? (
          staffList.map((staff, index) => (
            <div key={index} className="staff-box">
              <p><strong>Name:</strong> {staff.name}</p>
              <p><strong>Work:</strong> {staff.work}</p>
            </div>
          ))
        ) : (
          <p>No staff added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Staff;
