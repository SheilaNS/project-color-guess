function randomNumber() {
  const number = Math.floor(Math.random() * 256);
  return number;
}

function newColor() {
  const rgbNumber1 = randomNumber();
  const rgbNumber2 = randomNumber();
  const rgbNumber3 = randomNumber();
  const newBackColor = `rgb( ${rgbNumber1} , ${rgbNumber2} , ${rgbNumber3} )`;
  return newBackColor;
}

function colorGenerate() {
  const colorSpots = document.querySelectorAll('.ball');
  for (let i = 0; i < colorSpots.length; i += 1) {
    const soptColor = document.getElementById(`color${[i + 1]}`);
    soptColor.style.backgroundColor = newColor();
  }
}

window.onload = colorGenerate;
