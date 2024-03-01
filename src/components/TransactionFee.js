import React, { useState, useEffect } from 'react';
import './TransactionFee.css';
export default function TransactionFee() {
  const [feeData, setFeeData] = useState(null);

  useEffect(() => {
    fetch('https://mempool.space/api/v1/fees/recommended')
      .then(response => response.json())
      .then(data => setFeeData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="transaction-fee">
      <h2>Transaction Fees</h2>
      {feeData && (
        <div className="fee-details">
          <p><strong>No Priority:</strong> {feeData.minimumFee} sat/vB, ${feeData.minimumFee * 0.00000001 * 80}</p>
          <p><strong>Low Priority:</strong> {feeData.economyFee} sat/vB, ${feeData.economyFee * 0.00000001 * 80}</p>
          <p><strong>Medium Priority:</strong> {feeData.hourFee} sat/vB, ${feeData.hourFee * 0.00000001 * 80}</p>
          <p><strong>High Priority:</strong> {feeData.halfHourFee} sat/vB, ${feeData.halfHourFee * 0.00000001 * 80}</p>
        </div>
      )}
    </div>
  );
}
