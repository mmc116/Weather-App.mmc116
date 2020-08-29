function realTime() {
  let currentDayInfo = document.querySelector("#current-day");

  let now = new Date();

  let hour = now.getHours();
  let minutes = now.getMinutes();

  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = weekDays[now.getDay()];

  let monthDay = now.getDate();

  let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  let month = months[now.getMonth()];
  let year = now.getFullYear();

  currentDayInfo.innerHTML = `${hour}:${minutes} ${weekDay} <br />${monthDay}.${month}.${year}`;
}

realTime();

function showLocationWeather(response) {
  let cityName = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  let temp = document.querySelector("#degrees");
  h1.innerHTML = `${cityName}`;
  temp.innerHTML = `${temperature}°`;
}
function getLocationWeather(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let unit = "metric";
  let apiKey = "ff3fb90c5258ccf0229e6dfb9eb39e40";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showLocationWeather);
}

function getPosition(event) {
  navigator.geolocation.getCurrentPosition(getLocationWeather);
}

let locationButton = document.querySelector("#current-location-button");
locationButton.addEventListener("click", getPosition);

function showCityTemperature(response) {
  let city = document.querySelector("h1");
  let temp = document.querySelector("#degrees");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  city.innerHTML = `${response.data.name}`;
  temp.innerHTML = `${Math.round(response.data.main.temp)}°`;
  wind.innerHTML = `Wind: ${response.data.wind.speed}km/h`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
}

function getCityTemperature(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let unit = "metric";
  let apiKey = "ff3fb90c5258ccf0229e6dfb9eb39e40";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showCityTemperature);
}

let searchCity = document.querySelector("#search-button");
searchCity.addEventListener("click", getCityTemperature);
