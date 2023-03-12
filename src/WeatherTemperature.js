import React, { useState } from "react";
export default function WeatherTemperature(props) {
  const [unit, setUnit] = useState("celsius");

  function displayFahrenheit(event) {
    event.preventDefault();
    setUnit("fahrenheit");
  }

  function displayCelsius(event) {
    event.preventDefault();
    setUnit("celsius");
  }

  if (unit === "celsius") {
    return (
      <span className="WeatherTemperature">
        <span>
          <strong>{props.celsius}</strong>
          <span className="units">
            <a href="/" id="celsius-link" className="active">
              °C
            </a>{" "}
            |
            <a href="/" id="fahrenheit-link" onClick={displayFahrenheit}>
              °F
            </a>
          </span>
        </span>
      </span>
    );
  } else {
    let fahrenheit = Math.round((props.celsius * 9) / 5 + 32);
    return (
      <span className="WeatherTemperature">
        <span>
          <strong>{fahrenheit}</strong>
          <span className="units">
            <a href="/" id="celsius-link" onClick={displayCelsius}>
              °C
            </a>{" "}
            |
            <a href="/" id="fahrenheit-link" className="active">
              °F
            </a>
          </span>
        </span>
      </span>
    );
  }
}
