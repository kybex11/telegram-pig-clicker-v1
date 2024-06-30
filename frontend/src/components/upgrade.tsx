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
      <h1>Upgrade Options</h1>
      <button onClick={() => perTap(taps + 1)}>Buy per tap { Math.floor(taps) }</button>
      <button onClick={() => perHour(hours + 1)}>Buy per hour { Math.floor(hours) }</button>
    </div>
  );
};
