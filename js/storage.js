export const storage = {
  saveFavoriteCities(cities) {
    return localStorage.setItem(
      'favoriteCities',
      JSON.stringify(Array.from(cities))
    );
  },
  getFavoriteCities() {
    return JSON.parse(localStorage.getItem('favoriteCities'));
  },
  saveCurrentCity(currentCity) {
    return localStorage.setItem('currentCity', JSON.stringify(currentCity));
  },
  getCurrentCity() {
    return JSON.parse(localStorage.getItem('currentCity'));
  },
};
