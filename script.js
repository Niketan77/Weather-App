let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_temperature = document.querySelector(".weather_temperature");
let w_icon = document.querySelector(".weather_icon");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");

let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let citySearch = document.querySelector(".weather_search");

// Function to get the country name from the country code
const getCountryName = (code) => {
  return new Intl.DisplayNames([code], { type: 'region' }).of(code);
};

// Function to convert the Unix timestamp to a human-readable date and time
const getDateTime = (dt) => {
  const curDate = new Date(dt * 1000);
  console.log(curDate);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  console.log(formatter);
  return formatter.format(curDate);
};

// Default city
let city = "Mumbai";

// Event listener for the search form submission
citySearch.addEventListener("submit", (e) => {
  e.preventDefault();
  let cityNameInput = document.querySelector(".city_name");
  console.log(cityNameInput.value);
  city = cityNameInput.value;
  getWeatherData();
  cityNameInput.value = "";
});

// Main function to fetch and display the weather data
const getWeatherData = async () => {
  // Note the &units=metric parameter
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=5a6a3cd0102f1bba0a45ddc9a074c2c1`;
  try {
    const res = await fetch(weatherUrl);
    const data = await res.json();
    const { main, name, weather, wind, sys, dt } = data;

    // Update DOM elements with fetched data
    cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;
    dateTime.innerHTML = getDateTime(dt);

    w_forecast.innerHTML = weather[0].main;
    w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;

    // Display temperature values in Celsius
    w_temperature.innerHTML = `${main.temp.toFixed(1)}&#176; C`;
    w_minTem.innerHTML = `Min: ${main.temp_min.toFixed(1)}&#176; C`;
    w_maxTem.innerHTML = `Max: ${main.temp_max.toFixed(1)}&#176; C`;

    w_feelsLike.innerHTML = `${main.feels_like.toFixed(1)}&#176; C`;
    w_humidity.innerHTML = `${main.humidity}%`;
    w_wind.innerHTML = `${wind.speed} m/s`;
    w_pressure.innerHTML = `${main.pressure} hPa`;
  } catch (error) {
    console.log(error);
  }
};

// Fetch weather data when the page loads
document.addEventListener('DOMContentLoaded', getWeatherData);
