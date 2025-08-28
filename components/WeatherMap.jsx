    import React from 'react';
    import { Map, MapPin } from 'lucide-react';
    

    const WeatherMap = ({ coordinates, isDarkMode }) => {
    const cardClasses = isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';
    
    return (
        <div className={`p-6 rounded-2xl border ${cardClasses} shadow-lg`}>
        <div className="flex items-center gap-2 mb-4">
            <Map className="w-5 h-5 text-purple-500" />
            <h3 className="text-xl font-bold">Location Map</h3>
        </div>
        <div className="relative h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
            <MapPin className="w-12 h-12 mx-auto mb-2 text-purple-500" />
            <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Coordinates: {coordinates?.lat?.toFixed(4)}, {coordinates?.lon?.toFixed(4)}
            </p>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>
                Map integration available with Leaflet.js or Google Maps API
            </p>
            </div>
        </div>
        </div>
    );
    };

    export default WeatherMap;