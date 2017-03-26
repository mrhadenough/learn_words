/* globals $, window, localStorage */
const getCookie = (cname) => {
  let name = cname + '='
  const ca = document.cookie.split(';')
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length,c.length)
    }
  }
  return ''
}

const fitContentHeight = () => {
  const navbar = $('.navbar.navbar-default').height()
  const height = $(window).height()
  const sidebar = $('.sidebar-main').height()
  if (sidebar + navbar < height) {
    $('.sidebar-main').height(height - navbar)
  }
}

const setToLocalStore = (name, data) => ((typeof Storage !== 'undefined') ? localStorage.setItem(name, JSON.stringify(data)) || {} : {})
const getFromLocalStorage = name => ((typeof Storage !== 'undefined') ? JSON.parse(localStorage.getItem(name)) || {} : {})

export {
  getCookie,
  fitContentHeight,
  setToLocalStore,
  getFromLocalStorage,
}
