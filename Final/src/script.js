let now = new Date();
let today = document.querySelector("h5.card-title");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();
today.innerHTML = `${day} ${hour}:${minute}`;

//city and temperature
function showTemperature(response) {
  console.log(response);
  let mainCity = document.querySelector("h5.main-city");
  mainCity.innerHTML = response.data.name;
  let humidity = document.querySelector("#humidity");
  let fetchHum = response.data.main.humidity;
  humidity.innerHTML = `${fetchHum}`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let mainIcon = document.querySelector("#main-icon");
  let fetchIcon = response.data.weather.[0].icon;
  mainIcon.innerHTML = `<img src="/src/icons/${fetchIcon}.png"/>`;

  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#main-temp");
  tempElement.innerHTML = `${temperature}`;
  function celsius(event) {
    event.preventDefault();
    tempElement.innerHTML = `${temperature}`;
  }
  function fahrenheit(event) {
    event.preventDefault();
    tempElement.innerHTML = Math.round(temperature * 9) / 5 + 32;
  }
  let ctemp = document.querySelector("#celsius");
  ctemp.addEventListener("click", celsius);
  let ftemp = document.querySelector("#fahrenheit");
  ftemp.addEventListener("click", fahrenheit);
}

function searchCity(event) {
  event.preventDefault();
  let searchResult = document.querySelector("#search-text");
  let city = searchResult.value;
  let apiKey = "b6a67f67579bcd300971f2f49b91d214";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(showTemperature);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);
let searchButton = document.querySelector("#search");
searchButton.addEventListener("click", searchCity);

//homework 5 bonus with geo

function showCurrentLocation(response) {
  let mainCity = document.querySelector("h5.main-city");
  mainCity.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#main-temp");
  tempElement.innerHTML = `${temperature}`;

  function celsius(event) {
    event.preventDefault();
    tempElement.innerHTML = `${temperature}`;
  }
  function fahrenheit(event) {
    event.preventDefault();
    tempElement.innerHTML = Math.round(temperature * 9) / 5 + 32;
  }
  let ctemp = document.querySelector("#celsius");
  ctemp.addEventListener("click", celsius);
  let ftemp = document.querySelector("#fahrenheit");
  ftemp.addEventListener("click", fahrenheit);
}

function getPosition(position) {
  let apiKey = "b6a67f67579bcd300971f2f49b91d214";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  axios.get(url).then(showCurrentLocation);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getPosition);
}

let locationButton = document.querySelector("#location");
locationButton.addEventListener("click", getCurrentLocation);
