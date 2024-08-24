import React, { useState } from 'react';
import styles from "./ServicemenShowCard.module.css";

const ReviewsModal = ({ onClose, name }) => {
  const [sentimentResult, setSentimentResult] = useState(null);

  const checkSentiment = async () => {
    try {
      const response = await fetch('http://localhost:3001/analyze-sentiment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: 'He Provides the worst service' }), // Pass the text you want to analyze
      });

      const data = await response.json();
      setSentimentResult(data.sentiment);
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.name}>
        <h1>{name}</h1>
      </div>
      <div className={styles.modalContent}>
        <h3>1. He Provides the worst service</h3>
        <h3>2. He did really bad work. All my problems are now more problems.</h3>
        <a href='#' onClick={checkSentiment}>Check Sentiment</a>
        {sentimentResult && (
          <p>Sentiment: {sentimentResult > 0 ? 'Positive' : 'Negative'}</p>
        )}
        <button className={styles.bookBtn} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ReviewsModal;
