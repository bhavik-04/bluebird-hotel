import React, { useState } from "react";
import "./AddRoom.css"; // Importing CSS for styling

const AddRoom = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    roomType: "",
    rent: "",
    details: "",
    image: null,
  });
  const [rooms, setRooms] = useState([]);
  const [preview, setPreview] = useState(null);

  const roomTypes = [
    "Single Room",
    "Double Room",
    "Deluxe Room",
    "Suite",
    "Economy Room",
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.roomType || !formData.rent || !formData.details || !formData.image) {
      alert("Please fill in all fields!");
      return;
    }

    // Save the room details
    const newRoom = {
      ...formData,
      imagePreview: preview, // Save the preview for display
    };
    setRooms([...rooms, newRoom]);

    // Reset the form
    setFormData({ roomType: "", rent: "", details: "", image: null });
    setPreview(null);
    setFormVisible(false); // Hide the form after adding
  };

  return (
    <div className="add-room-container">
      <h1 className="add-room-title">Admin Panel - Add Room</h1>

      {/* Add Room Button */}
      {!formVisible && (
        <button
          className="add-room-button"
          onClick={() => setFormVisible(true)}
        >
          Add Room
        </button>
      )}

      {/* Room Form */}
      {formVisible && (
        <form onSubmit={handleSubmit} className="add-room-form">
          <div className="form-group">
            <label htmlFor="roomType">Room Type:</label>
            <select
              id="roomType"
              name="roomType"
              value={formData.roomType}
              onChange={handleChange}
              required
            >
              <option value="">Select a Room Type</option>
              {roomTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="rent">Rent (per night):</label>
            <input
              type="number"
              id="rent"
              name="rent"
              value={formData.rent}
              onChange={handleChange}
              placeholder="Enter room rent"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="details">Details:</label>
            <textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder="Enter room details"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="image">Upload Room Image:</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>

          {preview && (
            <div className="preview-container">
              <h2>Preview</h2>
              <img
                src={preview}
                alt="Room Preview"
                className="preview-image"
              />
              <p><strong>Room Type:</strong> {formData.roomType}</p>
              <p><strong>Rent:</strong> ${formData.rent}</p>
              <p><strong>Details:</strong> {formData.details}</p>
            </div>
          )}

          <button type="submit" className="submit-button">Save Room</button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => setFormVisible(false)}
          >
            Cancel
          </button>
        </form>
      )}

      {/* Display Added Rooms */}
      <div className="room-list">
        <h2 className="room-list-title">Added Rooms</h2>
        {rooms.length === 0 ? (
          <p>No rooms added yet.</p>
        ) : (
          <div className="rooms-container">
            {rooms.map((room, index) => (
              <div key={index} className="room-card">
                <img
                  src={room.imagePreview}
                  alt={`${room.roomType} Image`}
                  className="room-image"
                />
                <h3>{room.roomType}</h3>
                <p><strong>Rent:</strong> ${room.rent}</p>
                <p><strong>Details:</strong> {room.details}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddRoom;
