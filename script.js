const rows = 6;
const cols = 7;
let board = [];
let currentPlayer = 'red';
let gameActive = true;
let score = { red: 0, yellow: 0 };

const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const scoreRed = document.getElementById('score-red');
const scoreYellow = document.getElementById('score-yellow');

function initBoard() {
  board = [];
  boardEl.innerHTML = '';
  gameActive = true;
  currentPlayer = 'red';
  statusEl.textContent = "Red's Turn";

  for (let r = 0; r < rows; r++) {
    board[r] = [];
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = r;
      cell.dataset.col = c;
      boardEl.appendChild(cell);
      board[r][c] = '';
    }
  }
}

boardEl.addEventListener('click', (e) => {
  if (!e.target.classList.contains('cell') || !gameActive) return;

  const col = +e.target.dataset.col;

  for (let row = rows - 1; row >= 0; row--) {
    if (board[row][col] === '') {
      board[row][col] = currentPlayer;
      const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
      cell.classList.add(currentPlayer);

      if (checkWin(row, col)) {
        statusEl.textContent = `${capitalize(currentPlayer)} Wins!`;
        gameActive = false;
        score[currentPlayer]++;
        updateScore();
      } else if (isBoardFull()) {
        statusEl.textContent = `It's a Draw!`;
        gameActive = false;
      } else {
        currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
        statusEl.textContent = `${capitalize(currentPlayer)}'s Turn`;
      }
      break;
    }
  }
});

restartBtn.addEventListener('click', initBoard);

function updateScore() {
  scoreRed.textContent = score.red;
  scoreYellow.textContent = score.yellow;
}

function checkWin(r, c) {
  return checkDirection(r, c, 1, 0) ||  // vertical
         checkDirection(r, c, 0, 1) ||  // horizontal
         checkDirection(r, c, 1, 1) ||  // diagonal \
         checkDirection(r, c, 1, -1);   // diagonal /
}

function checkDirection(r, c, dr, dc) {
  let count = 1;

  count += countInDirection(r, c, dr, dc);
  count += countInDirection(r, c, -dr, -dc);

  return count >= 4;
}

function countInDirection(r, c, dr, dc) {
  let count = 0;
  let row = r + dr;
  let col = c + dc;

  while (row >= 0 && row < rows && col >= 0 && col < cols && board[row][col] === currentPlayer) {
    count++;
    row += dr;
    col += dc;
  }

  return count;
}

function isBoardFull() {
  return board.every(row => row.every(cell => cell !== ''));
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Initial game setup
initBoard();

// Dark mode toggle
const toggle = document.getElementById('modeToggle');
const label = document.getElementById('mode-label');

toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  label.textContent = document.body.classList.contains('dark') ? 'Dark Mode' : 'Light Mode';
});

