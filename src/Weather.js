import React from "react";

import "./Weather.css";

import WeatherInfo from "./WeatherInfo";

export default function Weather(props) {
  return <WeatherInfo defaultCity="Lviv" />;
}
