import React, { useState } from "react";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });

  function displayForecast(response) {
    console.log(response.data);
    setWeatherData({
      city: response.data.name,
      iconUrl:
        "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/scattered-clouds-day.png",
      temperature: Math.round(response.data.main.temp),
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      wind: Math.round(response.data.wind.speed),
      date: "Wed 07:00",
      ready: true,
    });
  }

  if (weatherData.ready) {
    return (
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
                <span className="float-left">
                  <strong id="temperature">{weatherData.temperature}</strong>
                  <span className="units">
                    <a href="/" id="celsius-link" className="active">
                      °C
                    </a>{" "}
                    |
                    <a href="/" id="fahrenheit-link">
                      °F
                    </a>
                  </span>
                </span>
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
                    <span id="date">{weatherData.date}</span>
                  </li>
                  <li id="description">{weatherData.description}</li>
                </ul>
              </div>
            </div>
            <div className="col-6">
              <form id="search-form">
                <input
                  type="search"
                  placeholder="Type a city..."
                  className="form-control"
                  id="city-input"
                  autoComplete="off"
                  autoFocus="on"
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
    );
  } else {
    let apiKey = "8438301216c2822a596249b61bb568d7";

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.defaultCity}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
    return "Loading...";
  }
}

/*function formatDate(timestamp) {
    let date = new Date(timestamp);

    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }

    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    let day = days[date.getDay()];

    let formattedDate = `${day} ${hours}:${minutes}`;

    return formattedDate;
  }

  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
  }

  function displayForecast(response) {
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;

    forecast.forEach(function (forecastDay, index) {
      if (index < 6) {
        forecastHTML =
          forecastHTML +
          `<div class="col-2">
									<div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
									<img
										src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
										alt="" width="42"/>
									<div class="weather-forecast-temperatures">
										<span class="weather-forecast-temperature-max">${Math.round(
                      forecastDay.temp.max
                    )}° </span>
										<span class="weather-forecast-temperature-min">${Math.round(
                      forecastDay.temp.min
                    )}° </span>
									</div>
							</div> `;
      }
    });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  }

  function getForecast(coordinates) {
    let apiKey = "8438301216c2822a596249b61bb568d7";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
  }

  function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    celsiusTemp = response.data.main.temp;
    temperatureElement.innerHTML = Math.round(celsiusTemp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);

    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

    iconElement.setAttribute("alt", response.data.weather[0].description);

    getForecast(response.data.coord);
  }

  function search(city) {
    let apiKey = "8438301216c2822a596249b61bb568d7";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
  }

  function displayFahrenheitTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");

    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemp);
  }
  let celsiusTemp = null;

  function displayCelsiusTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");

    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    temperatureElement.innerHTML = Math.round(celsiusTemp);
  }

  let form = document.querySelector("#search-form");
  form.addEventListener("submit", handleSubmit);

  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", displayCelsiusTemp);

  search("Lviv");*/
