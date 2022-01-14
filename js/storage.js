export const storage = {
saveFavoriteCities(cities) {
 return localStorage.setItem('cityName', JSON.stringify(cities))
},
getFavoriteCities(){
  return JSON.parse(localStorage.getItem('cityName'))
},
saveCurrentCities(currentCity) {
  return localStorage.setItem('currentCity', JSON.stringify(currentCity))
},
getCurrentCities() {
  return JSON.parse(localStorage.getItem('currentCity'))
}
}