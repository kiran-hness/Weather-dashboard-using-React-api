const WeeklyForecast = ({ dailyData, isDarkMode, getWeatherIcon, formatDate }) => {
  const cardClasses = isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';

  if (!dailyData || dailyData.length === 0) {
    return (
      <div className={`md:col-span-2 p-6 rounded-2xl border ${cardClasses} shadow-lg`}>
        <h3 className="text-xl font-bold mb-4">7-Day Forecast</h3>
        <p>No forecast data available</p>
      </div>
    );
  }

  return (
    <div className={`md:col-span-2 p-6 rounded-2xl border ${cardClasses} shadow-lg`}>
      <h3 className="text-xl font-bold mb-4">7-Day Forecast</h3>
      <div className="space-y-3">
        {dailyData.slice(0, 7).map((day, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-opacity-50 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              {day.weather?.[0]?.icon && getWeatherIcon(day.weather[0].icon)}
              <span className="font-medium">{formatDate(day.dt)}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                {Math.round((day.pop || 0) * 100)}% rain
              </span>
              <span className="font-semibold">
                {Math.round(day.temp?.day || 0)}° / {Math.round(day.temp?.night || 0)}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;
