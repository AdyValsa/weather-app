//variables
const OWApiKey = "ed55b36e362d8733f7d859247cedeaf2";
const units = "metric";
let celsiusTemperature = null;
let style = null;
let forecast = null;

// Dates
let momento = document.querySelector("#timeDisplay");
let today = new Date();
let time = today.getTime();
let hours = today.getHours();
if (hours < 10) hours = "0" + hours;
let minutes = today.getMinutes();
if (minutes < 10) minutes = "0" + minutes;
const weekDays = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
];
let day = weekDays[today.getDay()];
momento.innerHTML = `${day} ${hours}:${minutes}`;

let firstday = document.querySelector("#day1day");
firstday.innerHTML = weekDays[today.getDay() + 1];
let secondday = document.querySelector("#day2day");
secondday.innerHTML = weekDays[today.getDay() + 2];
let thirdday = document.querySelector("#day3day");
thirdday.innerHTML = weekDays[today.getDay() + 3];
let fourthday = document.querySelector("#day4day");
fourthday.innerHTML = weekDays[today.getDay() + 4];
let fifthday = document.querySelector("#day5day");
fifthday.innerHTML = weekDays[today.getDay() + 5];

// Get city

const inputCity = document.querySelector("#search-city");
inputCity.addEventListener("submit", defineCity);

function defineCity(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#SearchTxt");
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.value}&appid=${OWApiKey}&units=${units}`;
  startIt(apiURL);
}

// changes theme according to local time
function changeTheme(localHourCorrection) {
  if (8 > localHourCorrection || localHourCorrection > 17) {
    let celsiusSelector = document.querySelector("#celsius-link");
    let farenheitSelector = document.querySelector("#farenheit-link");
    let linkStyle = document.getElementById("linkGithub");
    let sheetStyle = document.getElementById("styleGiver");
    let buttonStyle = document.querySelector("#cityButton");
    let currentPositinoStyle = document.querySelector("#currentPosition");
    currentPositinoStyle.classList = "btn btn-light";
    buttonStyle.classList = "btn btn-light";
    linkStyle.classList = "link-light";
    style = "night";
    farenheitSelector.classList = "link-secondary";
    celsiusSelector.classList = "link-light";
    sheetStyle.classList =
      "container bg-dark text-light text-center border border-light border-opacity-25";
  } else {
    let celsiusSelector = document.querySelector("#celsius-link");
    let farenheitSelector = document.querySelector("#farenheit-link");
    let linkStyle = document.getElementById("linkGithub");
    let sheetStyle = document.getElementById("styleGiver");
    let buttonStyle = document.querySelector("#cityButton");
    let currentPositinoStyle = document.querySelector("#currentPosition");
    currentPositinoStyle.classList = "btn btn-secondary";
    buttonStyle.classList = "btn btn-secondary";
    celsiusSelector.classList = "link-dark";
    farenheitSelector.classList = "link-secondary";
    linkStyle.classList = "link-secondary";
    style = "day";
    sheetStyle.classList =
      "container bg-light text-black text-center border border-dark border-opacity-25";
  }
}

// Displays local Time in a camplicated way

function displayLocalTime(localHourCorrection) {
  if (localHourCorrection < 0) {
    localHourCorrection = 24 + localHourCorrection;
    if (today.getDay() === 0) {
      let showLocalTime = document.getElementById("localTime");
      let messagelocalTIme = ` Local: ${localHourCorrection}:${minutes} (Sat)`;
      showLocalTime.innerHTML = messagelocalTIme;
    } else {
      let showLocalTime = document.getElementById("localTime");
      let messagelocalTIme = ` Local: ${localHourCorrection}:${minutes} (${
        weekDays[today.getDay() - 1]
      })`;
      showLocalTime.innerHTML = messagelocalTIme;
    }
  } else if (localHourCorrection < 10 && localHourCorrection >= 0) {
    localHourCorrection = "0" + localHourCorrection;
    let showLocalTime = document.getElementById("localTime");
    let messagelocalTIme = ` Local: ${localHourCorrection}:${minutes}`;
    showLocalTime.innerHTML = messagelocalTIme;
  } else if (localHourCorrection >= 24) {
    localHourCorrection = localHourCorrection - 24;
    if (localHourCorrection < 10) {
      localHourCorrection = "0" + localHourCorrection;
      let showLocalTime = document.getElementById("localTime");
      let messagelocalTIme = ` Local: ${localHourCorrection}:${minutes} (${
        weekDays[today.getDay() + 1]
      })`;
      showLocalTime.innerHTML = messagelocalTIme;
    } else {
      let showLocalTime = document.getElementById("localTime");
      let messagelocalTIme = ` Local: ${localHourCorrection}:${minutes}`;
      showLocalTime.innerHTML = messagelocalTIme;
    }
  } else {
    let showLocalTime = document.getElementById("localTime");
    let messagelocalTIme = ` Local: ${localHourCorrection}:${minutes}`;
    showLocalTime.innerHTML = messagelocalTIme;
  }
  changeTheme(localHourCorrection);
}

// Weather forecast
function getForecast(response) {
  for (let i = 0; i < 5; i++) {
    let selectorIcon = document.querySelector(`#day${i + 1}Icon`);
    let selectorMax = document.querySelector(`#day${i + 1}Max`);
    let selectorMin = document.querySelector(`#day${i + 1}Min`);

    selectorIcon.src = `https://openweathermap.org/img/wn/${response.data.daily[i].weather[0].icon}@2x.png`;
    selectorMax.innerHTML = Math.round(response.data.daily[i].temp.max);
    selectorMin.innerHTML = Math.round(response.data.daily[i].temp.min);
  }
  forecast = response.data.daily;
}

