import React, { useState } from "react";
import "./ReviewForm.css"; // CSS for styling

const ReviewForm = () => {
  const [ratings, setRatings] = useState(Array(5).fill(0)); // Initialize ratings for 5 questions
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    "How was the cleanliness of the room?",
    "How was the behavior of the staff?",
    "How was the quality of the food?",
    "How was the overall comfort of the stay?",
    "Would you recommend us to others?",
  ];

  const handleRating = (questionIndex, rating) => {
    const updatedRatings = [...ratings];
    updatedRatings[questionIndex] = rating;
    setRatings(updatedRatings);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Ratings:", ratings);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="review-container">
        <h1 className="thank-you">Thank you for your feedback!</h1>
      </div>
    );
  }

  return (
    <div className="review-container">
      <h1 className="review-title">We value your feedback!</h1>
      <form onSubmit={handleSubmit} className="review-form">
        {questions.map((question, index) => (
          <div key={index} className="question-group">
            <p className="question">{question}</p>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${ratings[index] >= star ? "filled" : ""}`}
                  onClick={() => handleRating(index, star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        ))}
        <button type="submit" className="submit-button">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
