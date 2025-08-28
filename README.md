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
## application iamges


<img width="1903" height="782" alt="image" src="https://github.com/user-attachments/assets/007c45af-9c4e-4ddc-9b9b-4ac276597a6e" />
<img width="1853" height="823" alt="image" src="https://github.com/user-attachments/assets/63ccc803-5e93-4939-a717-0101c1ea3bad" />
<img width="1850" height="667" alt="image" src="https://github.com/user-attachments/assets/7cb912ec-3f80-4079-aa91-7a8a7f7f4447" />



---

## 👨‍💻 Author
- **Kiran Mandal**  
- 🌐 [GitHub Profile](https://github.com/kiran-hness)  

---