//Forecast Api Call
function weatherForecastApiCall(coordinates) {
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${OWApiKey}&units=${units}`;
  axios.get(apiURL).then(getForecast);
}

// Temperature and weather conditions

function showTemperature(response) {
  console.log(response);
  let searchedCity = response.data.name;
  let searchedCountry = response.data.sys.country;
  let messageCity = `Currently in ${searchedCity}, ${searchedCountry}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = messageCity;
  let temperature = Math.round(response.data.main.temp);
  celsiusTemperature = temperature;
  let messageTemp = `${temperature} `;
  let showTemp = document.querySelector("#show-temp");
  showTemp.innerHTML = messageTemp;
  let weatherIcon = response.data.weather[0].icon;
  let icon = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
  let imageIcon = document.getElementById("iconToday");
  imageIcon.src = icon;
  let windSelector = document.querySelector("#windDisplay");
  let windSpeed = Math.round(response.data.wind.speed * 3.6);
  let messageWind = `Windspeed: ${windSpeed} km/h`;
  windSelector.innerHTML = messageWind;
  let humiditySelector = document.querySelector("#humidityDisplay");
  let humidityLevel = response.data.main.humidity;
  let messageHumidity = `Humidity: ${humidityLevel} %`;
  humiditySelector.innerHTML = messageHumidity;
  let conditionSelector = document.querySelector("#weatherConditions");
  let weatherDescription = response.data.weather[0].description;
  let feltTemperature = Math.round(response.data.main.feels_like);
  let messageWeatherCondition = `${weatherDescription} and it feels ${feltTemperature} °C`;
  conditionSelector.innerHTML = messageWeatherCondition;
  let localHourCorrection =
    today.getHours() +
    today.getTimezoneOffset() / 60 +
    response.data.timezone / 3600;
  weatherForecastApiCall(response.data.coord);
  displayLocalTime(localHourCorrection);
}

function startIt(URL) {
  document.querySelector("#SearchTxt").value = "";
  axios.get(URL).then(showTemperature);
}

//Get current location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    let message = "Geolocation is not supported by this browser.";
    let h1 = document.querySelector("h1");
    h1.innerHTML = message;
  }
}
function showCity(response) {
  let currentCity = response.data[0].name;
  let currentCountry = response.data[0].country;
  let message = `Weather in ${currentCity}, ${currentCountry}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = message;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${OWApiKey}&units=${units}`;
  startIt(apiURL);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let reversoGeoApiURL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${OWApiKey}`;
  axios.get(reversoGeoApiURL).then(showCity);
}

// Temperature display

function displayTemperatureFarenheit() {
  for (i = 0; i < 5; i++) {
    let selectorMax = document.querySelector(`#day${i + 1}Max`);
    let selectorMin = document.querySelector(`#day${i + 1}Min`);
    let messageMax = Math.round((forecast[i].temp.max * 9) / 5 + 32);
    let messageMin = Math.round((forecast[i].temp.min * 9) / 5 + 32);
    selectorMax.innerHTML = messageMax;
    selectorMin.innerHTML = messageMin;
  }
  let farenheitDegrees = Math.round((celsiusTemperature * 9) / 5 + 32);
  let showFarenheit = document.querySelector("#show-temp");
  let celsiusSelector = document.querySelector("#celsius-link");
  let farenheitSelector = document.querySelector("#farenheit-link");
  showFarenheit.innerHTML = farenheitDegrees;
  if (style === "day") {
    farenheitSelector.classList = "text-dark";
    celsiusSelector.classList = "link-secondary text-opacity-50";
  } else {
    farenheitSelector.classList = "text-light";
    celsiusSelector.classList = "link-secondary";
  }
}
function displayTemperatureCelsius() {
  for (i = 0; i < 5; i++) {
    let selectorMax = document.querySelector(`#day${i + 1}Max`);
    let selectorMin = document.querySelector(`#day${i + 1}Min`);
    let messageMax = Math.round(forecast[i].temp.max);
    let messageMin = Math.round(forecast[i].temp.min);
    selectorMax.innerHTML = messageMax;
    selectorMin.innerHTML = messageMin;
  }
  let showFarenheit = document.querySelector("#show-temp");
  let farenheitSelector = document.querySelector("#farenheit-link");
  let celsiusSelector = document.querySelector("#celsius-link");
  if (style === "day") {
    farenheitSelector.classList = "link-secondary text-opacity-50";
    celsiusSelector.classList = "text-dark";
  } else {
    farenheitSelector.classList = "link-secondary";
    celsiusSelector.classList = "text-light";
  }
  if (celsiusTemperature < 10) {
    showFarenheit.innerHTML = `${celsiusTemperature} `;
  } else {
    showFarenheit.innerHTML = celsiusTemperature;
  }
}

const inputCurrent = document.querySelector("#currentPosition");
inputCurrent.addEventListener("click", getLocation);

// Start website in London
startIt(
  `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${OWApiKey}&units=${units}`
);
