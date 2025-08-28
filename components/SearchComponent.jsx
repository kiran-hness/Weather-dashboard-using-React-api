// Enhanced components/SearchComponent.jsx
import React, { useState } from 'react';
import { Search, Star, StarOff, Clock, Globe, X } from 'lucide-react';

const SearchComponent = ({ 
  city, 
  setCity, 
  onSearch, 
  loading, 
  recentCities, 
  isDarkMode, 
  citySuggestions = [], 
  onCitySelect, 
  fetchCitySuggestions,
  favorites = [],
  onToggleFavorite
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeTab, setActiveTab] = useState('recent'); // recent, favorites

  const handleInputChange = (e) => {
    const value = e.target.value;
    fetchCitySuggestions(value);
    setShowSuggestions(value.length > 0);
  };

  const handleCitySelect = (cityObj) => {
    onCitySelect(cityObj);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setCity('');
    setShowSuggestions(false);
  };

  return (
    <div className="mb-8 relative">
      <div className="flex gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={city}
            onChange={handleInputChange}
            onKeyPress={(e) => e.key === 'Enter' && onSearch(city)}
            onFocus={() => setShowSuggestions(city.length > 0)}
            placeholder="Search for any city worldwide..."
            className={`w-full pl-10 pr-12 py-3 rounded-xl border-2 focus:border-blue-500 outline-none transition-colors ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-200 placeholder-gray-500'
            }`}
          />
          {city && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          
          {/* Enhanced Suggestions Dropdown */}
          {showSuggestions && citySuggestions.length > 0 && (
            <div className={`absolute z-20 w-full mt-2 rounded-xl shadow-2xl border max-h-80 overflow-y-auto ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-600' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="p-3 border-b border-gray-200 dark:border-gray-600">
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Found {citySuggestions.length} cities
                </p>
              </div>
              {citySuggestions.map((suggestion, idx) => (
                <div
                  key={idx}
                  className={`px-4 py-3 hover:bg-blue-50 dark:hover:bg-gray-700 cursor-pointer border-b last:border-b-0 ${
                    isDarkMode ? 'border-gray-700' : 'border-gray-100'
                  }`}
                  onClick={() => handleCitySelect(suggestion)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-blue-500" />
                      <div>
                        <p className="font-medium">{suggestion.name}</p>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {suggestion.state && `${suggestion.state}, `}{suggestion.country}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(suggestion.display_name);
                      }}
                      className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      {favorites.includes(suggestion.display_name) ? (
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      ) : (
                        <StarOff className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <button
          onClick={() => onSearch(city)}
          disabled={loading || !city.trim()}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Searching...
            </div>
          ) : (
            'Search'
          )}
        </button>
      </div>

      {/* Enhanced Quick Access Tabs */}
      {(recentCities.length > 0 || favorites.length > 0) && (
        <div className="space-y-3">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('recent')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'recent'
                  ? 'bg-blue-500 text-white'
                  : isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Clock className="w-4 h-4 inline mr-1" />
              Recent ({recentCities.length})
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'favorites'
                  ? 'bg-blue-500 text-white'
                  : isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <Star className="w-4 h-4 inline mr-1" />
              Favorites ({favorites.length})
            </button>
          </div>

          <div className="flex gap-2 flex-wrap">
            {activeTab === 'recent' && recentCities.map((recentCity, index) => (
              <button
                key={`recent-${index}`}
                onClick={() => onSearch(recentCity)}
                className={`text-sm px-4 py-2 rounded-full transition-all hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 border border-gray-600' 
                    : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm'
                }`}
              >
                <Clock className="w-3 h-3 inline mr-1" />
                {recentCity.split(',')[0]}
              </button>
            ))}
            
            {activeTab === 'favorites' && favorites.map((favorite, index) => (
              <div key={`fav-${index}`} className="flex items-center">
                <button
                  onClick={() => onSearch(favorite)}
                  className={`text-sm px-4 py-2 rounded-l-full transition-all hover:scale-105 ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 border border-gray-600 border-r-0' 
                      : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 border-r-0 shadow-sm'
                  }`}
                >
                  <Star className="w-3 h-3 inline mr-1 text-yellow-500" />
                  {favorite.split(',')[0]}  
                </button>
                <button
                  onClick={() => onToggleFavorite(favorite)}
                  className={`px-2 py-2 rounded-r-full transition-all ${
                    isDarkMode 
                      ? 'bg-red-600 hover:bg-red-500 text-white border border-red-600' 
                      : 'bg-red-500 hover:bg-red-400 text-white border border-red-500'
                  }`}
                  title="Remove from favorites"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchComponent