const {
    createField,
    getNextCellStateWithToroidalBorders,
    getNextGeneration,
    getGenerations
} = require('../gameLogic.js');

describe('createField', () => {
    it('should create a field with the correct dimensions filled with dots', () => {
        const rows = 5;
        const cols = 5;
        const field = createField(rows, cols);
        
        expect(field.length).toBe(rows);
        expect(field[0].length).toBe(cols);
        
        expect(field).toEqual([
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.']
        ]);
    });

    it('should create an empty field when rows or cols are 0', () => {
        const fieldZeroRows = createField(0, 5);
        const fieldZeroCols = createField(5, 0);

        expect(fieldZeroRows).toEqual([]);
        expect(fieldZeroCols).toEqual([[], [], [], [], []]);
    });

    it('should create a 1x1 field with a dot', () => {
        const field = createField(1, 1);
        expect(field).toEqual([['.']]);
    });
});

describe('getNextCellStateWithToroidalBorders', () => {
    it('should handle dead cell becoming alive (exactly 3 neighbors)', () => {
        const field = [
            ['.', '.', '.', '.', '.'],
            ['x', 'x', 'x', '.', '.'],
            ['.', '.', 'x', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.']
        ];
        expect(getNextCellStateWithToroidalBorders(field, 2, 2)).toBe('x');
    });

    it('should handle the toroidal wrapping correctly for top right corner', () => {
        const field = [
            ['.', '.', '.', '.', '.'],
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.']
        ];
        expect(getNextCellStateWithToroidalBorders(field, 0, 4)).toBe('x');
    });

    it('should handle the toroidal wrapping correctly for bottom left corner', () => {
        const field = [
            ['.', '.', '.', '.', '.'],
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x'],
            ['.', '.', '.', '.', '.'],
            ['x', 'x', 'x', 'x', 'x']
        ];
        expect(getNextCellStateWithToroidalBorders(field, 4, 0)).toBe('x');
    });

    it('should handle the toroidal wrapping correctly for bottom right corner', () => {
        const field = [
            ['.', '.', '.', '.', '.'],
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x'],
            ['.', '.', '.', '.', '.'],
            ['x', 'x', 'x', 'x', 'x']
        ];
        expect(getNextCellStateWithToroidalBorders(field, 4, 4)).toBe('x');
    });

    it('should return "." for a cell with fewer than 2 neighbors', () => {
        const field = [
            ['.', '.', '.', '.', '.'],
            ['x', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.']
        ];
        expect(getNextCellStateWithToroidalBorders(field, 1, 0)).toBe('.');
    });

    it('should return "." for a live cell with less than 2 or more than 3 neighbors', () => {
        const field = [
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x']
        ];
        expect(getNextCellStateWithToroidalBorders(field, 0, 0)).toBe('.');
    });

    it('should handle the toroidal wrapping correctly (top left corner)', () => {
        const field = [
            ['.', '.', '.', '.', '.'],
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.']
        ];
        expect(getNextCellStateWithToroidalBorders(field, 0, 0)).toBe('x');
    });

    it('should handle the toroidal wrapping correctly (bottom right corner)', () => {
        const field = [
            ['.', '.', '.', '.', '.'],
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x'],
            ['.', '.', '.', '.', '.'],
            ['x', 'x', 'x', 'x', 'x']
        ];
        expect(getNextCellStateWithToroidalBorders(field, 4, 4)).toBe('x');
    });
});

describe('getNextGeneration', () => {
    it('should return the same field when no cells are alive', () => {
        const field = [
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.']
        ];
        const nextGen = getNextGeneration(field);
        expect(nextGen).toEqual(field);
    });

    it('should correctly handle the next generation with an overpopulation', () => {
        const field = [
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x']
        ];
        const nextGen = getNextGeneration(field);
        const expectedNextGen = [
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.']
        ];
        expect(nextGen).toEqual(expectedNextGen);
    });
    

    it('should return the same field when no cells are alive', () => {
        const field = [
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.']
        ];
        const nextGen = getNextGeneration(field);
        expect(nextGen).toEqual(field);
    });

    it('should return the same field when all cells are alive and they should die', () => {
        const field = [
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x']
        ];
        const nextGen = getNextGeneration(field);
        const expectedNextGen = [
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.']
        ];
        expect(nextGen).toEqual(expectedNextGen);
    });

    it('should handle the maximum possible grid size correctly', () => {
        const rows = 1000;
        const cols = 1000;
        const field = createField(rows, cols);
        field[500][500] = 'x';
        const nextGen = getNextGeneration(field);
        expect(nextGen[500][500]).toBe('.');
    });

    it('should return the next generation of the field', () => {
        const field = [
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x']
        ];
        const nextGen = getNextGeneration(field);
        const expectedNextGen = [
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.']
        ];
    
        expect(nextGen).toEqual(expectedNextGen);
    });

    it('should handle a field with no live cells (all dead)', () => {
        const field = [
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.']
        ];
        const nextGen = getNextGeneration(field);
        expect(nextGen).toEqual(field);
    });

    it('should handle a field with all live cells (maximum neighbors)', () => {
        const field = [
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x']
        ];
        const nextGen = getNextGeneration(field);
        const expectedNextGen = [
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.']
        ];
    
        expect(nextGen).toEqual(expectedNextGen);
    });
});

describe('getGenerations', () => {
    it('should handle multiple generations with a single live cell', () => {
        const field = [
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', 'x', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.']
        ];
        const finalState = getGenerations(field, 10);
        expect(finalState).toEqual([
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.']
        ]);
    });

    it('should handle the maximum possible grid size over multiple generations', () => {
        const rows = 1000;
        const cols = 1000;
        const field = createField(rows, cols);
        field[500][500] = 'x';
        const generations = 10;
        const finalState = getGenerations(field, generations);
        expect(finalState).toBeDefined();
    });

    it('should return the same field when 0 generations are requested', () => {
        const field = [
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x']
        ];
        const generations = 0;
        const finalState = getGenerations(field, generations);
        expect(finalState).toEqual(field);
    });

    it('should return the correct state after multiple generations', () => {
        const field = [
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x']
        ];
        const finalState = getGenerations(field, 1);
        const expectedFinalState = [
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.']
        ];
    
        expect(finalState).toEqual(expectedFinalState);
    });
    

    it('should return the same field after 0 generations', () => {
        const field = [
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x']
        ];
        const generations = 0;
        const finalState = getGenerations(field, generations);
        expect(finalState).toEqual(field); 
    });

    it('should handle a large number of generations', () => {
        const field = [
            ['x', '.', 'x', '.', 'x'],
            ['.', 'x', '.', 'x', '.'],
            ['x', '.', 'x', '.', 'x'],
            ['.', 'x', '.', 'x', '.'],
            ['x', '.', 'x', '.', 'x']
        ];
        const generations = 50;
        const finalState = getGenerations(field, generations);
        expect(finalState).toBeDefined(); 
    });
});