use super::game_logic::GameField;
use super::io::{read_input, write_output};

pub struct GameController<I, O>
where
    I: Fn() -> String,
    O: Fn(&str),
{
    input: I,
    output: O,
}

impl<I, O> GameController<I, O>
where
    I: Fn() -> String,
    O: Fn(&str),
{
    pub fn new(input: I, output: O) -> Self {
        GameController { input, output }
    }

    pub fn run(&self) {
        let input_data = (self.input)();

        let mut lines = input_data.lines();
        
        let first_line = match lines.next() {
            Some(line) => line,
            None => {
                (self.output)("Error: file is empty.");
                return;
            }
        };
    
        let dimensions: Vec<usize> = first_line
            .split_whitespace()
            .filter_map(|s| s.parse().ok())
            .collect();
    
        if dimensions.len() != 2 {
            (self.output)("Error: The first line must contain two numbers.");
            return;
        }
    
        let expected_height = dimensions[0];
        let expected_width = dimensions[1];
    
        let mut figure = Vec::new();
        let mut landscape = Vec::new();
        let mut y = 0;
    
        for line in lines {
            let chars: Vec<char> = line.chars().collect();
    
            if chars.len() != expected_width {
                (self.output)("Error: The number of columns does not match the specified width.");
                return;
            }
    
            for (x, char) in chars.iter().enumerate() {
                match *char {
                    'p' => figure.push((x, y)),
                    '#' => landscape.push((x, y)),
                    '.' => {},
                    _ => {
                        (self.output)("Error: invalid character in file.");
                        return;
                    }
                }
            }
    
            y += 1;
        }

        if y != expected_height {
            (self.output)("Error: The number of rows does not match the specified height.");
            return;
        }
    
        if figure.is_empty() {
            (self.output)("Error: Invalid data in the file.");
            return;
        }
    
        let mut game_field = GameField::new(expected_width, expected_height, figure, landscape);
    
        game_field.drop_figure();
    
        let result = game_field.to_string();
        (self.output)(&result);
    }
}

pub fn run_game_from_file() {
    let game_controller = GameController::new(
        || match read_input("../input.txt") {
            Ok(data) => data,
            Err(_) => {
                println!("Error reading input file");
                String::new()
            }
        },
        |data| write_output("../output.txt", data).unwrap(),
    );
    
    game_controller.run();
}


#[cfg(test)]
mod tests {
    use super::*;
    use std::cell::RefCell;

    #[test]
    fn test_game_controller_with_mock_io() {
        let input_data = "3 3\n\
                          p..\n\
                          ...\n\
                          .#.";

        let output_data = RefCell::new(String::new());
        let input_call_count = RefCell::new(0);
        let output_call_count = RefCell::new(0);

        let mock_input = || {
            *input_call_count.borrow_mut() += 1;
            input_data.to_string()
        };

        let mock_output = |data: &str| {
            *output_call_count.borrow_mut() += 1;
            output_data.borrow_mut().push_str(data);
            output_data.borrow_mut().push('\n');
        };

        let game_controller = GameController::new(mock_input, mock_output);

        game_controller.run();

        let expected_output = "\
            ...\n\
            ...\n\
            p#.";

        assert_eq!(output_data.borrow().trim(), expected_output);
        assert_eq!(*input_call_count.borrow(), 1, "mock_input was not called the expected number of times.");
        assert_eq!(*output_call_count.borrow(), 1, "mock_output was not called the expected number of times.");
    }

    #[test]
    fn test_game_controller_invalid_input() {
        let input_data = "3 3\n\
                          p..\n\
                          .#.";

        let output_data = RefCell::new(String::new());
        let input_call_count = RefCell::new(0);
        let output_call_count = RefCell::new(0);

        let mock_input = || {
            *input_call_count.borrow_mut() += 1;
            input_data.to_string()
        };
        let mock_output = |data: &str| {
            *output_call_count.borrow_mut() += 1;
            output_data.borrow_mut().push_str(data);
            output_data.borrow_mut().push('\n');
        };

        let game_controller = GameController::new(mock_input, mock_output);

        game_controller.run();

        assert_eq!(*input_call_count.borrow(), 1, "mock_input was not called the expected number of times.");
        assert_eq!(*output_call_count.borrow(), 1, "mock_output was not called the expected number of times.");
        assert!(output_data
            .borrow()
            .contains("Error: The number of rows does not match the specified height."));
    }
}