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

let downloadBtn = document.querySelector('#downloadLowRes')
downloadBtn.addEventListener('click', all)
