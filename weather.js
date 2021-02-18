'use strict';

const COORDS_LS = 'coords';

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
    // getWeather();
  }
}

function init() {
  loadedCoords();
}

init();