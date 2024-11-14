const board = Array(9).fill(null);
const human = 'X';
const computer = 'O';

const gameBoard = document.getElementById('gameBoard');
const messageDiv = document.getElementById('message');

function createBoard() {
    board.forEach((_, idx) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = idx;
        cell.addEventListener('click', handleHumanMove);
        gameBoard.appendChild(cell);
    });
}

function handleHumanMove(event) {
    const index = event.target.dataset.index;
    if (board[index] || checkWinner(board)) return;

    board[index] = human;
    event.target.textContent = human;
    event.target.classList.add('taken');

    if (!checkWinner(board) && board.includes(null)) {
        setTimeout(handleComputerMove, 500);
    }

    updateGameState();
}

function handleComputerMove() {
    let emptyCells = board.map((val, idx) => (val === null ? idx : null)).filter(val => val !== null);
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = computer;

    const cell = document.querySelector(`.cell[data-index='${randomIndex}']`);
    cell.textContent = computer;
    cell.classList.add('taken');

    updateGameState();
}

function checkWinner(board) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    return null;
}

function updateGameState() {
    const winner = checkWinner(board);
    if (winner) {
        messageDiv.textContent = `${winner} wins!`;
        document.querySelectorAll('.cell').forEach(cell => cell.classList.add('taken'));
        setTimeout(resetGame, 2000); // Wait 2 seconds before resetting the game
    } else if (!board.includes(null)) {
        messageDiv.textContent = `It's a draw!`;
        setTimeout(resetGame, 2000); // Wait 2 seconds before resetting the game
    }
}

function resetGame() {
    messageDiv.textContent = '';
    gameBoard.classList.add('fade-out');

    setTimeout(() => {
        // Clear the board
        board.fill(null);
        gameBoard.innerHTML = '';
        gameBoard.classList.remove('fade-out');

        // Recreate the board
        createBoard();
    }, 500); // Fade-out duration (match the CSS fade-out animation)
}

createBoard();
