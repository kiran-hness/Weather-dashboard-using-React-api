
// components/WindChart.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Wind } from 'lucide-react';

const WindChart = ({ hourlyData, isDarkMode, units }) => {
  const cardClasses = isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const windUnit = units === 'imperial' ? 'mph' : 'km/h';
  
  return (
    <div className={`p-6 rounded-2xl border ${cardClasses} shadow-lg`}>
      <div className="flex items-center gap-2 mb-4">
        <Wind className="w-5 h-5 text-green-500" />
        <h3 className="text-xl font-bold">Wind Speed ({windUnit})</h3>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={hourlyData}>
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
          <Line 
            type="monotone" 
            dataKey="wind_speed" 
            stroke="#10b981" 
            strokeWidth={3}
            dot={{ fill: '#10b981', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WindChart;