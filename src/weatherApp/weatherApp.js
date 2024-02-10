import React, { useState } from "react";
import WeatherInfo from "./weatherInfo.js";
import NavBar from "../common/Navbar.js";
 

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");
  const [items, setItems] = useState([]);
  const apiKey = "e1c9b35dd509447717f7d1c5d2a96508";

  const displayItems = () => {
    const storedItems = JSON.parse(sessionStorage.getItem("items"));
    if (storedItems) {
      setItems(storedItems);
    }
  };
  const hideItems = () => {
    setItems([]);
  }

  const getWeather = () => {
    if (city.trim() !== "") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.cod === 200) {
            setWeatherData(data);

            const items = JSON.parse(sessionStorage.getItem("items")) || [];
            if (!items.includes(city)) {
              items.push(city);
              sessionStorage.setItem("items", JSON.stringify(items));
            }
            sessionStorage.setItem("items", JSON.stringify(items));
            console.log(JSON.parse(sessionStorage.getItem("items")));

            setError("");
          } else {
            setError(
              "Failed to fetch weather data. Please try again later or check the city name."
            );
            setWeatherData(null);
          }
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
          setError("Failed to fetch weather data. Please try again later.");
          setWeatherData(null);
        });
    } else {
      setError("City field cannot be empty");
      setWeatherData(null);
    }
  };

  const resetSearch = () => {
    setWeatherData(null);
  };

  return (
    <>
    <NavBar/>
    <div className="App"> 
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="form-group form-inline">
              <input
                type="text"
                className="form-control shadow-none mb-2 w-64"
                placeholder="Search For a City... "
                value={city}
                onChange={(e) => setCity(e.target.value)}
               // onMouseEnter={displayItems}
               onFocus={displayItems}
                
              />

              <ul onMouseLeave={hideItems}>
                {items.slice(-5).map((item, index) => (
                  <div className="text-dark d-flex justify-content-start displayItems" style={{
                   
                     width: "auto",
                  }}  >
                    {
                      <ul >
                        <li key={index} onClick={() => setCity(item)}>
                          {" "}
                          @previously searched:: {item}
                        </li>
                        <hr />
                      </ul>
                    }
                  </div>
                ))}
              </ul>
              <button
                className="btn btn-dark m-2"
                onClick={getWeather}
              >
                Search
              </button>
              <button
                className="btn btn-dark m-2"
                onClick={resetSearch}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
        <div>
          {weatherData !== null ? (
            <WeatherInfo weatherData={weatherData} />
          ) : (
            <> </>
          )}
        </div>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
      </div>
    </div>
    </>
  );
}

export default WeatherApp;
