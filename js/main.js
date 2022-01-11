import { UI } from './view.js'

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
    UI.HEART.classList.remove('now__btn_active')
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather'
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f'
    const metric = '&units=metric'
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}${metric}`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (!data.name) {
          throw new Error(data.message)
        } else {
          UI.CITY_NAME.forEach((item) => {
            item.textContent = data.name
          })
        }
      })
      .catch((error) => alert(`Oops: ${error.message}`))
  }
  UI.FORM.reset()
}

UI.HEART.addEventListener('click', addFavoriteCity)

function addFavoriteCity() {
  UI.HEART.classList.toggle('now__btn_active')
  const favoriteCity = document.querySelector('.now__city')
  UI.SELECTED_CITY.forEach((item) => {
    // if()
    item.textContent = favoriteCity.textContent
  })
}
