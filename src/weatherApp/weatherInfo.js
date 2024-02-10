 import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

function WeatherInfo({ weatherData }) {
  const [isCelsius, setIsCelsius] = useState(true);

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  const convertToFahrenheit = (temp) => {
    return (temp * 9) / 5 + 32;
  };

  const temperature = isCelsius
    ? weatherData.main.temp.toFixed(2)
    : convertToFahrenheit(weatherData.main.temp).toFixed(2);
  const unit = isCelsius ? "C" : "F";

  return (
    <div id="weather-info">
      <Card style={{ width: "auto" }}>
        <Card.Header>
          Current Weather for {weatherData.name}, {weatherData.sys.country}
        </Card.Header>
        <ListGroup variant="flush" style={{ textAlign: "left" }}>

          <ListGroup.Item>
            <strong>Temperature</strong>:{" "}
            <span id="temperature">
              {temperature} °{unit}
            </span>{" "}
            <button onClick={toggleTemperatureUnit} style={{
              backgroundColor: "white",
              border: "1px solid black",
              color: "black",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block",
              fontSize: "16px",
              margin: "4px 2px",
              cursor: "pointer",

            }}>
              Switch To {isCelsius ? "Farenheit" : "Celcius"}
            </button>
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Wind Speed</strong>: {weatherData.wind.speed}m/s
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Humidity</strong>: {weatherData.main.humidity}%
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
}

export default WeatherInfo;
