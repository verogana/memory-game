let firstCard = null;
let secondCard = null;
let lockBoard = false;
let movesCount = 0;
let pairsCount = 0;
let mismatchTimer = null;

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

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function startNewGame() {
  if (mismatchTimer !== null) {
    clearTimeout(mismatchTimer);
    mismatchTimer = null;
  }

  movesCount = 0;
  pairsCount = 0;

  moves.textContent = 'Ходы: 0';
  pairs.textContent = 'Пары: 0 из 8';

  resetTurn();

  shuffleCards(cards);

  const cardElements = gameBoard.querySelectorAll('.card');

  cardElements.forEach((card, index) => {
    card.textContent = '?';
    card.dataset.value = cards[index];
    card.classList.remove('matched');
  });
}

function showWinModal() {
  const overlay = document.createElement('div');
  overlay.classList.add('modal-overlay');

  const modal = document.createElement('div');
  modal.classList.add('modal');

  const title = document.createElement('h2');
  title.textContent = 'Победа!';

  const result = document.createElement('p');
  result.textContent = `Вы сделали ${movesCount} ходов`;

  const newGameModalButton = document.createElement('button');
  newGameModalButton.textContent = 'Новая игра';

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Закрыть';

  const closeModal = () => {
    overlay.remove();
    document.removeEventListener('keydown', handleEscape);
  };

  const handleEscape = (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  newGameModalButton.addEventListener('click', () => {
    closeModal();
    startNewGame();
  });

  closeButton.addEventListener('click', closeModal);

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', handleEscape);

  modal.append(
    title,
    result,
    newGameModalButton,
    closeButton
  );

  overlay.append(modal);

  document.body.append(overlay);
}

function saveResult() {
  const results =
    JSON.parse(localStorage.getItem('memoryGameResults')) || [];

  const today = new Date();

  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();

  const result = {
    moves: movesCount,
    date: `${day}.${month}.${year}`,
    time: Date.now(),
  };

  results.push(result);

  results.sort((a, b) => {
    if (a.moves !== b.moves) {
      return a.moves - b.moves;
    }

    return a.time - b.time;
  });

  const bestResults = results.slice(0, 10);

  localStorage.setItem(
    'memoryGameResults',
    JSON.stringify(bestResults)
  );
}

function checkWin() {
  if (pairsCount === 8) {
    saveResult();
    showWinModal();
  }
}

function showLeaderboard() {
  const results =
    JSON.parse(localStorage.getItem('memoryGameResults')) || [];

  const overlay = document.createElement('div');
  overlay.classList.add('modal-overlay');

  const modal = document.createElement('div');
  modal.classList.add('modal');

  const title = document.createElement('h2');
  title.textContent = 'Таблица лидеров';

  const list = document.createElement('ol');

  if (results.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'Пока нет результатов';
    modal.append(emptyMessage);
  } else {
    results.forEach((result) => {
      const item = document.createElement('li');
      item.textContent = `${result.moves} ходов — ${result.date}`;
      list.append(item);
    });

    modal.append(list);
  }

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Закрыть';

  const closeModal = () => {
    overlay.remove();
    document.removeEventListener('keydown', handleEscape);
  };

  const handleEscape = (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  closeButton.addEventListener('click', closeModal);

  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', handleEscape);

  modal.append(
    title,
    closeButton
  );

  overlay.append(modal);

  document.body.append(overlay);
}

function createCard(value) {
  const card = document.createElement('button');

  card.classList.add('card');
  card.textContent = '?';
  card.dataset.value = value;

  card.addEventListener('click', () => {
    if (lockBoard || card.classList.contains('matched')) {
      return;
    }

    card.textContent = card.dataset.value;

    if (firstCard === null) {
      firstCard = card;
      return;
    }

    secondCard = card;
    lockBoard = true;

    movesCount += 1;
    moves.textContent = `Ходы: ${movesCount}`;

    if (firstCard.dataset.value === secondCard.dataset.value) {
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');

      pairsCount += 1;
      pairs.textContent = `Пары: ${pairsCount} из 8`;

      resetTurn();

      checkWin();
    } else {
      const first = firstCard;
      const second = secondCard;

      mismatchTimer = setTimeout(() => {
        first.textContent = '?';
        second.textContent = '?';

        mismatchTimer = null;

        resetTurn();
      }, 1000);
    }
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

newGameButton.addEventListener('click', startNewGame);

const leaderboardButton = document.createElement('button');
leaderboardButton.textContent = 'Таблица лидеров';

leaderboardButton.addEventListener('click', showLeaderboard);

header.append(
  title,
  newGameButton,
  leaderboardButton
);

const gameInfo = document.createElement('div');
gameInfo.classList.add('game-info');

const moves = document.createElement('p');
moves.textContent = 'Ходы: 0';

const pairs = document.createElement('p');
pairs.textContent = 'Пары: 0 из 8';

gameInfo.append(moves, pairs);

const gameBoard = document.createElement('main');
gameBoard.classList.add('game-board');

app.append(
  header,
  gameInfo,
  gameBoard
);

document.body.prepend(app);

cards.forEach((value) => {
  const card = createCard(value);
  gameBoard.append(card);
});