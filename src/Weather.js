import React from "react";
import "./Weather.css";

export default function Weather() {
  return (
    <div className="Weather">
      <div className="weather-app">
        <div className="row">
          <div className="col-6">
            <div className="clearfix weather-temperature">
              <img src="" alt="cloudy" id="icon" className="float-left" />
              <span className="float-left">
                <strong id="temperature"></strong>
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
                Humidity: <span id="humidity"></span>%
              </li>
              <li>
                Wind: <span id="wind"></span> m/h
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="overview">
              <h1 id="city"></h1>
              <ul>
                <li>
                  <span id="date"></span>
                </li>
                <li id="description"></li>
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
        <div className="weather-forecast" id="forecast"></div>
      </div>
    </div>
  );
}
