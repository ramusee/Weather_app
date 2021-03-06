import { onTabClick } from './tabs.js';
import { UI, WEATHER } from './view.js';
import {
  render,
  renderForecast,
  showSetCities,
  showCurrentCity,
} from './render.js';
import { storage } from './storage.js';
import Cookies from 'js-cookie';

const URL = {
  WEATHER_SERVER: 'https://api.openweathermap.org/data/2.5/weather',
  API_KEY: 'f660a2fb1e4bad108d6160b7f58c555f',
  METRIC: '&units=metric',
  ICONS: 'https://openweathermap.org/img/wn/',
  FORECAST_SERVER: 'https://api.openweathermap.org/data/2.5/forecast',
};

UI.TABS_BTN.forEach(onTabClick);
document.querySelector('.tabs__item-btn').click();

UI.SEARCH_BTN.addEventListener('click', searchCityName);

export function searchCityName() {
  if (UI.SEARCH_INPUT.value.trim() !== '') {
    const cityName = UI.SEARCH_INPUT.value.trim();
    const urlWeather = `${URL.WEATHER_SERVER}?q=${cityName}&appid=${URL.API_KEY}${URL.METRIC}`;
    fetch(urlWeather)
      .then((response) => response.json())
      .then((data) => {
        if (!data.name) {
          throw new Error(data.message);
        } else {
          render(data, URL.ICONS);
          setForecast(cityName);
          // storage.saveCurrentCity(cityName);
          const inOneHour = 1 / 24;
          Cookies.set('currentCity', cityName, { expires: inOneHour });
        }
      })
      .catch((error) => {
        alert(`Oops: ${error.message}`);
      });
    UI.FORM.reset();
  }
}

async function setForecast(cityName) {
  const forecastUrl = `${URL.FORECAST_SERVER}?q=${cityName}&appid=${URL.API_KEY}${URL.METRIC}`;
  const response = await fetch(forecastUrl);
  const data = await response.json();
  WEATHER.FORECAST.LIST.textContent = '';
  renderForecast(data, URL.ICONS);
}

UI.HEART.addEventListener('click', addFavoriteCity);

function addFavoriteCity() {
  const isValid = !UI.HEART.classList.contains('now__btn_active');
  if (isValid) {
    UI.HEART.classList.add('now__btn_active');
    const favoriteCities = new Set(storage.getFavoriteCities());
    favoriteCities.add(UI.NOW_CITY.textContent);
    storage.saveFavoriteCities(favoriteCities);
    showSetCities();
  } else {
    const favoriteCities = new Set(storage.getFavoriteCities());
    favoriteCities.delete(UI.NOW_CITY.textContent);
    storage.saveFavoriteCities(favoriteCities);
    showSetCities();
    UI.HEART.classList.remove('now__btn_active');
  }
}

showSetCities();
showCurrentCity();
