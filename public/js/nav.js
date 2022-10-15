//handle unpress simulate animation
const elements = document.querySelectorAll('.unpress')
const dummy = document.getElementById('dummy')
Array.from(elements).forEach(function(ele) {
  ele.addEventListener('click', () => {
    ele.style.color = 'black'
    setTimeout(() => {
      ele.style.color = 'white'
      // console.log('success!', ele)
    }, 200)
  })
});