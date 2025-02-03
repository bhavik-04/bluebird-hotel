import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css"; // Add any necessary CSS styling for payment

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { room } = location.state || {}; // Get the room details passed from RoomBook

  const handlePayment = () => {
    // Proceed with payment logic here
    // For now, we'll navigate to a confirmation page or dashboard
    alert(`Payment successful for ${room.name}. Thank you for your booking!`);
    navigate("/user"); // Redirect to user page after payment
  };

  return (
    <div className="payment-container">
      <h1>Booking Summary</h1>
      {room ? (
        <div className="payment-details">
          <h2>{room.name}</h2>
          <img src={room.image} alt={room.name} className="payment-room-image" />
          <p>Price: ${room.price}</p>
          <button className="pay-button" onClick={handlePayment}>
            Proceed to Payment
          </button>
        </div>
      ) : (
        <p>No room selected.</p>
      )}
    </div>
  );
};

export default Payment;
