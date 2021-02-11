function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function displayTemperature (response){
    let cityElement = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temperature");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let feelsElement = document.querySelector("#feels");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");
    
    centigradeTemperature = response.data.main.temp;
    cityElement.innerHTML = response.data.name;
    temperatureElement.innerHTML = Math.round(centigradeTemperature);
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    feelsElement.innerHTML = Math.round(response.data.main.feels_like);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt",response.data.weather[0].description);
}

function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;
   
for (let index = 0; index < 5; index++) {
    forecast = response.data.list [index];
    forecastElement.innerHTML += `
    <div class="col">
    ${formatHours(forecast.dt * 1000)} <br />
    <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" id="forecast-img"/> <br />
    <strong>${Math.round(forecast.main.temp_max)}°</strong> 
    ${Math.round(forecast.main.temp_min)}°
    </div>`;
    }    
}

function displayCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "99c6c9b126b6c2748213ca0867d33cb6";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getCurrentLocation(event) {
    event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayCurrentLocation);
}

function search (city) {
let apiKey = "99c6c9b126b6c2748213ca0867d33cb6";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
event.preventDefault();
let cityInputElement = document.querySelector("#city-input");
search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
    event.preventDefault();
    centigradeLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (centigradeTemperature * 9) / 5 + 32;
    let temperatureElement = document.querySelector ("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCentigradeTemperature(event) {
    event.preventDefault();
    centigradeLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector ("#temperature");
    temperatureElement.innerHTML = Math.round(centigradeTemperature);
}

let centigradeTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let centigradeLink = document.querySelector("#centigradeLink");
centigradeLink.addEventListener("click", displayCentigradeTemperature);

let locationButton= document.querySelector("#locationButton");
locationButton.addEventListener("click", getCurrentLocation);

search ("London");


