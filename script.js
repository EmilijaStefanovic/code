const datePlacement = document.querySelector('#date');
const searchForm = document.querySelector('#search-form');
let currentLocationButton = document.querySelector('#current-location-button');

let currentTime = new Date();
let cityInput = document.querySelector('#city-input');
let h1ForCity = document.querySelector('#city');
const apiKey = '2bd326a60dc89a53287e446e819664df';

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}

function postWeather(response) {
  let name = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let humidity = +response.data.main.humidity;
  let wind = +response.data.wind.speed;

  const description1 =
    description.charAt(0).toUpperCase() + description.slice(1);

  const cityArr = name.split(' ');
  for (let i = 0; i < cityArr.length; i++) {
    cityArr[i] = cityArr[i].charAt(0).toUpperCase() + cityArr[i].slice(1);
  }
  const city2 = cityArr.join(' ');
  h1ForCity.innerHTML = city2;
  document.getElementById('temperature').innerHTML = temperature;
  document.getElementById('description').innerHTML = description1;
  document.getElementById('humidity').innerHTML = humidity;
  document.getElementById('wind').innerHTML = wind;
}

function postData(event) {
  event.preventDefault();
  const city = cityInput.value;
  const cityArr = city.split(' ');
  for (let i = 0; i < cityArr.length; i++) {
    cityArr[i] = cityArr[i].charAt(0).toUpperCase() + cityArr[i].slice(1);
  }
  const city2 = cityArr.join(' ');
  h1ForCity.innerHTML = city2;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(url).then(postWeather);
  cityInput.value = '';
}

function searchLocation(position) {
  let apiKey = '5f472b7acba333cd8a035ea85a0d4d4c';
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(postWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

datePlacement.innerHTML = formatDate(currentTime);
searchForm.addEventListener('submit', postData);
currentLocationButton.addEventListener('click', getCurrentLocation);
