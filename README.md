# Weather-dashboard-using-React-api


A React-based **Weather Dashboard** that provides real-time and forecasted weather information in a visually interactive way.  
This project integrates multiple APIs and charting libraries to display temperature, humidity, wind speed, day/night cycle, and more.

---

## 🚀 Features
- 🌍 **City Search**: Search weather by location using **Nominatim API** for geocoding.
- ☁️ **Current Weather**: Real-time weather data using **OpenWeather API**.
- 📊 **Forecast Visualization**: Weather forecasts (temperature, humidity, wind, etc.) displayed using **OpenMeteo API**.
- 📈 **Interactive Charts & Tables**:
  - Line charts for temperature trends
  - Pie charts for day/night distribution
  - Tables for structured forecast data
- 🌙 **Day & Night Cycle** with sunrise/sunset details.
- 💨 **Wind Information**: Wind speed and direction displayed in chart format.
- 🖥️ Responsive design with **React + TailwindCSS**.

---

## 🛠️ Tech Stack
- **Frontend**: React, TailwindCSS  
- **APIs**: 
  - [OpenWeather API](https://openweathermap.org/api) → Real-time weather  
  - [Nominatim API](https://nominatim.org/) → Location/Geocoding  
  - [OpenMeteo API](https://open-meteo.com/) → Weather forecast  
- **Charts & Tables**: Recharts (PieChart, LineChart, BarChart) & custom tables  

---


## Project Structure
/src
├── components # Reusable components (charts, tables, cards)
├── pages # Main pages (Dashboard, Search, etc.)
├── utils # Helper functions (API calls, formatting)
└── App.js # Entry point


---

## ⚡ How It Works
1. User searches for a location → **Nominatim API** provides latitude & longitude.  
2. Latitude & longitude → passed to **OpenWeather API** for current weather.  
3. Forecast data → fetched from **OpenMeteo API**.  
4. Data → visualized with **Recharts** (pie, line, bar charts) + tables.  

---

## 📌 Future Improvements
- Add authentication & user preferences (favorite cities).  
- Support more detailed air quality and pollution data.  
- Add animations and advanced UI/UX improvements.
- live map location of that particular area

---



## 👨‍💻 Author
- **Kiran Mandal**  
- 🌐 [GitHub Profile](https://github.com/kiran-hness)  

---

