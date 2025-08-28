import React from "react";

const ForecastCard = ({ day }) => {
  const date = new Date(day.dt * 1000);
  const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

  return (
    <div className="forecast-card">
      <h4>{dayName}</h4>
      <p>{day.temp.day}°C</p>
      <p>{day.weather[0].main}</p>
    </div>
  );
};

export default ForecastCard;
