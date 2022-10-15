// const { render } = require("ejs")

function onChangeEmail() {
    let value = document.getElementById('ddlViewByEmail').value
    const nameTarget = document.getElementById('email')
    if(value !== 'Use Saved Info') {
      nameTarget.value = value
    } else {
      nameTarget.value = ''
    }
    renderPreview(false)
}
const nameFielder = document.getElementById('name')
nameFielder.addEventListener('change', () => {
  renderPreview(false)
})



function onChangePhone() {
    let value = document.getElementById('ddlViewByPhone').value
    const nameTarget = document.getElementById('phone')
    if(value !== 'Use Saved Info') {
      nameTarget.value = value
    } else {
      nameTarget.value = ''
    }
    renderPreview(false)
}
const phoneFielder = document.getElementById('phone')
nameFielder.addEventListener('change', () => {
  renderPreview(false)
})

function onChangeTitle() {
    let value = document.getElementById('ddlViewByTitle').value
    const nameTarget = document.getElementById('title')
    nameTarget.value = value
    renderPreview(false)
}
const titleFielder = document.getElementById('title')
nameFielder.addEventListener('change', () => {
  renderPreview(false)
})

function onChangeName() {
    let value = document.getElementById('ddlViewByName').value
    const nameTarget = document.getElementById('name')
    if(value !== 'Use Saved Info') {
        nameTarget.value = value
    } else {
        nameTarget.value = ''
    }
    renderPreview(false)
}
const emailFielder = document.getElementById('email')
nameFielder.addEventListener('change', () => {
  renderPreview(false)
})

//HANDLE CLICKS ON MOBILE TO ENSURE NO STICKY BUTTONS
// const elements = document.querySelectorAll('.unpress')
// const dummy = document.getElementById('dummy')
// Array.from(elements).forEach(function(ele) {
//   ele.addEventListener('click', () => {
//     ele.style.color = 'black'
//     setTimeout(() => {
//       ele.style.color = 'white'
//       // console.log('success!', ele)
//     }, 200)
//   })
// });