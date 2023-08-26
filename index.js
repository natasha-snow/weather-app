function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let weekDays = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[weekDays];
  let currentDate = date.getDate();

  return `${day} ${currentDate}, ${hours}:${minutes}`;
}

function search(e) {
  e.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;

  searchCity(cityInput.value);
}

function searchCity(city) {
  let apiKey = "fa801de90a2720cc335fe2a667b5bbf4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showCurrentLocation);
}

function changeToCelsius(e) {
  e.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 15;
}

function changeToFahrenheit(e) {
  e.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 59;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", changeToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", changeToFahrenheit);

//function 1
let form = document.querySelector("#search-form");
let submitButton = document.querySelector("#firstButton");
let currentButton = document.querySelector("#current-location");

//
function showCurrentLocation(response) {
  let searchedCityEl = document.querySelector("#city");
  let windEl = document.querySelector("#wind");
  let humidityEl = document.querySelector("#humidity");
  let temperatureEl = document.querySelector("#temperature");

  let temperature = Math.round(response.data.main.temp);
  let place = response.data.name;
  let humidity = Math.round(response.data.main.humidity);
  let windSpeed = Math.round(response.data.wind.speed);

  searchedCityEl.innerHTML = `${place}`;
  temperatureEl.innerHTML = `${temperature}°`;
  windEl.innerHTML = `Wind: ${windSpeed} km/h`;
  humidityEl.innerHTML = `Humidity: ${humidity}%`;
}

//
function getLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "64469ac67e6dc941feb5b50915a18dc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCurrentLocation);
}

//
function searchLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let location = document.querySelector("#current-location");
location.addEventListener("click", searchLocation);
