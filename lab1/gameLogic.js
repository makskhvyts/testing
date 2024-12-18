function createField(rows, cols) {
    return Array.from({ length: rows }, () => Array(cols).fill('.'));
}

function getNextCellStateWithToroidalBorders(field, row, col) {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    const rows = field.length;
    const cols = field[0].length;
    let aliveNeighbors = 0;

    directions.forEach(([dx, dy]) => {
        const newRow = (row + dx + rows) % rows;
        const newCol = (col + dy + cols) % cols;
        if (field[newRow][newCol] === 'x') {
            aliveNeighbors += 1;
        }
    });

    if (field[row][col] === 'x') {
        return aliveNeighbors < 2 || aliveNeighbors > 3 ? '.' : 'x';
    } else {
        return aliveNeighbors === 3 ? 'x' : '.';
    }
}

function getNextGeneration(field) {
    const newField = createField(field.length, field[0].length);

    for (let row = 0; row < field.length; row++) {
        for (let col = 0; col < field[0].length; col++) {
            newField[row][col] = getNextCellStateWithToroidalBorders(field, row, col);
        }
    }

    return newField;
}

function getGenerations(field, generations) {
    let currentField = field;

    for (let gen = 0; gen < generations; gen++) {
        currentField = getNextGeneration(currentField);
    }

    return currentField;
}

function countAliveCells(field) {
    return field.flat().filter(cell => cell === 'x').length;
}

function analyzeGameDynamics(initialField, generations) {
    let currentField = initialField;
    let stableGeneration = -1;

    for (let gen = 0; gen < generations; gen++) {
        const nextField = getNextGeneration(currentField);
        if (JSON.stringify(nextField) === JSON.stringify(currentField)) {
            stableGeneration = gen + 1;
            break;
        }
        currentField = nextField;
    }

    return stableGeneration === -1 ? generations : stableGeneration;
}

module.exports = { createField, getNextCellStateWithToroidalBorders, getNextGeneration, getGenerations, countAliveCells, analyzeGameDynamics };