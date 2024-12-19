# Game of Life Project

## Full Name and Group

**Full Name:** Khvyts Maksym Serhiyovych  
**Group:** IM-21

## How to use the program?

1. Clone the repository: ```git clone https://github.com/makskhvyts/testing/tree/main/lab1 ```
2. Install dependencies: ``` npm install ```
3. Run the tests: ``` npm test ```
4. Run the Program: ``` node main.js ```

## Enhancements and Improvements

The program has been improved to detect stable generations where the game state no longer changes. The final result is saved in `output.txt`, and a detailed log of all generation steps is recorded in `generationLog.txt`.

### Key Changes:
- Added a function to count the number of live and dead cells at the start and end of the simulation.
- Added functionality to detect stable generations.
- Logs all generation steps in a separate file.

## Testing

Various types of tests have been implemented to ensure program functionality:

- **Unit Tests**: Verify individual function correctness.
- **Integration Tests**: Check interaction between program modules.
- **Load Tests**: Evaluate performance with large data sets (500x500 and 1000x1000 grids).
- **Randomized Tests**: Test the program with random game boards to ensure stability.

## Conclusion

Tests confirmed the stability, performance, and correctness of the program under different scenarios. Integration testing showed correct module interaction, load tests confirmed handling of large data sets, and randomized tests ensured robustness against unpredictable inputs.