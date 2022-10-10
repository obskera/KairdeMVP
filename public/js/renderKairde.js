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

function getFieldInputs(f1, f2, f3, f4) {
    let info = new Map()
    info.set('name', f1 || 'Your Name')
    info.set('title', f2 || 'Your Title')
    info.set('phone', f3 || '0.000.0000')
    info.set('email', f4 || 'you@you.com')
    return info
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
}

function all() {
    convertCanvasToImageSmall()
    .then(item => {
        minify(item)
        .then(item2 => {
            download(item2)
        })
    })
}

async function convertCanvasToImageSmall() {
    const canvas = document.querySelector('canvas')
	let image = new Image();
    let src = await canvas.toDataURL("image/png");
    image.src = src
    return image

    console.log('image', image)
    
}
async function minify(src) {
    return await resizeImage(src, 0.321)
}
async function download(src) {
    let anchor = document.createElement("a");
    anchor.href = src
    anchor.download = "MyKairde.png";
    anchor.click();
}


async function resizeImage(imgToResize, resizingFactor = 0.5) {
  const canvas2 = document.createElement("canvas");
  const context = canvas2.getContext("2d");

  const originalWidth = imgToResize.width;
  const originalHeight = imgToResize.height;

  const canvasWidth = originalWidth * resizingFactor;
  const canvasHeight = originalHeight * resizingFactor;

  canvas2.width = canvasWidth;
  canvas2.height = canvasHeight;
    
  context.drawImage(
    imgToResize,
    0,
    0,
    originalWidth * resizingFactor,
    originalHeight * resizingFactor
  );

  return canvas2.toDataURL();
}
//downloads
let downloadHighRes = document.getElementById('downloadHighRes')
downloadHighRes.addEventListener('click', convertCanvasToImage)
let downloadBtn = document.querySelector('#downloadLowRes')
downloadBtn.addEventListener('click', all)


window.onload = function() {
    renderPreview(true);
};