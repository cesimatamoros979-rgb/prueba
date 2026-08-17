let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Agregar evento a cada celda
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    // Verificar si la celda ya está ocupada o si el juego terminó
    if (gameBoard[index] !== '' || !gameActive) {
        return;
    }

    // Actualizar el tablero y la celda
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    // Verificar si hay un ganador
    checkWinner();
}

function checkWinner() {
    let hasWinner = false;

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] === '' || gameBoard[b] === '' || gameBoard[c] === '') {
            continue;
        }
        if (gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
            statusDisplay.textContent = `¡Ganador: ${gameBoard[a]}! 🎉`;
            gameActive = false;
            highlightWinningCells(condition);
            hasWinner = true;
            break;
        }
    }

    // Si no hay ganador, verificar si el tablero está lleno (empate)
    if (!hasWinner) {
        if (gameBoard.every(cell => cell !== '')) {
            statusDisplay.textContent = '¡Empate! 🤝';
            gameActive = false;
            return;
        }

        // Cambiar al siguiente jugador
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Turno del Jugador: ${currentPlayer}`;
    }
}

function highlightWinningCells(condition) {
    condition.forEach(index => {
        cells[index].style.backgroundColor = '#ffeb3b';
        cells[index].style.fontWeight = 'bold';
    });
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    statusDisplay.textContent = `Turno del Jugador: ${currentPlayer}`;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
        cell.style.backgroundColor = '#fff';
        cell.style.fontWeight = 'normal';
    });
}
