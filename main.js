
// board
let blockSize = 90;
let rows = 7.5;
let cols = 9;
let board;
let context;

// DVD 
let dvdX = 233;
let dvdY = 77;
let dvdHeight = 23;
let dvdWidth = 23;

let velocityX = 7;
let velocityY = 7;
let color = 'blue';

window.addEventListener('load', e => {
    board = document.getElementById('board');
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext('2d'); // used for drawing on the board

    context.fillStyle='black';
    context.fillRect(0, 0, board.width, board.height);
    
    setInterval(update, 1000/180)
});

function update () {

    context.fillStyle = color;
    dvdX += velocityX;
    dvdY += velocityY;
    context.fillRect(dvdX, dvdY, dvdWidth, dvdHeight)
    color = getNextRainbowColor();

    changeDirection ()
}

function changeDirection () {
    if (dvdY + dvdHeight >= board.height || dvdY <= 0) {
        velocityY = -velocityY*1.01;
        velocityX = velocityX*1.01;
        console.log(velocityY)
    }
    if (dvdX + dvdWidth >= board.width || dvdX <= 0) {
        velocityX = -velocityX*1.01;
        velocityY = velocityY*1.01;
        console.log(velocityX)
    }
}


let currentHue = 0;

function getNextRainbowColor(step = 10) {
  currentHue = (currentHue + step) % 360;
  return hslToRgb(currentHue, 100, 50);
}

function hslToRgb(h, s, l) {
  h /= 360;
  s = parseInt(s) / 100;
  l = parseInt(l) / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;

}