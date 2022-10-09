// const { render } = require("ejs")
const previewBtn = document.getElementById('preview')
previewBtn.addEventListener('click', () => {
    renderPreview(false)
})

// let showPreview = true
//field font sizes
let nameSize = 115
let titleSize = 60
let phoneSize = 60
let emailSize = 75

//field font justification ['left', 'center', 'right']
let nameJust = 'center'
let titleJust = 'center'
let phoneJust = 'left'
let emailJust = 'left'

//field vertical spacing
let nameVert = 150
let titleVert = 275
let phoneVert = 450
let emailVert = 550

//--------//event listeners//--------//
//Plus/Minus
let nameSmaller = document.getElementById('nameMinus')
nameSmaller.addEventListener('click', () => {
    nameSize--
    renderPreview()
})
let nameBigger = document.getElementById('namePlus')
nameBigger.addEventListener('click', () => { 
    nameSize++ 
    renderPreview()
})

let titleSmaller = document.getElementById('titleMinus')
titleSmaller.addEventListener('click', () => {
    titleSize--
    renderPreview()
})
let titleBigger = document.getElementById('titlePlus')
titleBigger.addEventListener('click', () => { 
    titleSize++ 
    renderPreview()
})

let phoneSmaller = document.getElementById('phoneMinus')
phoneSmaller.addEventListener('click', () => {
    phoneSize--
    renderPreview()
})
let phoneBigger = document.getElementById('phonePlus')
phoneBigger.addEventListener('click', () => { 
    phoneSize++ 
    renderPreview()
})
let emailSmaller = document.getElementById('emailMinus')
emailSmaller.addEventListener('click', () => {
    emailSize--
    renderPreview()
})
let emailBigger = document.getElementById('emailPlus')
emailBigger.addEventListener('click', () => { 
    emailSize++ 
    renderPreview()
})
//Justification Radios
//->Name
let nameJustifyLeft = document.getElementById('nameLeft')
nameJustifyLeft.addEventListener('click', () => { 
    console.log('left')
    nameJust = 'left'
    renderPreview()
})
let nameJustifyCenter = document.getElementById('nameCenter')
nameJustifyCenter.addEventListener('click', () => { 
    console.log('center')
    nameJust = 'center'
    renderPreview()
})
let nameJustifyRight = document.getElementById('nameRight')
nameJustifyRight.addEventListener('click', () => { 
    console.log('right')
    nameJust = 'right'
    renderPreview()
})
//->title
let titleJustifyLeft = document.getElementById('titleLeft')
titleJustifyLeft.addEventListener('click', () => { 
    console.log('left')
    titleJust = 'left'
    renderPreview()
})
let titleJustifyCenter = document.getElementById('titleCenter')
titleJustifyCenter.addEventListener('click', () => { 
    console.log('center')
    titleJust = 'center'
    renderPreview()
})
let titleJustifyRight = document.getElementById('titleRight')
titleJustifyRight.addEventListener('click', () => { 
    console.log('right')
    titleJust = 'right'
    renderPreview()
})
//-> phone
let phoneJustifyLeft = document.getElementById('phoneLeft')
phoneJustifyLeft.addEventListener('click', () => { 
    console.log('left')
    phoneJust = 'left'
    renderPreview()
})
let phoneJustifyCenter = document.getElementById('phoneCenter')
phoneJustifyCenter.addEventListener('click', () => { 
    console.log('center')
    phoneJust = 'center'
    renderPreview()
})
let phoneJustifyRight = document.getElementById('phoneRight')
phoneJustifyRight.addEventListener('click', () => { 
    console.log('right')
    phoneJust = 'right'
    renderPreview()
})
//-> email
let emailJustifyLeft = document.getElementById('emailLeft')
emailJustifyLeft.addEventListener('click', () => { 
    console.log('left')
    emailJust = 'left'
    renderPreview()
})
let emailJustifyCenter = document.getElementById('emailCenter')
emailJustifyCenter.addEventListener('click', () => { 
    console.log('center')
    emailJust = 'center'
    renderPreview()
})
let emailJustifyRight = document.getElementById('emailRight')
emailJustifyRight.addEventListener('click', () => { 
    console.log('right')
    emailJust = 'right'
    renderPreview()
})
//--//Download Buttons
//->High Res.
let downloadHighRes = document.getElementById('downloadHighRes')
downloadHighRes.addEventListener('click', convertCanvasToImage)

