import React from 'react';
import { Gauge } from '@mui/x-charts/Gauge';

interface CardTypes {
  cardTitle: string;
  description: string;
  percentage: number;
}

export const Card = ({ cardTitle, description, percentage }: CardTypes) => {
  return (
    <div className="flex items-center p-6 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow gap-6">
      {/* Left Section: Title and Description */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{cardTitle}</h3>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      </div>

      {/* Right Section: Graph */}
      <div className="flex">
        <Gauge width={60} height={60} value={percentage}/>
      </div>
    </div>
  );
};
