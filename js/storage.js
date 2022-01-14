export const storage = {
saveFavoriteCities(citiesName) {
 return localStorage.setItem('citiesName', JSON.stringify(citiesName))
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