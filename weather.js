'use strict';

const weather = document.querySelector('.js-weather');
const API_KEY = '0f524b8d1307791128d17fcf97c23694';
const COORDS_LS = 'coords';

function getWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  ).then(function(response){
    return response.json()
  }).then(function(json) {
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = `${temperature} @ ${place}`;
  });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS_LS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  }
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log('can not access geo location');
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadedCoords() {
  const loadedCoords = localStorage.getItem(COORDS_LS);
  if(loadedCoords === null){
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadedCoords();
}

init();