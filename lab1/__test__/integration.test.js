const fs = require('fs');
const { readInputFile } = require('../fileReader');
const { getGenerations, countAliveCells, analyzeGameDynamics } = require('../gameLogic');

describe('Integration Tests', () => {
    test('should read input file and get correct generations', () => {
        const inputData = '3 4 4\n.x.x\nx.x.\n.x.x\n.x.x';
        fs.writeFileSync('input.txt', inputData);

        const { generations, rows, cols, initialState } = readInputFile('input.txt');
        const finalState = getGenerations(initialState, generations);

        expect(finalState).toBeDefined();
        expect(finalState.length).toBe(rows);
        expect(finalState[0].length).toBe(cols);
    });

    test('should write output to file correctly', () => {
        const inputData = '3 4 4\n.x.x\nx.x.\n.x.x\n.x.x';
        fs.writeFileSync('input.txt', inputData);

        const { generations, rows, cols, initialState } = readInputFile('input.txt');
        const finalState = getGenerations(initialState, generations);

        const outputData = finalState.map(row => row.join('')).join('\n');
        fs.writeFileSync('output.txt', outputData, 'utf8');

        const writtenData = fs.readFileSync('output.txt', 'utf8');
        expect(writtenData).toBe(outputData);
    });

    test('should stabilize the game after the correct number of generations', () => {
        const inputData = '3 4 4\n.x.x\nx.x.\n.x.x\n.x.x';
        fs.writeFileSync('input.txt', inputData);

        const { generations, rows, cols, initialState } = readInputFile('input.txt');
        const stableGeneration = analyzeGameDynamics(initialState, generations);

        expect(stableGeneration).toBe(3);
    });

    test('should calculate the number of dead cells correctly', () => {
        const inputData = '3 4 4\n.x.x\nx.x.\n.x.x\n.x.x';
        fs.writeFileSync('input.txt', inputData);

        const { rows, cols, initialState } = readInputFile('input.txt');
        const initialAliveCount = countAliveCells(initialState);
        const initialDeadCount = rows * cols - initialAliveCount;

        expect(initialDeadCount).toBe(8);
    });

    test('should simulate the game and write logs correctly', () => {
        const inputData = '3 4 4\n.x.x\nx.x.\n.x.x\n.x.x';
        fs.writeFileSync('input.txt', inputData);

        const { generations, rows, cols, initialState } = readInputFile('input.txt');
        const finalState = getGenerations(initialState, generations);
        
        const logFile = 'generationLog.txt';
        fs.writeFileSync(logFile, 'Generation steps:\n', 'utf8');
        for (let gen = 0; gen < generations; gen++) {
            const stepData = getGenerations(initialState, gen + 1).map(row => row.join('')).join('\n');
            fs.appendFileSync(logFile, `Generation ${gen + 1}:\n${stepData}\n\n`, 'utf8');
        }

        const logData = fs.readFileSync(logFile, 'utf8');
        expect(logData).toContain('Generation 1');
        expect(logData).toContain('Generation 2');
        expect(logData).toContain('Generation 3');
    });
});