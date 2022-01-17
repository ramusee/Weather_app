import { onTabClick } from './tabs.js'
import { UI, WEATHER } from './view.js'
import { render } from './render.js'
import { storage } from './storage.js'

const SERVER_URL = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'f660a2fb1e4bad108d6160b7f58c555f'
const METRIC = '&units=metric'
const URL_ICON = 'http://openweathermap.org/img/wn/'

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
          console.log(data)
          render(data, URL_ICON)
        }
      })
      .catch((error) => {
        alert(`Oops: ${error.message}`)
      })
    UI.FORM.reset()
  }
}

UI.HEART.addEventListener('click', addFavoriteCity)

function addFavoriteCity() {
  if (
    UI.NOW_CITY.textContent !== 'Location' &&
    !UI.HEART.classList.contains('now__btn_active')
  ) {
    const CITY_BLOCK = `<div class="cities__item"><p class="added-city">${UI.NOW_CITY.textContent}</p><button class="cities__delete-btn" type="button"></button></div>`
    UI.HEART.classList.add('now__btn_active')
    UI.LOCATIONS_LIST.insertAdjacentHTML('afterbegin', CITY_BLOCK)
    storage.saveFavoriteCities(CITY_BLOCK)
    console.log(CITY_BLOCK)
  }
  const ADDED_CITIES = document.querySelectorAll('.added-city')
  ADDED_CITIES.forEach((city) => city.addEventListener('click', tapToCity))
  const DELETE_BTNS = document.querySelectorAll('.cities__delete-btn')
  DELETE_BTNS.forEach((btn) => btn.addEventListener('click', deleteCity))
}

function tapToCity() {
  UI.SEARCH_INPUT.value = this.textContent
  UI.SEARCH_BTN.click()
}

function deleteCity() {
  this.parentElement.remove()
}
