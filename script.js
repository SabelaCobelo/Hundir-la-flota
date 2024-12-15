// Variables globales
const playerBoard = document.getElementById('player-board');
const enemyBoard = document.getElementById('enemy-board');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');

// Configuración inicial del juego
const BOARD_SIZE = 10;

// Crear tablero
function createBoard(boardElement) {
    boardElement.innerHTML = ''; // Asegurarse de que el tablero esté vacío antes de crear celdas
    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        boardElement.appendChild(cell);
    }
}

// Colocar barcos de forma aleatoria (simplificada para el ejemplo)
function placeShipsRandomly(boardElement) {
    const cells = boardElement.querySelectorAll('.cell');
    let shipsToPlace = 5; // Cantidad de barcos a colocar

    while (shipsToPlace > 0) {
        const randomIndex = Math.floor(Math.random() * cells.length);
        const cell = cells[randomIndex];

        if (!cell.classList.contains('ship')) {
            cell.classList.add('ship');
            // Solo mostrar los barcos en el tablero del jugador
            if (boardElement === playerBoard) {
                cell.style.backgroundColor = '#2ecc71'; // Color verde para visualizar los barcos del jugador
            }
            shipsToPlace--;
        }
    }
}

// Manejar clic en una celda del tablero enemigo
function handleCellClick(event) {
    const cell = event.target;
    // Verificamos que la celda pertenece al tablero enemigo y que no ha sido clickeada antes
    if (!cell.classList.contains('cell') || cell.classList.contains('hit') || cell.classList.contains('miss')) {
        return;
    }

    if (cell.classList.contains('ship')) {
        cell.classList.add('hit');
        cell.style.backgroundColor = '#e74c3c'; // Rojo para marcar un impacto
    } else {
        cell.classList.add('miss');
        cell.style.backgroundColor = '#95a5a6'; // Gris para marcar un fallo
    }
}

// Iniciar juego
function startGame() {
    createBoard(playerBoard);
    createBoard(enemyBoard);
    placeShipsRandomly(playerBoard);
    placeShipsRandomly(enemyBoard);

    const enemyCells = enemyBoard.querySelectorAll('.cell');
    enemyCells.forEach(cell => cell.addEventListener('click', handleCellClick));
}

// Reiniciar juego
function resetGame() {
    playerBoard.innerHTML = '';
    enemyBoard.innerHTML = '';
    startGame(); // Reinicia el juego desde cero
}

// Asignar eventos a los botones
startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);

// Inicializar la aplicación
startGame();
