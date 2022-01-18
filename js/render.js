import {UI, WEATHER} from './view.js'
import { timeConverter, dateConverter } from './main.js'
export function render(data, URL_ICON) {
  UI.CITY_NAME.forEach((item) => { item.textContent = data.name })
  WEATHER.TEMPERATURE.textContent =  `${Math.round(data.main.temp)}°`
  WEATHER.ICON.src = `${URL_ICON}${data.weather[0].icon}@2x.png`
  WEATHER.DETAILS.TEMPERATURE.textContent = `Temperature: ${Math.round(data.main.temp)}°`
  WEATHER.DETAILS.FEELS_LIKE.textContent = `Feels like: ${Math.round(data.main.feels_like)}°`
  WEATHER.DETAILS.WEATHER.textContent = `Weather: ${data.weather[0].main}`
  WEATHER.DETAILS.SUNRISE.textContent = `Sunrise: ${timeConverter(data.sys.sunrise)}`
  WEATHER.DETAILS.SUNSET.textContent = `Sunset: ${timeConverter(data.sys.sunset)}`
  const ADDED_CITIES = document.querySelectorAll('.added-city')
  const isRepeatCity = Array.from(ADDED_CITIES).find(
    (city) => city.textContent === data.name
  )
  isRepeatCity
    ? UI.HEART.classList.add('now__btn_active')
    : UI.HEART.classList.remove('now__btn_active')
}
export function renderForecast(data, URL_ICON) {
  for (let item = 0; item <= 20; item++) {
    const dateUnix = data.list[item].dt
    const time = timeConverter(dateUnix)
    const date = dateConverter(dateUnix)
    const temp = Math.round(data.list[item].main.temp)
    const feelsLike = Math.round(data.list[item].main.feels_like)
    const precipitation = data.list[item].weather[0].main
    const weatherImg = data.list[item].weather[0].icon
    const forecastItem = `<div class="forecast__weather-item">
    <p class="weather-timetable__date">${date}</p>
    <p class="weather-timetable__time">${time}</p>
    <p class="weather-timetable__temp">Temperature: ${temp}°<br>Feels like: ${feelsLike}°</p>
    <div class="wearher-timetable__precipitation">
      <p class="precipitation__title">${precipitation}</p>
      <img class="precipitation__img" src="${URL_ICON}${weatherImg}@2x.png" alt="${precipitation}">
    </div>
  </div>`
    WEATHER.FORECAST.LIST.insertAdjacentHTML('beforeend', forecastItem)
  }
}