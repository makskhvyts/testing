const fs = require('fs');
const { readInputFile } = require('../fileReader');

jest.mock('fs');

describe('readInputFile', () => {
    it('should throw an error if the first line is not in the correct format', () => {
        const mockFileContent = `3 four 5`; 
        fs.readFileSync.mockReturnValue(mockFileContent);
        expect(() => readInputFile('input.txt')).toThrow('Invalid input file format');
    });

    it('should throw an error if there are extra rows beyond the expected count', () => {
        const mockFileContent = `3 4 4\n.x.x\nx.x.\n.x.x\nx.x.\n.x.x`; 
        fs.readFileSync.mockReturnValue(mockFileContent);
        expect(() => readInputFile('input.txt')).toThrow('Invalid input file format');
    });

    it('should throw an error if there are missing columns in a row', () => {
        const mockFileContent = `3 4 4\n.x.x\nx.x.\n.x\nx.x`;
        fs.readFileSync.mockReturnValue(mockFileContent);
        expect(() => readInputFile('input.txt')).toThrow('Invalid input file format');
    });

    it('should trim leading/trailing spaces from each row', () => {
        const mockFileContent = `3 4 4\n.x.x\nx.x.\n.x.x\nx.x.  `; 
        fs.readFileSync.mockReturnValue(mockFileContent);
        const { generations, rows, cols, initialState } = readInputFile('input.txt');
        expect(generations).toBe(3);
        expect(rows).toBe(4);
        expect(cols).toBe(4);
        expect(initialState).toEqual([
            ['.', 'x', '.', 'x'],
            ['x', '.', 'x', '.'],
            ['.', 'x', '.', 'x'],
            ['x', '.', 'x', '.']
        ]);
    });

    it('should correctly parse the input file data', () => {
        const mockFileContent = `3 5 5\n.x...\nx.x.x\n.x.x.\n.x.x.\nx...x`;
        fs.readFileSync.mockReturnValue(mockFileContent);
        const { generations, rows, cols, initialState } = readInputFile('input.txt');
        expect(generations).toBe(3);
        expect(rows).toBe(5);
        expect(cols).toBe(5);
        expect(initialState).toEqual([
            ['.', 'x', '.', '.', '.'],
            ['x', '.', 'x', '.', 'x'],
            ['.', 'x', '.', 'x', '.'],
            ['.', 'x', '.', 'x', '.'],
            ['x', '.', '.', '.', 'x']
        ]);
    });

    it('should throw an error for an empty file', () => {
        const mockFileContent = '';
        fs.readFileSync.mockReturnValue(mockFileContent);
        expect(() => readInputFile('input.txt')).toThrow('Invalid file content');
    });

    it('should throw an error if the file format is incorrect (mismatch between row count)', () => {
        const mockFileContent = `3 4 4\n.x.x\nx.x.\n.x.x`;
        fs.readFileSync.mockReturnValue(mockFileContent);
        expect(() => readInputFile('input.txt')).toThrow('Invalid input file format');
    });

    it('should throw an error for invalid characters in the grid', () => {
        const mockFileContent = `2 4 4\n.x.x\nx.y.x\n.x.x\nx...`;
        fs.readFileSync.mockReturnValue(mockFileContent);
        expect(() => readInputFile('input.txt')).toThrow('Invalid input file format');
    });

    it('should throw an error if the column count is inconsistent in the grid', () => {
        const mockFileContent = `2 3 4\n.x.x\nx.x\n.x.x`;
        fs.readFileSync.mockReturnValue(mockFileContent);
        expect(() => readInputFile('input.txt')).toThrow('Invalid input file format');
    });
});