import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Header from './components/Header';
import SearchComponent from './components/SearchComponent';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import TemperatureChart from './components/TemperatureChart';
import RainChart from './components/RainChart';
import WeeklyForecast from './components/WeeklyForecast';
import DayNightChart from './components/DayNightChart';
import ErrorMessage from './components/ErrorMessage';
import WindChart from './components/WindChart';
import HumidityChart from './components/HumidityChart';
import WeatherMap from './components/WeatherMap';
import LoadingSpinner from './components/LoadingSpinner';
import { debounce } from 'lodash';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [recentCities, setRecentCities] = useState([]);
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [units, setUnits] = useState('metric');
  const [showMap, setShowMap] = useState(false);

  // Load saved data
  useEffect(() => {
    const savedCities = JSON.parse(localStorage.getItem('recentCities') || '[]');
    const savedTheme = localStorage.getItem('isDarkMode') === 'true';
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const savedUnits = localStorage.getItem('units') || 'metric';
    setRecentCities(savedCities);
    setIsDarkMode(savedTheme);
    setFavorites(savedFavorites);
    setUnits(savedUnits);
    getCurrentLocation();
  }, []);

  useEffect(() => {
    localStorage.setItem('isDarkMode', isDarkMode);
    localStorage.setItem('units', units);
  }, [isDarkMode, units]);

//   useEffect(() => {
//   const savedCity = localStorage.getItem("city");
//   if (savedCity) {
//     setCity(savedCity);
//     fetchWeatherData(savedCity); 
//   }
// }, []);

