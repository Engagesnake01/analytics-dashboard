import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const StatCard = ({ title, value, change, icon: Icon, color }) => (
  <div className="stat-card">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="text-white" size={24} />
      </div>
      <div className={`flex items-center text-sm font-medium ${
        parseFloat(change) >= 0 ? 'text-green-600' : 'text-red-600'
      }`}>
        {parseFloat(change) >= 0 ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
        {Math.abs(change)}%
      </div>
    </div>
    <div>
      <p className="text-gray-600 text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

export default StatCard;