import React from 'react';

interface UpgradeComponentProps {
  perTap: (value: number) => void;
  perHour: (value: number) => void;
  taps: number;
  hours: number;
}

export const Upgrade: React.FC<UpgradeComponentProps> = ({ perTap, perHour, taps, hours}) => {
  return (
    <div className="upgrade">
      <h1>Cost { Math.floor(taps) }</h1>
      <button onClick={() => perTap(taps + 1)}>Buy per tap</button>
      <br />
      <h1>Cost { Math.floor(hours) }</h1>
      <button onClick={() => perHour(hours + 1)}>Buy per hour</button>
      
    </div>
  );
};
