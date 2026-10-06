# Memory Game

A simple memory card game created as part of the Rolling Scopes School course.

## About the game

The goal of the game is to find all 8 matching pairs of cards.

The game contains:

- 16 cards;
- 8 matching pairs;
- move counter;
- pairs counter;
- random card shuffling;
- victory modal;
- leaderboard with the best 10 results;
- saving results in `localStorage`;
- responsive layout for mobile devices.

## How to play

1. Click on a card to reveal it.
2. Click on another card.
3. If the cards match, they remain open.
4. If they do not match, they are hidden again after a short delay.
5. Find all 8 pairs to win the game.

## Technologies

- HTML5
- CSS3
- JavaScript
- Local Storage API

## Features

### New Game

The **New Game** button resets the current game and shuffles all cards.

### Leaderboard

The **Leaderboard** button displays the best results.

The leaderboard stores up to 10 results and sorts them by the number of moves. If two results have the same number of moves, the earlier result is displayed first.

### Victory modal

After finding all 8 pairs, a victory modal displays the number of moves.

The game can be restarted immediately or the modal can be closed.

## Project structure

```text
memory-game/
├── index.html
├── style.css
├── script.js
└── README.md