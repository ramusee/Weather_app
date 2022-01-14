export const UI = {
  TABS_BTN: document.querySelectorAll('.tabs__item-btn'),
  TABS_BLOCK: document.querySelectorAll('.tabs__block'),
  SEARCH_INPUT: document.querySelector('.search__input'),
  SEARCH_BTN: document.querySelector('.search__btn'),
  CITY_NAME: document.querySelectorAll('.city-name'),
  FORM: document.querySelector('.weather__search'),
  HEART: document.querySelector('.now__btn_heart'),
  LOCATIONS_LIST: document.querySelector('.cities__list'),
  ADDED_CITIES: document.querySelectorAll('.added-city'),
  NOW_CITY: document.querySelector('.now__city'),
}
export const WEATHER = {
  TEMPERATURE: document.querySelector('.now__temperature'),
  ICON: document.querySelector('.now__img'),
  DETAILS: {
    TEMPERATURE: document.querySelector('.details__item.temp'),
    FEELS_LIKE: document.querySelector('.details__item.feels-like'),
    WEATHER: document.querySelector('.details__item.details-weather'),
    SUNRISE: document.querySelector('.details__item.sunrise'),
    SUNSET: document.querySelector('.details__item.sunset'),
  },
}
