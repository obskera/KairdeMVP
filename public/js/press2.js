//handle unpress simulate animation
// alert('connected')
let elements2 = document.querySelectorAll('.unpress2')
// if (!elements) { 
//   const elements = document.querySelectorAll('.unpress')
// }
// const dummy = document.getElementById('dummy')
Array.from(elements2).forEach(function(ele) {
  ele.addEventListener('click', () => {
    ele.style.color = 'black'
    setTimeout(() => {
      ele.style.color = 'white'
      // console.log('success!', ele)
    }, 200)
  })
});