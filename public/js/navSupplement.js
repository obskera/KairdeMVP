alert('link')
const cookiesDisclaimerButton = document.getElementById("cookiesDisclaimerButton")
cookiesDisclaimerButton.addEventListener('click', _ => {
    fade('in', 500, disclaimer)
})