const { getGenerations } = require('../gameLogic');

describe('Load Tests', () => {
    test('should handle large grid sizes and generations', () => {
        const rows = 500, cols = 500;
        const largeField = Array.from({ length: rows }, () => Array(cols).fill('.'));

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                largeField[row][col] = Math.random() > 0.5 ? 'x' : '.';
            }
        }

        const generations = 100;
        const startTime = Date.now();
        const finalState = getGenerations(largeField, generations);
        const endTime = Date.now();

        expect(finalState).toBeDefined();
        expect(endTime - startTime).toBeLessThan(5000); 
    });

    test('should handle 500x500 grid with mostly live cells', () => {
        const rows = 500, cols = 500;
        const largeField = Array.from({ length: rows }, () => Array(cols).fill('x'));

        const generations = 100;
        const startTime = Date.now();
        const finalState = getGenerations(largeField, generations);
        const endTime = Date.now();

        expect(finalState).toBeDefined();
        expect(endTime - startTime).toBeLessThan(5000);
    });

    test('should handle 500x500 grid with mostly dead cells', () => {
        const rows = 500, cols = 500;
        const largeField = Array.from({ length: rows }, () => Array(cols).fill('.'));

        const generations = 100;
        const startTime = Date.now();
        const finalState = getGenerations(largeField, generations);
        const endTime = Date.now();

        expect(finalState).toBeDefined();
        expect(endTime - startTime).toBeLessThan(5000);
    });

    test('should handle large grid with random cells', () => {
        const rows = 500, cols = 500;
        const largeField = Array.from({ length: rows }, () => 
            Array(cols).fill('.').map(() => Math.random() > 0.5 ? 'x' : '.')
        );

        const generations = 100;
        const startTime = Date.now();
        const finalState = getGenerations(largeField, generations);
        const endTime = Date.now();

        expect(finalState).toBeDefined();
        expect(endTime - startTime).toBeLessThan(5000);
    });

    test('should handle very large grid (1000x1000)', () => {
        const rows = 1000, cols = 1000;
        const largeField = Array.from({ length: rows }, () => Array(cols).fill('.'));

        const generations = 100;
        const startTime = Date.now();
        const finalState = getGenerations(largeField, generations);
        const endTime = Date.now();

        expect(finalState).toBeDefined();
        expect(endTime - startTime).toBeLessThan(15000);
    });
});