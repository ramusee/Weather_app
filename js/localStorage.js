export const storage = {
saveFavoriteCities(cityName) {
 return localStorage.setItem('cityName', JSON.stringify(cityName))
},
getFavoriteCities(){
  return JSON.parse(localStorage.getItem('cityName'))
},
saveCurrentCities(currentCity) {
  return localStorage.setItem('currentCity', JSON.stringify())
},
}