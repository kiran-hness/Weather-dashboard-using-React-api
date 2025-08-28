import React from 'react';
import { RefreshCw, MapPin, Map, Settings } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header = ({ 
  isDarkMode, 
  setIsDarkMode, 
  units, 
  setUnits, 
  onRefresh, 
  onLocationClick, 
  onMapToggle, 
  showMap 
}) => (
  <div className="flex justify-between items-center mb-8">
    <div>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Weather Dashboard
      </h1>
      <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
        Professional weather tracking and forecasting
      </p>
    </div>
    
    <div className="flex items-center gap-3">
      {/* Units Toggle */}
      <div className="flex items-center gap-2">
        <Settings className="w-4 h-4 text-gray-500" />
        <select
          value={units}
          onChange={(e) => setUnits(e.target.value)}
          className={`px-3 py-2 rounded-lg border text-sm ${
            isDarkMode 
              ? 'bg-gray-800 border-gray-600 text-white' 
              : 'bg-white border-gray-200'
          }`}
        >
          <option value="metric">Metric (°C, km/h)</option>
          <option value="imperial">Imperial (°F, mph)</option>
        </select>
      </div>
      
      {/* Action Buttons */}
      <button
        onClick={onLocationClick}
        className={`p-2 rounded-full transition-colors ${
          isDarkMode 
            ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
        }`}
        title="Get current location"
      >
        <MapPin className="w-4 h-4" />
      </button>
      
      <button
        onClick={onMapToggle}
        className={`p-2 rounded-full transition-colors ${
          showMap
            ? 'bg-purple-500 text-white'
            : isDarkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
        }`}
        title="Toggle map view"
      >
        <Map className="w-4 h-4" />
      </button>
      
      <button
        onClick={onRefresh}
        className={`p-2 rounded-full transition-colors ${
          isDarkMode 
            ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
        }`}
        title="Refresh weather data"
      >
        <RefreshCw className="w-4 h-4" />
      </button>
      
      <ThemeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </div>
  </div>
);

export default Header;