// Save city to localStorage whenever it changes
useEffect(() => {
  if (city) {
    localStorage.setItem("city", city);
  }
}, [city]);
  


  

  const getCurrentLocation = () => {
  const savedCity = localStorage.getItem('city');
  if (savedCity) {
    fetchWeatherData(savedCity);
    return;
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lon: longitude });
        fetchWeatherByCoords(latitude, longitude);
      },
      () => {
        fetchWeatherData('New York');
      }
    );
  } else {
    fetchWeatherData('New York');
  }
};


  const debouncedFetchSuggestions = useCallback(
    debounce(async (query) => {
      if (!query.trim() || query.length < 2) {
        setCitySuggestions([]);
        return;
      }
      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=8&appid=your-api-key-here`
        );
        if (!response.ok) {
          const fallbackResponse = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=8&addressdetails=1`
          );
          const fallbackData = await fallbackResponse.json();
          const suggestions = fallbackData
            .filter(item => item.type === 'administrative' || item.class === 'place')
            .map(item => ({
              name: item.name || item.display_name?.split(',')[0],
              country: item.address?.country || 'Unknown',
              state: item.address?.state || item.address?.region || '',
              display_name: item.display_name,
              lat: parseFloat(item.lat),
              lon: parseFloat(item.lon)
            }));
          setCitySuggestions(suggestions);
          return;
        }
        const data = await response.json();
        const suggestions = data.map(item => ({
          name: item.name,
          country: item.country,
          state: item.state || '',
          display_name: `${item.name}, ${item.state ? item.state + ', ' : ''}${item.country}`,
          lat: item.lat,
          lon: item.lon
        }));
        setCitySuggestions(suggestions);
      } catch (err) {
        console.error('City suggestions error:', err);
        setCitySuggestions([]);
      }
    }, 300),
    []
  );

  const fetchCitySuggestions = (query) => {
    setCity(query);
    debouncedFetchSuggestions(query);
  };

  const getWeatherDescription = (code) => {
    const weatherCodes = {
      0: { main: 'Clear', description: 'Clear sky', icon: '01d' },
      1: { main: 'Mainly Clear', description: 'Mainly clear', icon: '01d' },
      2: { main: 'Partly Cloudy', description: 'Partly cloudy', icon: '02d' },
      3: { main: 'Overcast', description: 'Overcast', icon: '03d' },
      45: { main: 'Fog', description: 'Fog', icon: '50d' },
      48: { main: 'Rime Fog', description: 'Depositing rime fog', icon: '50d' },
      51: { main: 'Light Drizzle', description: 'Light drizzle', icon: '09d' },
      53: { main: 'Moderate Drizzle', description: 'Moderate drizzle', icon: '09d' },
      55: { main: 'Dense Drizzle', description: 'Dense drizzle', icon: '09d' },
      61: { main: 'Light Rain', description: 'Slight rain', icon: '10d' },
      63: { main: 'Moderate Rain', description: 'Moderate rain', icon: '10d' },
      65: { main: 'Heavy Rain', description: 'Heavy rain', icon: '10d' },
      71: { main: 'Light Snow', description: 'Slight snow fall', icon: '13d' },
      73: { main: 'Moderate Snow', description: 'Moderate snow fall', icon: '13d' },
      75: { main: 'Heavy Snow', description: 'Heavy snow fall', icon: '13d' },
      95: { main: 'Thunderstorm', description: 'Thunderstorm', icon: '11d' }
    };
    return weatherCodes[code] || { main: 'Unknown', description: 'Unknown weather', icon: '01d' };
  };

  const fetchWeatherByCoords = async (lat, lon, cityName = null) => {
    setLoading(true);
    setError('');
    setCitySuggestions([]);
    try {
      let locationName = cityName;
      if (!locationName) {
        const geoResponse = await fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=your-api-key-here`
        );
        const geoData = await geoResponse.json();
        locationName = geoData[0]?.name || `${lat.toFixed(2)}, ${lon.toFixed(2)}`;
      }

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?` +
        `latitude=${lat}&longitude=${lon}&` +
        `current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&` +
        `hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,weather_code,pressure_msl,cloud_cover,visibility,wind_speed_10m,wind_direction_10m,uv_index&` +
        `daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&` +
        `timezone=auto&` +
        `temperature_unit=${units === 'imperial' ? 'fahrenheit' : 'celsius'}&` +
        `wind_speed_unit=${units === 'imperial' ? 'mph' : 'kmh'}&` +
        `precipitation_unit=mm`
      );

      if (!weatherResponse.ok) throw new Error('Weather data not available');
      const data = await weatherResponse.json();

      const processedData = {
        cityName: locationName,
        coordinates: { lat, lon },
        units,
        current: {
          temp: data.current?.temperature_2m || 0,
          feels_like: data.current?.apparent_temperature || 0,
          humidity: data.current?.relative_humidity_2m || 0,
          wind_speed: data.current?.wind_speed_10m || 0,
          wind_direction: data.current?.wind_direction_10m || 0,
          wind_gust: data.current?.wind_gusts_10m || 0,
          pressure: data.current?.pressure_msl || 0,
          visibility: data.current?.visibility || 10,
          cloud_cover: data.current?.cloud_cover || 0,
          uv_index: data.hourly?.uv_index?.[0] || 0,
          precipitation: data.current?.precipitation || 0,
          weather_code: data.current?.weather_code || 0,
          is_day: data.current?.is_day || 1,
          weather: [getWeatherDescription(data.current?.weather_code || 0)]
        },
        hourly: data.hourly?.time?.slice(0, 24).map((time, i) => ({
          dt: new Date(time).getTime() / 1000,
          temp: data.hourly?.temperature_2m?.[i] || 0,
          feels_like: data.hourly?.apparent_temperature?.[i] || 0,
          humidity: data.hourly?.relative_humidity_2m?.[i] || 0,
          precipitation: data.hourly?.precipitation?.[i] || 0,
          pop: (data.hourly?.precipitation_probability?.[i] || 0) / 100,
          wind_speed: data.hourly?.wind_speed_10m?.[i] || 0,
          wind_direction: data.hourly?.wind_direction_10m?.[i] || 0,
          pressure: data.hourly?.pressure_msl?.[i] || 0,
          cloud_cover: data.hourly?.cloud_cover?.[i] || 0,
          uv_index: data.hourly?.uv_index?.[i] || 0,
          weather_code: data.hourly?.weather_code?.[i] || 0
        })) || [],
        daily: data.daily?.time?.map((time, i) => ({
          dt: new Date(time).getTime() / 1000,
          temp: {
            day: data.daily?.temperature_2m_max?.[i] || 0,
            night: data.daily?.temperature_2m_min?.[i] || 0
          },
          feels_like: {
            day: data.daily?.apparent_temperature_max?.[i] || 0,
            night: data.daily?.apparent_temperature_min?.[i] || 0
          },
          sunrise: new Date(data.daily?.sunrise?.[i] || Date.now()).getTime() / 1000,
          sunset: new Date(data.daily?.sunset?.[i] || Date.now()).getTime() / 1000,
          pop: (data.daily?.precipitation_probability_max?.[i] || 0) / 100,
          precipitation: data.daily?.precipitation_sum?.[i] || 0,
          wind_speed: data.daily?.wind_speed_10m_max?.[i] || 0,
          wind_gust: data.daily?.wind_gusts_10m_max?.[i] || 0,
          wind_deg: data.daily?.wind_direction_10m_dominant?.[i] || 0,
          uv_index: data.daily?.uv_index_max?.[i] || 0,
          weather_code: data.daily?.weather_code?.[i] || 0,
          weather: [getWeatherDescription(data.daily?.weather_code?.[i] || 0)]
        })) || []
      };

      setWeatherData(processedData);

      if (locationName) {
        const updatedCities = [locationName, ...recentCities.filter(c => c !== locationName)].slice(0, 4);
        setRecentCities(updatedCities);
        localStorage.setItem('recentCities', JSON.stringify(updatedCities));
      }

    } catch (err) {
      setError(err.message);
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherData = async (cityName) => {
    if (!cityName?.trim()) return;
    try {
      const geoResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${cityName}&format=json&limit=1&addressdetails=1`
      );
      const geoData = await geoResponse.json();
      if (!geoData.length) throw new Error('City not found');

      const { lat, lon, display_name } = geoData[0];
      await fetchWeatherByCoords(parseFloat(lat), parseFloat(lon), display_name);

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleCitySelect = (cityObj) => {
    fetchWeatherByCoords(cityObj.lat, cityObj.lon, cityObj.display_name);
    setCity(cityObj.display_name);
    setCitySuggestions([]);
  };

  const toggleFavorite = (cityName) => {
    const newFavorites = favorites.includes(cityName)
      ? favorites.filter(f => f !== cityName)
      : [...favorites, cityName];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const refreshWeather = () => {
    if (weatherData?.coordinates) {
      fetchWeatherByCoords(weatherData.coordinates.lat, weatherData.coordinates.lon, weatherData.cityName);
    }
  };

  const hourlyChartData = useMemo(() => (
    weatherData?.hourly?.slice(0, 12).map(hour => ({
      time: new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temp: Math.round(hour.temp),
      feels_like: Math.round(hour.feels_like),
      rain: Math.round(hour.pop * 100),
      humidity: hour.humidity,
      wind_speed: Math.round(hour.wind_speed),
      pressure: hour.pressure,
      uv_index: hour.uv_index
    })) || []
  ), [weatherData]);

  const themeClasses = isDarkMode
    ? 'bg-gray-900 text-white'
    : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900';

  return (
    <div className={`min-h-screen transition-all duration-300 ${themeClasses}`}>
      <div className="container mx-auto px-4 py-6">
        <Header 
          isDarkMode={isDarkMode} 
          setIsDarkMode={setIsDarkMode}
          units={units}
          setUnits={setUnits}
          onRefresh={refreshWeather}
          onLocationClick={getCurrentLocation}
          onMapToggle={() => setShowMap(!showMap)}
          showMap={showMap}
        />

        <SearchComponent
          city={city}
          setCity={setCity}
          onSearch={fetchWeatherData}
          loading={loading}
          recentCities={recentCities}
          citySuggestions={citySuggestions}
          fetchCitySuggestions={fetchCitySuggestions}
          onCitySelect={handleCitySelect}
          isDarkMode={isDarkMode}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />

        {error && <ErrorMessage error={error} />}
        {loading && <LoadingSpinner isDarkMode={isDarkMode} />}

        {weatherData && !loading && (
          <div className="space-y-6">
            <CurrentWeatherCard
              weatherData={weatherData}
              isDarkMode={isDarkMode}
              units={units}
              onToggleFavorite={toggleFavorite}
              isFavorite={favorites.includes(weatherData.cityName)}
            />

            {showMap && <WeatherMap coordinates={weatherData.coordinates} isDarkMode={isDarkMode} />}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TemperatureChart hourlyData={hourlyChartData} isDarkMode={isDarkMode} units={units} />
              <RainChart hourlyData={hourlyChartData} isDarkMode={isDarkMode} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WindChart hourlyData={hourlyChartData} isDarkMode={isDarkMode} units={units} />
              <HumidityChart hourlyData={hourlyChartData} isDarkMode={isDarkMode} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <WeeklyForecast
                dailyData={weatherData.daily}
                isDarkMode={isDarkMode}
                getWeatherIcon={(iconCode) => (
                  <img
                    src={`https://openweathermap.org/img/wn/${iconCode}.png`}
                    alt="weather icon"
                    className="w-8 h-8"
                  />
                )}
                formatDate={(dt) =>
                  new Date(dt * 1000).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })
                }
              />
              <DayNightChart
                isDarkMode={isDarkMode}
                sunriseTime={weatherData.daily?.[0]?.sunrise || null}
                sunsetTime={weatherData.daily?.[0]?.sunset || null}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
