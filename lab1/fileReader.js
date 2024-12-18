const fs = require('fs');

function readInputFile(filename) {
    const data = fs.readFileSync(filename, 'utf8').trim();
    
    if (!data) {
        throw new Error('Invalid file content');
    }

    const lines = data.split('\n');
    const [generations, rows, cols] = lines[0].split(' ').map(Number);

    if (isNaN(generations) || isNaN(rows) || isNaN(cols)) {
        throw new Error('Invalid input file format');
    }

    const initialState = lines.slice(1).map(line => line.trim().split('').map(cell => {
        if (cell !== 'x' && cell !== '.') {
            throw new Error('Invalid input file format: Only lowercase "x" and "." are allowed in the grid.');
        }
        return cell;
    }));

    if (initialState.length !== rows) {
        throw new Error('Invalid input file format: Row count mismatch.');
    }
    
    initialState.forEach(row => {
        if (row.length !== cols) {
            throw new Error('Invalid input file format: Column count mismatch.');
        }
    });

    return { generations, rows, cols, initialState };
}

module.exports = { readInputFile };