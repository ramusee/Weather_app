import {UI, WEATHER} from './view.js'

export function onTabClick(currentBtn) {
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