function getDefaultInputs() {
    // const name = document.getElementById('name').value
    // const title = document.getElementById('title').value
    // const phone = document.getElementById('phone').value
    // const email = document.getElementById('email').value
    // if (name || title || phone || email) {
    //     getInputs()
    // } else {
        let info = new Map()
        info.set('name', 'Your Name')
        info.set('title', 'Your Title')
        info.set('phone', '0.000.0000')
        info.set('email', 'You@email.com')
        return info
    // }
}
function getInputs() {
    let info = new Map()
    const name = document.getElementById('name').value
    const title = document.getElementById('title').value
    const phone = document.getElementById('phone').value
    const email = document.getElementById('email').value
    if (!name && !title && !phone && !email) {
        info.set('name', 'Your Name')
        info.set('title', 'Your Title')
        info.set('phone', '0.000.0000')
        info.set('email', 'You@email.com')
        return info
    } else {
        info.set('name', document.getElementById('name').value || '')
        info.set('title', document.getElementById('title').value || '')
        info.set('phone', document.getElementById('phone').value || '')
        info.set('email', document.getElementById('email').value || '')
        return info
    }
 
}
function renderPreview(renderDefaultBool) {
    //font
    const font = (size, name) => `${size}px ${name}`
    const justification = (type) => {
        setting = {}
        if (type === 'left') { 
            setting.anchor = 75 
            setting.justify = 'left'
        } else if (type === 'center') {
            setting.anchor = 525 
            setting.justify = 'center'
        } else if (type === 'right') {
            setting.anchor = 975 
            setting.justify = 'right'
        } else { return }
        return setting
    }

    //get font inputs size + type for each field
    const size = 90
    const type = 'Sans Serif'

    //line spacing == grab vertical value modifiers?
    const l1 = 150
    const l2 = l1 + 125
    const l3 = l2 + 175
    const l4 = l3 + 100

    //colors
    const primary = '#CEDAE3'
    const secondary = '#1F1F1F'
    // const tertiary = '#333333'
    //get input values as a map
    const info = !renderDefaultBool ? getInputs() : getDefaultInputs()
    //setup canvas
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");
    //fill canvas bg
    ctx.fillStyle = secondary
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //draw name line
    const nameSetting = justification(nameJust)
    ctx.fillStyle = primary
    ctx.font = font(nameSize, type);
    ctx.textAlign = nameSetting.justify
    ctx.fillText(info.get('name'), nameSetting.anchor, nameVert);

    //draw title line
    const titleSetting = justification(titleJust)
    ctx.fillStyle = primary
    ctx.font = font(titleSize, type);
    ctx.textAlign = titleSetting.justify
    ctx.fillText(info.get('title'), titleSetting.anchor, titleVert);

    //draw phone line
    const phoneSetting = justification(phoneJust)
    ctx.fillStyle = primary
    ctx.font = font(phoneSize, type);
    ctx.textAlign = phoneSetting.justify
    ctx.fillText(info.get('phone'), phoneSetting.anchor, phoneVert);

    //draw email line
    const emailSetting = justification(emailJust)
    ctx.fillStyle = primary
    ctx.font = font(emailSize, type);
    ctx.textAlign = emailSetting.justify
    ctx.fillText(info.get('email'), emailSetting.anchor, emailVert);
}

function convertCanvasToImage() {
    const canvas = document.querySelector('canvas')
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image.src
    anchor.download = "MyKairde.png";
    anchor.click();
    // let img = document.getElementById('imgCont')
    // image.style.width = '336px'
    // image.style.height = '192px'
    // img.appendChild(image)
	//return image;
}

async function postKairde() {
    renderPreview(false)
    const canvas = document.querySelector('canvas')
	// var image = new Image();
	const dataUrl = canvas.toDataURL("image/png");
    const share = document.getElementById('share').checked
    console.log(share)
    let data = {
        dataURL: dataUrl,
        caption: 'Made with Kairde Contact',
        tool: 'contact',
        share: share

    };
    fetch("/post/saveKairde", {
    method: "POST",
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify(data)
    }).then(res => {
    console.log("Request complete! response:", res);
    alert('Change this later: Kairde saved!')
    });
}
const postKairdeButton = document.getElementById('saveKairde')
if (postKairdeButton) {
    postKairdeButton.addEventListener('click', postKairde)
}

// function downloadDefault() {
//     let anchor = document.createElement("a");
//     let img = document.getElementById('resizedImage')
//     anchor.href = img.src
//     anchor.download = "IMAGE.jpg";
//     anchor.click();
// }
window.onload = function() {
    renderPreview(true);
  };