const fs = require('fs');
const { readInputFile } = require('./fileReader');
const { getGenerations } = require('./gameLogic');

function main(inputFile, outputFile) {
    const { generations, rows, cols, initialState } = readInputFile(inputFile);
    const finalState = getGenerations(initialState, generations);

    const outputData = finalState
        .map(row => row.join('')) 
        .join('\n'); 

    fs.writeFileSync(outputFile, outputData, 'utf8');
    console.log(`Simulation completed. Output written to ${outputFile}`);
}

main('input.txt', 'output.txt');