  import React, { useState, useEffect } from "react";
  import "./UserProfile.css"; // Importing CSS for styling

  const UserProfile = () => {
    // Initial profile data
    const initialProfile = {
      photo: "https://via.placeholder.com/150", // Placeholder image URL
      name: "Bhavik Santhaliya",
      mobile: "123-456-7890",
      email: "bhavik@example.com",
      address: "123, Street Name, City, Country",
    };

    // Retrieve saved profile data from localStorage or use initial data
    const savedProfile = JSON.parse(localStorage.getItem("userProfile")) || initialProfile;

    const [profile, setProfile] = useState(savedProfile);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(savedProfile);

    // Save profile to localStorage whenever it changes
    useEffect(() => {
      localStorage.setItem("userProfile", JSON.stringify(profile));
    }, [profile]);

    // Handle form data change
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      setProfile(formData); // Save updated data to profile state
      setIsEditing(false); // Exit edit mode
    };

    // Handle photo change
    const handlePhotoChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setFormData({ ...formData, photo: reader.result }); // Update photo in form data
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <div className="user-profile">
        <h2>User Profile</h2>
        <div className="profile-info">
          <img src={profile.photo} alt="User" className="profile-photo" />
          <div className="profile-details">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Mobile:</strong> {profile.mobile}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Address:</strong> {profile.address}</p>
          </div>
        </div>

        {/* Edit Profile Button */}
        <button className="edit-btn" onClick={() => setIsEditing(true)}>
          Edit Profile
        </button>

        {/* Edit Profile Form (Shown only when isEditing is true) */}
        {isEditing && (
          <div className="edit-profile-form">
            <h3>Edit Profile</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Change Photo:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
                {formData.photo && (
                  <div className="preview">
                    <img src={formData.photo} alt="Preview" className="preview-photo" />
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Mobile:</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Address:</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="save-btn">Save Changes</button>
            </form>
          </div>
        )}
      </div>
    );
  };

  export default UserProfile;
