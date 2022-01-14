import {UI, WEATHER} from './view.js'
export function render(data, urlIcon) {
  UI.CITY_NAME.forEach((item) => {item.textContent = data.name })
  console.log(data)
  WEATHER.TEMPERATURE.textContent =  `${Math.round(data.main.temp)}°`
  WEATHER.ICON.src = `${urlIcon}${data.weather[0].icon}@2x.png`
  WEATHER.DETAILS.TEMPERATURE.textContent = `Temperature: ${Math.round(data.main.temp)}°`
  WEATHER.DETAILS.FEELS_LIKE.textContent = `Feels like: ${Math.round(data.main.feels_like)}°`
  WEATHER.DETAILS.WEATHER.textContent = `Weather: ${data.weather[0].main}`
  const ADDED_CITIES = document.querySelectorAll('.added-city')
  const isRepeatCity = Array.from(ADDED_CITIES).find(
    (city) => city.textContent === data.name
  )
  isRepeatCity
    ? UI.HEART.classList.add('now__btn_active')
    : UI.HEART.classList.remove('now__btn_active')
}