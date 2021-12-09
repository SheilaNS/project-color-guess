import {
  wrongBall,
  rightBall,
  score,
} from '../actions/actionBase';

describe('1 - Adicione no seu site um título com o nome do seu jogo', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  it('Será verificado se o **id** do título é `title`', () => {
    cy.get('#title').invoke('text').should('not.be.empty');
  });
});

describe('2 - Adicione um texto com o código RGB a ser adivinhado', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  it('Será verificado se o seu id deve ser rgb-color', () => {
    cy.get('#rgb-color').should('exist');
  });

  it('Será verificado se o texto deve conter os três números das cores RGB a ser adivinhada, no seguinte formato: `(168, 34, 1)`', () => {
    const rgbTextRegex = /\((\s*\d{1,3}\s*,){2}\s*\d{1,3}\s*\)/;
    cy.get('#rgb-color')
      .invoke('text')
      .should('match', rgbTextRegex);
  });
});

describe('3 - Adicione a página opções de cores para serem adivinhadas', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  it('Será verificado que deve conter 6 circulos como opção de cor de adivinhação', () => {
    cy.get('.ball')
      .should('have.length', 6)
      .each((ball) => {
        expect(ball.height())
          .to.equal(ball.width());
        expect(ball.css('border-radius'))
          .not.to.be.empty;
      });
  });

  it('Será verificado que a class de todos os circulos deve ser ball', () => {
    cy.get('.ball').should('exist');
  });
});

describe('4 - Adicione cores nas bolas elas devem ser geradas dinâmicamente', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  it('Será verificado que ao carregar a página, as cores de cada um dos 6 circulos coloridos deve ser geradas via JavaScript', () => {
    let currentBallColors; let
      previousBallColors;

    cy.get('.ball').then((balls) => {
      previousBallColors = Array.from(balls).map((ball) => (
        Cypress.$(ball).css('background-color')
      ));

      for (let i = 0; i < 5; i += 1) {
        cy.reload();
        cy.get('.ball').should((balls) => {
          currentBallColors = Array.from(balls).map((ball) => (
            Cypress.$(ball).css('background-color')
          ));

          expect(currentBallColors).not.to.deep.equal(previousBallColors);
          previousBallColors = currentBallColors;
        });
      }
    });
  });
});

describe('5 - Clicar em um circulo colorido, deve ser mostrado um texto indicando se está correto', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  it('Será verificado que o seu **id** do elemento deve ser `answer`', () => {
    cy.get('#answer').should('exist');
  });

  it('Será verificado que quando o jogo é iniciado, o texto exibido deve ser `"Escolha uma cor"`', () => {
    cy.get('#answer').invoke('text').should('match', /Escolha uma cor/);
  });

  it('Será verificado se o circulo colorido for o **correto**, deve ser exibido o texto "Acertou!"', () => {
    rightBall().click();
    cy.get('#answer').invoke('text').should('match', /Acertou!/);
  });

  it('Será verificado se o circulo colorido for o **incorreta**, deve ser exibido o texto "Errou! Tente novamente!"', () => {
    wrongBall().click();

    cy.get('#answer').invoke('text').should('match', /Errou! Tente novamente/);
  });
});

describe('6 - Crie um botão para iniciar/reiniciar o jogo', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  it('Será verificado que o botão deve ter o id reset-game', () => {
    cy.get('#reset-game').should('exist');
  });

  it('Será verificado que ao clicar no botão, novas cores devem ser geradas via JavaScript e o elemento rgb-color deve ser atualizado', () => {
    let currentRGBColor; let previousRGBColor; let currentBallColors; let
      previousBallColors;

    cy.get('#rgb-color').then((rgbColor) => {
      previousRGBColor = rgbColor.text();

      cy.get('.ball').then((balls) => {
        previousBallColors = Array.from(balls).map((ball) => (
          Cypress.$(ball).css('background-color')
        ));

        for (let i = 0; i < 5; i += 1) {
          cy.get('#reset-game').click();

          cy.get('#rgb-color').should((foo) => {
            currentRGBColor = foo.text();
            expect(currentRGBColor).not.to.equal(previousRGBColor);
            previousRGBColor = currentRGBColor;
          });

          cy.get('.ball').should((balls) => {
            currentBallColors = Array.from(balls).map((ball) => (
              Cypress.$(ball).css('background-color')
            ));

            expect(currentBallColors).not.to.deep.equal(previousBallColors);
            previousBallColors = currentBallColors;
          });
        }
      });
    });
  });

  it('Será verificado que ao clicar no botão, o elemento answer deve voltar ao estado inicial, exibindo o texto "Escolha uma cor"', () => {
    for (let i = 0; i < 5; i += 1) {
      cy.get('.ball').then((balls) => {
        balls[0].click();
      });

      cy.get('#reset-game').click();

      cy.get('#answer')
        .invoke('text')
        .should('match', /Escolha uma cor/);
    }
  });
});

describe('7 - Crie um placar que incremente 3 pontos para cada acerto no jogo', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  it('Será verificado que o elemento deve ter o **id** `score`.', () => {
    cy.get('#score').should('exist');
  });

  it('Será verificado que o valor inicial dele deve ser 0.', () => {
    expect(score()).to.equal(0);
  });

  it('Será verificado que a cada acerto, é incrementado 3 pontos ao placar', () => {
    rightBall().click().should(() => {
      expect(score()).to.equal(3);
    });
  });

  it('Será verificado que ao clicar no botão reiniciar, o placar NÃO deve ser resetado', () => {
    rightBall().click();

    cy.get('#reset-game').click().then(() => {
      rightBall().click().should(() => {
        expect(score()).to.equal(6);
      });
    });
  });
});
