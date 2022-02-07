import { UI, WEATHER } from './view.js';
import { dateConverter, timeConverter } from './converters.js';
import { searchCityName } from './main.js';
import { storage } from './storage.js';
import Cookies from 'js-cookie';

export function render(data, URL_ICON) {
  UI.CITY_NAME.forEach((item) => {
    item.textContent = data.name;
  });
  WEATHER.TEMPERATURE.textContent = `${Math.round(data.main.temp)}°`;
  WEATHER.ICON.src = `${URL_ICON}${data.weather[0].icon}@2x.png`;
  WEATHER.DETAILS.TEMPERATURE.textContent = `Temperature: ${Math.round(
    data.main.temp
  )}°`;
  WEATHER.DETAILS.FEELS_LIKE.textContent = `Feels like: ${Math.round(
    data.main.feels_like
  )}°`;
  WEATHER.DETAILS.WEATHER.textContent = `Weather: ${data.weather[0].main}`;
  WEATHER.DETAILS.SUNRISE.textContent = `Sunrise: ${timeConverter(
    data.sys.sunrise
  )}`;
  WEATHER.DETAILS.SUNSET.textContent = `Sunset: ${timeConverter(
    data.sys.sunset
  )}`;
  const ADDED_CITIES = document.querySelectorAll('.added-city');
  const isRepeatCity = Array.from(ADDED_CITIES).find(
    (city) => city.textContent === data.name
  );
  isRepeatCity
    ? UI.HEART.classList.add('now__btn_active')
    : UI.HEART.classList.remove('now__btn_active');
}
export function renderForecast(data, URL_ICON) {
  for (let item = 0; item <= 20; item++) {
    const dateUnix = data.list[item].dt;
    const time = timeConverter(dateUnix);
    const date = dateConverter(dateUnix);
    const temp = Math.round(data.list[item].main.temp);
    const feelsLike = Math.round(data.list[item].main.feels_like);
    const precipitation = data.list[item].weather[0].main;
    const weatherImg = data.list[item].weather[0].icon;
    const forecastItem = `<div class="forecast__weather-item">
    <p class="weather-timetable__date">${date}</p>
    <p class="weather-timetable__time">${time}</p>
    <p class="weather-timetable__temp">Temperature: ${temp}°<br>Feels like: ${feelsLike}°</p>
    <div class="wearher-timetable__precipitation">
      <p class="precipitation__title">${precipitation}</p>
      <img class="precipitation__img" src="${URL_ICON}${weatherImg}@2x.png" alt="${precipitation}">
    </div>
  </div>`;
    WEATHER.FORECAST.LIST.insertAdjacentHTML('beforeend', forecastItem);
  }
}
export function showSetCities() {
  const favoriteCities = storage.getFavoriteCities();
  if (favoriteCities) {
    UI.LOCATIONS_LIST.innerHTML = '';
    favoriteCities.forEach((item) => {
      const cityBlock = `<div class="cities__item"><p class="added-city">${item}</p><button class="cities__delete-btn" type="button"></button></div>`;
      UI.LOCATIONS_LIST.insertAdjacentHTML('afterbegin', cityBlock);
      const ADDED_CITIES = document.querySelectorAll('.added-city');
      const DELETE_BTNS = document.querySelectorAll('.cities__delete-btn');
      ADDED_CITIES.forEach((city) => city.addEventListener('click', tapToCity));
      DELETE_BTNS.forEach((btn) => btn.addEventListener('click', deleteCity));
    });
  }
}

// export function showCurrentCity() {
//   const currentCity = storage.getCurrentCity();
//   currentCity
//     ? (UI.SEARCH_INPUT.value = currentCity)
//     : (UI.SEARCH_INPUT.value = 'Moscow');
//   searchCityName();
// }

export function showCurrentCity() {
  const city = Cookies.get('currentCity');
  city ? (UI.SEARCH_INPUT.value = city) : (UI.SEARCH_INPUT.value = 'Moscow');
  searchCityName();
}

function tapToCity() {
  UI.SEARCH_INPUT.value = this.textContent;
  searchCityName();
}

function deleteCity() {
  const cityName = this.previousElementSibling.textContent;
  const favoriteCities = new Set(Array.from(storage.getFavoriteCities()));
  favoriteCities.delete(cityName);
  storage.saveFavoriteCities(favoriteCities);
  this.parentElement.remove();
  if (cityName === UI.NOW_CITY.textContent)
    UI.HEART.classList.remove('now__btn_active');
}
