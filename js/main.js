import {UI, WEATHER} from './view.js'
import {render} from './render.js'
import {storage} from './storage.js'
UI.TABS_BTN.forEach(onTabClick)

function onTabClick(currentBtn) {
  currentBtn.addEventListener('click', changeTab)
  function changeTab() {
    const tabId = currentBtn.getAttribute('data-tab')
    const currentTab = document.querySelector(tabId)
    if (!currentBtn.classList.contains('active')) {
      UI.TABS_BTN.forEach((item) => item.classList.remove('active'))
      UI.TABS_BLOCK.forEach((item) => item.classList.remove('active'))
      currentBtn.classList.add('active')
      currentTab.classList.add('active')
    }
  }
}
document.querySelector('.tabs__item-btn').click()

UI.SEARCH_BTN.addEventListener('click', changeCityName)

function changeCityName() {
  if (UI.SEARCH_INPUT.value.trim() !== '') {
    const cityName = UI.SEARCH_INPUT.value.trim()
    const serverUrl = 'https://api.openweathermap.org/data/2.5/weather'
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f'
    const metric = '&units=metric'
    const urlWeather = `${serverUrl}?q=${cityName}&appid=${apiKey}${metric}`
    const urlIcon = 'http://openweathermap.org/img/wn/'
    fetch(urlWeather)
      .then((response) => response.json())
      .then((data) => {
        if (!data.name) {
          throw new Error(data.message)
        } else {
          render(data, urlIcon)
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
    UI.HEART.classList.add('now__btn_active')
    UI.LOCATIONS_LIST.insertAdjacentHTML(
      'afterbegin',
      `<div class="cities__item"><p class="added-city">${UI.NOW_CITY.textContent}</p><button class="cities__delete-btn" type="button"></button></div>`
    )
  }
  const deleteBtns = document.querySelectorAll('.cities__delete-btn')
  deleteBtns.forEach((btn) => btn.addEventListener('click', deleteCity))
  
}

function deleteCity() {
  this.parentElement.remove()
}