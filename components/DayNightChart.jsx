// components/DayNightChart.jsx
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Sunrise, Sunset } from 'lucide-react';

const DayNightChart = ({ isDarkMode, sunriseTime, sunsetTime }) => {
  const cardClasses = isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';

  if (!sunriseTime || !sunsetTime) return null; // if data not ready

  // Convert sunrise/sunset from seconds to hours
  const sunriseDate = new Date(sunriseTime * 1000);
  const sunsetDate = new Date(sunsetTime * 1000);

  const dayHours = ((sunsetDate - sunriseDate) / 1000 / 3600).toFixed(1); // hours
  const nightHours = (24 - dayHours).toFixed(1);

  const dayNightData = [
    { name: 'Day', value: parseFloat(dayHours), fill: '#fbbf24' },
    { name: 'Night', value: parseFloat(nightHours), fill: '#1e40af' }
  ];

  return (
    <div className={`p-6 rounded-2xl border ${cardClasses} shadow-lg`}>
      <h3 className="text-xl font-bold mb-4">Day/Night Hours</h3>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={dayNightData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {dayNightData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => `${value} h`}
            contentStyle={{
              backgroundColor: isDarkMode ? '#1f2937' : 'white',
              border: 'none',
              borderRadius: '8px',
              color: isDarkMode ? 'white' : 'black'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          <Sunrise className="w-4 h-4 text-yellow-500" />
          <span className="text-sm">Day: {dayHours}h</span>
        </div>
        <div className="flex items-center gap-2">
          <Sunset className="w-4 h-4 text-blue-600" />
          <span className="text-sm">Night: {nightHours}h</span>
        </div>
      </div>
    </div>
  );
};

export default DayNightChart;
