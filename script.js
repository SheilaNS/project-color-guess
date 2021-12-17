function randomNumberColor() {
  const number = Math.floor(Math.random() * 256);
  return number;
}

function randomNumberText() {
  const text = Math.floor(Math.random() * 6 + 1);
  return text;
}

function createText() {
  const guessText = document.getElementById('rgb-color');
  const colorNumber = randomNumberText();
  const spotColor = document.getElementById(`color${colorNumber}`);
  guessText.innerText = spotColor.style.backgroundColor;
}

function newColor() {
  const rgbNumber1 = randomNumberColor();
  const rgbNumber2 = randomNumberColor();
  const rgbNumber3 = randomNumberColor();
  const newBackColor = `rgb( ${rgbNumber1} , ${rgbNumber2} , ${rgbNumber3} )`;
  return newBackColor;
}

function colorGenerate() {
  const colorSpots = document.querySelectorAll('.ball');
  for (let i = 0; i < colorSpots.length; i += 1) {
    const spotColor = document.getElementById(`color${[i + 1]}`);
    spotColor.style.backgroundColor = newColor();
  }
  createText();
  const answer = document.getElementById('answer');
  answer.innerText = 'Escolha uma cor';
}

window.onload = colorGenerate;

function pickColor(event) {
  const textColor = document.getElementById('rgb-color').innerText;
  const chosenColor = event.target.style.backgroundColor;
  const answer = document.getElementById('answer');
  if (textColor === chosenColor) {
    const placar = document.getElementById('score');
    answer.innerText = 'Acertou!';
    placar.innerText = parseInt(placar.innerText, 10) + 3;
  } else {
    answer.innerText = 'Errou! Tente novamente!';
  }
}

const pickSpot = document.querySelectorAll('.ball');
for (let i = 0; i < pickSpot.length; i += 1) {
  pickSpot[i].addEventListener('click', pickColor);
}

const reset = document.getElementById('reset-game');
reset.addEventListener('click', colorGenerate);
