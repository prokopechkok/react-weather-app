import React, { useState } from "react";
import FormattedDate from "./FormattedDate";
import axios from "axios";
import WeatherTemperature from "./WeatherTemperature";

export default function WeatherInfo(props) {
  const [city, setCity] = useState(props.defaultCity);
  const [weatherData, setWeatherData] = useState({ ready: false });

  function displayForecast(response) {
    setWeatherData({
      city: response.data.name,
      iconUrl: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      temperature: Math.round(response.data.main.temp),
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      wind: Math.round(response.data.wind.speed),
      date: new Date(response.data.dt * 1000),
      ready: true,
    });
  }

  function search() {
    let apiKey = "8438301216c2822a596249b61bb568d7";

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }
  function handleCityChange(event) {
    setCity(event.target.value);
  }
  if (weatherData.ready) {
    return (
      <div className="WeatherInfo">
        <div className="Weather">
          <div className="weather-app">
            <div className="row">
              <div className="col-6">
                <div className="clearfix weather-temperature">
                  <img
                    src={weatherData.iconUrl}
                    alt="cloudy"
                    id="icon"
                    className="float-left"
                  />
                  <WeatherTemperature celsius={weatherData.temperature} />
                </div>
              </div>
              <div className="col-6">
                <ul>
                  <li>
                    Humidity: <span id="humidity">{weatherData.humidity}</span>%
                  </li>
                  <li>
                    Wind: <span id="wind">{weatherData.wind}</span> m/h
                  </li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="overview">
                  <h1 id="city">{weatherData.city}</h1>
                  <ul>
                    <li>
                      <span id="date">
                        <FormattedDate date={weatherData.date} />
                      </span>
                    </li>
                    <li id="description">{weatherData.description}</li>
                  </ul>
                </div>
              </div>
              <div className="col-6">
                <form id="search-form" onSubmit={handleSubmit}>
                  <input
                    type="search"
                    placeholder="Type a city..."
                    className="form-control"
                    id="city-input"
                    autoComplete="off"
                    autoFocus="on"
                    onChange={handleCityChange}
                  />
                  <input
                    type="submit"
                    value="Search"
                    className="btn btn-primary w-30"
                  />
                </form>
              </div>
            </div>
            <div className="weather-forecast" id="forecast">
              forecast
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}
