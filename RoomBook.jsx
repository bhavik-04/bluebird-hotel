import React, { useState } from "react";
import "./RoomBook.css"; // CSS file for styling

const RoomBook = () => {
  const [selectedRoom, setSelectedRoom] = useState(null); // Track selected room for details
  const [showBookingForm, setShowBookingForm] = useState(false); // Track if booking form is shown
  const [bookingDetails, setBookingDetails] = useState(null); // Store booking details for payment
  const [checkinDate, setCheckinDate] = useState(""); // Store check-in date
  const [checkoutDate, setCheckoutDate] = useState(""); // Store check-out date
  const [nights, setNights] = useState(null); // Store calculated number of nights
  const [totalAmount, setTotalAmount] = useState(0); // Store calculated total amount

  const rooms = [
    { id: 1, name: "Single Room", image: "/images/single-room.jpeg", price: 500, description: "A cozy room for one person with all basic amenities." },
    { id: 2, name: "Double Room", image: "/images/double-room.jpeg", price: 800, description: "Perfect for two people, with a spacious bed and elegant decor." },
    { id: 3, name: "Economy Room", image: "/images/economy-room.jpeg", price: 400, description: "Affordable room with basic facilities for budget travelers." },
    { id: 4, name: "Deluxe Room", image: "/images/deluxe-room.jpeg", price: 1200, description: "A luxurious room with premium amenities and beautiful views." },
    { id: 5, name: "Suite Room", image: "/images/suite-room.jpeg", price: 2000, description: "An opulent suite with multiple rooms and exclusive services." },
  ];

  const handleDetail = (room) => {
    setSelectedRoom(room);
    setShowBookingForm(false); // Hide booking form if it's open
  };

  const handleBook = (room) => {
    setSelectedRoom(room);
    setShowBookingForm(true);
  };

  const handleClose = () => {
    setSelectedRoom(null);
    setShowBookingForm(false);
    setBookingDetails(null);
    setCheckinDate("");
    setCheckoutDate("");
    setNights(null); // Reset nights to null
    setTotalAmount(0); // Reset total amount
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;

    // Update checkin and checkout dates
    if (name === "checkin") {
      setCheckinDate(value);
    } else if (name === "checkout") {
      setCheckoutDate(value);
    }

    // Calculate the number of nights when both check-in and check-out dates are provided
    if (checkinDate && value) {
      const checkin = new Date(name === "checkin" ? value : checkinDate);
      const checkout = new Date(name === "checkout" ? value : checkoutDate);

      if (checkin < checkout) {
        const diffTime = checkout - checkin; // Difference in milliseconds
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert to days
        setNights(diffDays);

        // Calculate the total amount by multiplying nights with room price
        if (selectedRoom) {
          setTotalAmount(selectedRoom.price * diffDays);
        }
      } else {
        setNights(null); // Reset to null if dates are invalid
        setTotalAmount(0); // Reset total amount if dates are invalid
      }
    }
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");

    // Save booking details for payment
    setBookingDetails({
      name,
      email,
      checkin: checkinDate,
      checkout: checkoutDate,
      room: selectedRoom.name,
      totalAmount,
    });
    setShowBookingForm(false); // Hide the form after submission
  };

  return (
    <div className="room-book-container">
      <h1 className="title">Available Rooms</h1>
      <div className="room-grid">
        {rooms.map((room) => (
          <div key={room.id} className="room-card">
            <img src={room.image} alt={room.name} className="room-image" />
            <h2 className="room-name">{room.name}</h2>
            <div className="room-actions">
              <button className="detail-button" onClick={() => handleDetail(room)}>Detail</button>
              <button className="book-button" onClick={() => handleBook(room)}>Book</button>
            </div>
          </div>
        ))}
      </div>

      {/* Room Detail Modal */}
      {selectedRoom && !showBookingForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedRoom.name}</h2>
            <img src={selectedRoom.image} alt={selectedRoom.name} className="modal-image" />
            <p>{selectedRoom.description}</p>
            <p>Price: {selectedRoom.price} / night</p>
            <button onClick={handleClose} className="close-button">Close</button>
          </div>
        </div>
      )}

      {/* Room Booking Form */}
      {selectedRoom && showBookingForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>Book {selectedRoom.name}</h2>
            <form className="booking-form" onSubmit={handleBookingSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Your email" required />
              </div>
              <div className="form-group">
                <label htmlFor="checkin">Check-In Date:</label>
                <input
                  type="date"
                  id="checkin"
                  name="checkin"
                  value={checkinDate}
                  onChange={handleDateChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="checkout">Check-Out Date:</label>
                <input
                  type="date"
                  id="checkout"
                  name="checkout"
                  value={checkoutDate}
                  onChange={handleDateChange}
                  required
                />
              </div>
              {/* Only display Number of Nights if nights is valid */}
              {nights !== null && (
                <div className="form-group">
                  <p>Number of Nights: {nights}</p>
                </div>
              )}
              <div className="form-group">
                <p>Total Amount: {totalAmount}</p> {/* Display calculated total amount */}
              </div>
              <button type="submit" className="submit-button">Proceed to Payment</button>
              <button onClick={handleClose} type="button" className="close-button">Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* Payment Page */}
      {bookingDetails && !showBookingForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>Payment Details</h2>
            <p>Name: {bookingDetails.name}</p>
            <p>Room: {bookingDetails.room}</p>
            <p>Check-In Date: {bookingDetails.checkin}</p>
            <p>Check-Out Date: {bookingDetails.checkout}</p>
            <p>Total Amount: {bookingDetails.totalAmount}</p>
            <button className="payment-button" onClick={handleClose}>Pay Now</button>
            <button onClick={handleClose} className="close-button">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomBook;
