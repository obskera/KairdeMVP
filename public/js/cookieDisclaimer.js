let disclaimer = document.querySelector(".cookie-disclaimer");
let cookies = window.localStorage.getItem('cookies');
if (!cookies) { fade('in', 500, disclaimer) }

function showCookieDisclaimer() {
  fade('in', 500, disclaimer);
}

function hideCookieDisclaimer() {
  fade("out", 500, disclaimer);
}

// disclaimer was accepted
let acceptBtn = document.querySelector(".cookie-disclaimer__button_accept")
acceptBtn.addEventListener("click", function() {
  window.localStorage.setItem('cookies', 'accept');
  hideCookieDisclaimer();
  const cookiesCheck = window.localStorage.getItem('cookies');
  setButtons(cookiesCheck)
  
  // activate cookies
  // [...]
});

// disclaimer was denied
let denyBtn = document.querySelector(".cookie-disclaimer__button_deny")
denyBtn.addEventListener("click", function() {
  window.localStorage.setItem('cookies', 'deny');
  hideCookieDisclaimer();
  // const cookiesCheck = window.localStorage.getItem('cookies');
  // setButtons()
  window.location.replace("/logout");
});

async function fade(type, ms, el) {
var isIn = type === 'in',
  opacity = isIn ? 0 : 1,
  interval = 50,
  duration = ms,
  gap = interval / duration;

if(isIn) {
  el.style.display = 'inline';
  el.style.opacity = opacity;
}

function func() {
  opacity = isIn ? opacity + gap : opacity - gap;
  el.style.opacity = opacity;

  if(opacity <= 0) el.style.display = 'none'
  if(opacity <= 0 || opacity >= 1) window.clearInterval(fading);
}

var fading = window.setInterval(func, interval);
}
async function setButtons() {
      const cookiesCheck = window.localStorage.getItem('cookies');
      const registerBtn = document.getElementById('registerBtn')
      const loginBtn = document.getElementById('loginBtn')
      //  console.log(cookiesCheck != 'deny')
       if (cookiesCheck !== 'deny' && registerBtn && loginBtn) {
           console.log('mmmm cookies')
           registerBtn.style.display = 'flex'
           loginBtn.style.display = 'flex'
       } else if (registerBtn && loginBtn){
          registerBtn.style.display = 'none'
           loginBtn.style.display = 'none'
           console.log('no Cookies for YOU')
       }
      //  setTimeout(() => {
      //   window.location.reload()
      //   }, 1000) 
   }