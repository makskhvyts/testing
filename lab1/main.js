const fs = require('fs');
const { readInputFile } = require('./fileReader');
const { getGenerations, countAliveCells, analyzeGameDynamics } = require('./gameLogic');

function main(inputFile, outputFile, logFile) {
    const { generations, rows, cols, initialState } = readInputFile(inputFile);

    // Number of live and dead cells at the beginning
    const initialAliveCount = countAliveCells(initialState);
    const initialDeadCount = rows * cols - initialAliveCount;
    console.log(`Initial alive cells: ${initialAliveCount}`);
    console.log(`Initial dead cells: ${initialDeadCount}`);

    const finalState = getGenerations(initialState, generations);

    // Number of live and dead cells at the end
    const finalAliveCount = countAliveCells(finalState);
    const finalDeadCount = rows * cols - finalAliveCount;
    console.log(`Final alive cells: ${finalAliveCount}`);
    console.log(`Final dead cells: ${finalDeadCount}`);

    console.log("Final state of the game (Generation " + generations + "):");
    finalState.forEach(row => console.log(row.join(' ')));

    const stableGeneration = analyzeGameDynamics(initialState, generations);
    console.log(`Game stabilized after ${stableGeneration} generations`);

    const outputData = finalState.map(row => row.join('')).join('\n');
    fs.writeFileSync(outputFile, outputData, 'utf8');
    console.log(`Simulation completed. Output written to ${outputFile}`);

    fs.writeFileSync(logFile, 'Generation steps:\n', 'utf8');
    for (let gen = 0; gen < generations; gen++) {
        const stepData = getGenerations(initialState, gen + 1).map(row => row.join('')).join('\n');
        fs.appendFileSync(logFile, `Generation ${gen + 1}:\n${stepData}\n\n`, 'utf8');
    }
}

main('input.txt', 'output.txt', 'generationLog.txt');