import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TemperatureChart = ({ hourlyData, isDarkMode }) => {
  const cardClasses = isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  
  return (
    <div className={`p-6 rounded-2xl border ${cardClasses} shadow-lg`}>
      <h3 className="text-xl font-bold mb-4">12-Hour Temperature Trend</h3>
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
            dataKey="temp" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ fill: '#3b82f6', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureChart;
