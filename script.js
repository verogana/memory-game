let firstCard = null;
let secondCard = null;
let lockBoard = false;

const cardValues = [
  '🍎',
  '🍌',
  '🍇',
  '🍓',
  '🍊',
  '🍉',
  '🥝',
  '🍍',
];

const cards = [...cardValues, ...cardValues];

shuffleCards(cards);

function shuffleCards(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }

  return array;
}

function createCard(value) {
  const card = document.createElement('button');

  card.classList.add('card');
  card.textContent = '?';
  card.dataset.value = value;

  card.addEventListener('click', () => {
  card.textContent = card.dataset.value;
  card.disabled = true;
});

  return card;
}

const app = document.createElement('div');
app.classList.add('app');

const header = document.createElement('header');
header.classList.add('header');

const title = document.createElement('h1');
title.textContent = 'Memory Game';

const newGameButton = document.createElement('button');
newGameButton.textContent = 'Новая игра';

const leaderboardButton = document.createElement('button');
leaderboardButton.textContent = 'Таблица лидеров';

header.append(title, newGameButton, leaderboardButton);

const gameInfo = document.createElement('div');
gameInfo.classList.add('game-info');

const moves = document.createElement('p');
moves.textContent = 'Ходы: 0';

const pairs = document.createElement('p');
pairs.textContent = 'Пары: 0 из 8';

gameInfo.append(moves, pairs);

const gameBoard = document.createElement('main');
gameBoard.classList.add('game-board');

app.append(header, gameInfo, gameBoard);

document.body.prepend(app);

cards.forEach((value) => {
  const card = createCard(value);
  gameBoard.append(card);
});