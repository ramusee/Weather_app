import { onTabClick } from './tabs.js'
import { UI, WEATHER } from './view.js'
import { render, renderForecast } from './render.js'
import { storage, setCities } from './storage.js'

const SERVER_URL = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'f660a2fb1e4bad108d6160b7f58c555f'
const METRIC = '&units=metric'
const URL_ICON = 'http://openweathermap.org/img/wn/'
const URL_FORECAST = 'https://api.openweathermap.org/data/2.5/forecast'

UI.TABS_BTN.forEach(onTabClick)
document.querySelector('.tabs__item-btn').click()

UI.SEARCH_BTN.addEventListener('click', searchCityName)

function searchCityName() {
  if (UI.SEARCH_INPUT.value.trim() !== '') {
    const cityName = UI.SEARCH_INPUT.value.trim()
    const urlWeather = `${SERVER_URL}?q=${cityName}&appid=${API_KEY}${METRIC}`
    fetch(urlWeather)
      .then((response) => response.json())
      .then((data) => {
        if (!data.name) {
          throw new Error(data.message)
        } else {
          render(data, URL_ICON)
          setForecast(cityName)
          storage.saveCurrentCity(cityName)
        }
      })
      .catch((error) => {
        alert(`Oops: ${error.message}`)
      })
    UI.FORM.reset()
  }
}

function setForecast(cityName) {
  const forecastUrl = `${URL_FORECAST}?q=${cityName}&appid=${API_KEY}${METRIC}`
  fetch(forecastUrl)
    .then((response) => response.json())
    .then((data) => {
      if (!data) {
        throw new Error(data.message)
      } else {
        WEATHER.FORECAST.LIST.textContent = ''
        renderForecast(data, URL_ICON)
      }
    })
    .catch((error) => `Oops: ${error.message}`)
}

UI.HEART.addEventListener('click', addFavoriteCity)

function addFavoriteCity() {
  const isValid = !UI.HEART.classList.contains('now__btn_active')
  if (isValid) {
    UI.HEART.classList.add('now__btn_active')
    const favoriteCities = new Set(storage.getFavoriteCities())
    favoriteCities.add(UI.NOW_CITY.textContent)
    storage.saveFavoriteCities(favoriteCities)
    showSetCities()
  }
}

function showSetCities() {
  const favoriteCities = storage.getFavoriteCities()
  if (favoriteCities) {
    UI.LOCATIONS_LIST.innerHTML = ''
    favoriteCities.forEach((item) => {
      const cityBlock = `<div class="cities__item"><p class="added-city">${item}</p><button class="cities__delete-btn" type="button"></button></div>`
      UI.LOCATIONS_LIST.insertAdjacentHTML('afterbegin', cityBlock)
      const ADDED_CITIES = document.querySelectorAll('.added-city')
      const DELETE_BTNS = document.querySelectorAll('.cities__delete-btn')
      ADDED_CITIES.forEach((city) => city.addEventListener('click', tapToCity))
      DELETE_BTNS.forEach((btn) => btn.addEventListener('click', deleteCity))
    })
  }
}
function showCurrentCities() {
  const currentCity = storage.getCurrentCity()
  if (currentCity) {
    UI.SEARCH_INPUT.value = currentCity
    UI.SEARCH_BTN.click()
  } else {
    UI.SEARCH_INPUT.value = 'Moscow'
    UI.SEARCH_BTN.click()
  }
}

function tapToCity() {
  UI.SEARCH_INPUT.value = this.textContent
  UI.SEARCH_BTN.click()
}

function deleteCity() {
  const cityName = this.previousElementSibling.textContent
  const favoriteCities = new Set(Array.from(storage.getFavoriteCities()))
  favoriteCities.delete(cityName)
  storage.saveFavoriteCities(favoriteCities)
  this.parentElement.remove()
  if (cityName === UI.NOW_CITY.textContent)
    UI.HEART.classList.remove('now__btn_active')
}
showSetCities()
showCurrentCities()
