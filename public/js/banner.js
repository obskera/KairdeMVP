let defBanner = document.getElementById('needCookiesBanner')
let cookiesAcceptedBanner = document.getElementById('registerBanner')
const cookiesCheckBanner = window.localStorage.getItem('cookies')
// alert(cookiesCheckBanner)
if (cookiesCheckBanner === 'accept') {
    defBanner.style.display = 'none'
    cookiesAcceptedBanner.style.display = 'block'
} 