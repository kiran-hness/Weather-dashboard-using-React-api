// Enhanced components/CurrentWeatherCard.jsx
import React from 'react';
import { MapPin, Thermometer, Droplets, Wind, Eye, Gauge, Sun, CloudRain, Star, StarOff } from 'lucide-react';

const CurrentWeatherCard = ({ weatherData, isDarkMode, units, onToggleFavorite, isFavorite }) => {
  const cardClasses = isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
  const tempUnit = units === 'imperial' ? '°F' : '°C';
  const windUnit = units === 'imperial' ? 'mph' : 'km/h';
  const pressureUnit = 'hPa';
  
  const getWeatherIcon = (weatherCode, size = 'w-16 h-16') => {
    if (weatherCode >= 0 && weatherCode <= 3) return <Sun className={`${size} text-yellow-500`} />;
    if (weatherCode >= 61 && weatherCode <= 65) return <CloudRain className={`${size} text-blue-500`} />;
    return <Sun className={`${size} text-yellow-500`} />;
  };

  const current = weatherData.current;
  
  return (
    <div className={`p-8 rounded-3xl border ${cardClasses} shadow-xl bg-gradient-to-br ${
      isDarkMode 
        ? 'from-gray-800 to-gray-900' 
        : 'from-white to-blue-50'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <MapPin className="w-6 h-6 text-blue-500" />
          <div>
            <h2 className="text-3xl font-bold">{weatherData.cityName}</h2>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => onToggleFavorite(weatherData.cityName)}
            className={`p-3 rounded-full transition-colors ${
              isFavorite 
                ? 'bg-yellow-500 text-white' 
                : isDarkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
            }`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? <Star className="w-5 h-5" /> : <StarOff className="w-5 h-5" />}
          </button>
          {getWeatherIcon(current.weather_code)}
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
        <div className="text-center col-span-2">
          <Thermometer className="w-8 h-8 mx-auto mb-3 text-red-500" />
          <p className="text-5xl font-bold mb-1">{Math.round(current.temp)}{tempUnit}</p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>Temperature</p>
          <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            Feels like {Math.round(current.feels_like)}{tempUnit}
          </p>
        </div>
        
        <div className="text-center">
          <Droplets className="w-6 h-6 mx-auto mb-3 text-blue-500" />
          <p className="text-2xl font-bold">{current.humidity}%</p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Humidity</p>
        </div>
        
        <div className="text-center">
          <Wind className="w-6 h-6 mx-auto mb-3 text-green-500" />
          <p className="text-2xl font-bold">{Math.round(current.wind_speed)}</p>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{windUnit}</p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Wind</p>
        </div>
        
        <div className="text-center">
          <Gauge className="w-6 h-6 mx-auto mb-3 text-purple-500" />
          <p className="text-2xl font-bold">{Math.round(current.pressure)}</p>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{pressureUnit}</p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pressure</p>
        </div>
        
        <div className="text-center">
          <Eye className="w-6 h-6 mx-auto mb-3 text-indigo-500" />
          <p className="text-2xl font-bold">{current.visibility}</p>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>km</p>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Visibility</p>
        </div>
      </div>

      {/* Additional Weather Info */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex justify-between">
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>UV Index:</span>
            <span className="font-semibold">{current.uv_index || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Cloud Cover:</span>
            <span className="font-semibold">{current.cloud_cover}%</span>
          </div>
          <div className="flex justify-between">
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Precipitation:</span>
            <span className="font-semibold">{current.precipitation} mm</span>
          </div>
          <div className="flex justify-between">
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Wind Gust:</span>
            <span className="font-semibold">{Math.round(current.wind_gust || 0)} {windUnit}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;