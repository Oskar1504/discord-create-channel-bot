const { createCanvas, loadImage } = require('canvas')
const fs = require("fs");

loadImage('images/axolhotl.png').then((image) => {
    const canvas = createCanvas(image.width, image.height)
    const ctx = canvas.getContext('2d')

    ctx.drawImage(image, 0,0)

    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync('images/ot2.png', buffer)
})
