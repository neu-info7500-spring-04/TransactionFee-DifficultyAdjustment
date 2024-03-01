import React, { useState, useEffect } from 'react';
import './DifficultyAdjustment.css';
export default function DifficultyAdjustment() {
  const [difficultyData, setDifficultyData] = useState(null);

  useEffect(() => {
    fetch('https://mempool.space/api/v1/difficulty-adjustment')
      .then(response => response.json())
      .then(data => setDifficultyData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Function to convert seconds to human-readable time format
  const secondsToTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    const remainingMinutes = minutes % 60;
    return `${days} days, ${remainingHours} hours, ${remainingMinutes} minutes`;
  };

  return (
    <div className="difficulty-adjustment">
      <h2>Difficulty Adjustment</h2>
      {difficultyData && (
        <div className="difficulty-details">
          <p>Estimated next difficulty adjustment in: {secondsToTime(difficultyData.remainingTime)}</p>
          <p>Average block time: {difficultyData.timeAvg} seconds</p>
          <p>Change in difficulty: {difficultyData.difficultyChange}%</p>
          <p>Previous difficulty change: {difficultyData.previousRetarget}%</p>
          <p>Next difficulty retarget height: {difficultyData.nextRetargetHeight}</p>
          <p>Expected difficulty adjustment date: {new Date(difficultyData.estimatedRetargetDate).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
