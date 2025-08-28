import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RainChart = ({ hourlyData, isDarkMode }) => {
  const cardClasses = isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  
  return (
    <div className={`p-6 rounded-2xl border ${cardClasses} shadow-lg`}>
      <h3 className="text-xl font-bold mb-4">Rain Probability (%)</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={hourlyData}>
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
          <Bar dataKey="rain" fill="#06b6d4" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RainChart;
