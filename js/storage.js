export const storage = {
saveFavoriteCities(cities) {
 return localStorage.setItem('cityName', JSON.stringify(cities))
},
getFavoriteCities(){
  return JSON.parse(localStorage.getItem('cityName'))
},
saveCurrentCity(currentCity) {
  return localStorage.setItem('currentCity', JSON.stringify(currentCity))
},
getCurrentCity() {
  return JSON.parse(localStorage.getItem('currentCity'))
}
}