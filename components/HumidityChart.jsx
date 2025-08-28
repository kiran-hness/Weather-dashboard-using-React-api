// components/HumidityChart.jsx
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Droplets } from 'lucide-react';

const HumidityChart = ({ hourlyData, isDarkMode }) => {
  const cardClasses = isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  
  return (
    <div className={`p-6 rounded-2xl border ${cardClasses} shadow-lg`}>
      <div className="flex items-center gap-2 mb-4">
        <Droplets className="w-5 h-5 text-blue-500" />
        <h3 className="text-xl font-bold">Humidity (%)</h3>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={hourlyData}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
          <XAxis dataKey="time" stroke={isDarkMode ? '#9ca3af' : '#6b7280'} />
          <YAxis stroke={isDarkMode ? '#9ca3af' : '#6b7280'} />
          <Tooltip 
            contentStyle={{
              backgroundColor: isDarkMode ? '#1f2937' : 'white',
              border: 'none',
              borderRadius: '8px',
              color: isDarkMode ? 'white' : 'black'
            }}
          />
          <Area
            type="monotone"
            dataKey="humidity"
            stroke="#3b82f6"
            fill={isDarkMode ? '#1e40af' : '#bfdbfe'}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HumidityChart;