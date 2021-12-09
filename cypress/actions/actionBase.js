const colorsEqual = (color1, color2) => (
  color1.every((value, index) => value === color2[index])
);

export function extractScore(score) {
  if (!score) return null;
  const match = score.text().match(/\d+/);
  if (!match) return null;
  return Number(match[0]);
}

export function score() {
  const $score = Cypress.$('#score');
  if (!$score) return null;
  const match = $score.text().match(/\d+/);
  if (!match) return null;
  return Number(match[0]);
}

export function rightBall() {
  const colorRGBValue = Cypress.$('#rgb-color').text().match(/\d+/g);
  const ball = Array.from(Cypress.$('.ball')).find((ball) => {
    const ballRGBValue = Cypress.$(ball).css('background-color').match(/\d+/g);
    return colorsEqual(colorRGBValue, ballRGBValue);
  });
  return cy.wrap(ball);
}

export function wrongBall() {
  const colorRGBValue = Cypress.$('#rgb-color').text().match(/\d+/g);
  const ball = Array.from(Cypress.$('.ball')).find((ball) => {
    const ballRGBValue = Cypress.$(ball).css('background-color').match(/\d+/g);
    return !colorsEqual(colorRGBValue, ballRGBValue);
  });
  return cy.wrap(ball);
}
