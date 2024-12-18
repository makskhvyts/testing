const { createField, getNextGeneration, countAliveCells, analyzeGameDynamics } = require('../gameLogic');

describe('Randomized Tests', () => {
    test('should generate random initial state and compute next generation', () => {
        const rows = 10, cols = 10;
        const randomField = createField(rows, cols);

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                randomField[row][col] = Math.random() > 0.5 ? 'x' : '.';
            }
        }

        const nextGeneration = getNextGeneration(randomField);
        
        expect(nextGeneration).toBeDefined();
        expect(nextGeneration.length).toBe(rows);
        expect(nextGeneration[0].length).toBe(cols);

        const aliveCount = countAliveCells(nextGeneration);
        expect(aliveCount).toBeGreaterThanOrEqual(0);
        expect(aliveCount).toBeLessThanOrEqual(rows * cols);
    });

    test('should handle large random grid and compute next generation', () => {
        const rows = 50, cols = 50;
        const randomField = createField(rows, cols);

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                randomField[row][col] = Math.random() > 0.5 ? 'x' : '.';
            }
        }

        const nextGeneration = getNextGeneration(randomField);

        expect(nextGeneration).toBeDefined();
        expect(nextGeneration.length).toBe(rows);
        expect(nextGeneration[0].length).toBe(cols);
    });

    test('should run random generations and check alive cells count', () => {
        const rows = 8, cols = 8;
        const randomField = createField(rows, cols);

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                randomField[row][col] = Math.random() > 0.5 ? 'x' : '.';
            }
        }

        const generations = Math.floor(Math.random() * 10) + 1;
        let currentField = randomField;

        for (let gen = 0; gen < generations; gen++) {
            currentField = getNextGeneration(currentField);
        }

        const aliveCount = countAliveCells(currentField);
        expect(aliveCount).toBeGreaterThanOrEqual(0);
        expect(aliveCount).toBeLessThanOrEqual(rows * cols);
    });

    test('should stabilize after certain generations', () => {
        const rows = 6, cols = 6;
        const randomField = createField(rows, cols);

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                randomField[row][col] = Math.random() > 0.5 ? 'x' : '.';
            }
        }

        const stableGeneration = analyzeGameDynamics(randomField, 20);

        expect(stableGeneration).toBeGreaterThan(0);
        expect(stableGeneration).toBeLessThanOrEqual(20);
    });

    test('should handle empty field (no alive cells)', () => {
        const rows = 5, cols = 5;
        const emptyField = createField(rows, cols);
        const nextGeneration = getNextGeneration(emptyField);

        expect(countAliveCells(nextGeneration)).toBe(0);
    });
});