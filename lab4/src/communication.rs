use crate::game_logic::GameField;
use mockall::{mock, predicate::*};
use crate::io::{read_input, write_output};

mock! {
    pub Input {
        fn read_input(&self) -> String;
    }
}

mock! {
    pub Output {
        fn write_output(&self, data: &str);
    }
}

pub struct GameController<I, O>
where
    I: Fn() -> String,
    O: Fn(&str),
{
    input: I,
    output: O,
    output_option: String,
}

impl<I, O> GameController<I, O>
where
    I: Fn() -> String,
    O: Fn(&str),
{
    pub fn new(input: I, output: O, output_option: String) -> Self {
        GameController { input, output, output_option }
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

        let mut result = String::new();
        if self.output_option == "steps" {
            game_field.drop_figure_steps(&mut result);
        } else {
            game_field.drop_figure_final(&mut result);
        }
    
        (self.output)(&result);
    }
}

pub fn run_game_from_file(output_option: &str) {
    let game_controller = GameController::new(
        || match read_input("../input.txt") {
            Ok(data) => data,
            Err(_) => {
                println!("Error reading input file");
                String::new()
            }
        },
        |data| write_output("../output.txt", data).unwrap(),
        output_option.to_string(),
    );
    
    game_controller.run();
}


#[cfg(test)]
mod tests {
    use super::*;
    use predicates::str::contains;

    #[test]
    fn test_game_controller_with_mock_io() {
        let input_data = "3 3\n\
                          p..\n\
                          ...\n\
                          .#.";

        let mut mock_input = MockInput::new();
        mock_input
            .expect_read_input()
            .return_const(input_data.to_string());

        let mut mock_output = MockOutput::new();
        mock_output
            .expect_write_output()
            .with(contains("STEP 0")) 
            .times(1)  
            .return_const(());  

        let game_controller = GameController::new(
            || mock_input.read_input(),  
            |data| mock_output.write_output(data),  
            "steps".to_string(),
        );

        game_controller.run();
    }

    #[test]
    fn test_game_controller_invalid_input() {
        let input_data = "3 3\n\
                          p..\n\
                          .#.";

        let mut mock_input = MockInput::new();
        mock_input
            .expect_read_input()
            .return_const(input_data.to_string());

        let mut mock_output = MockOutput::new();
        mock_output
            .expect_write_output()
            .with(contains("Error: The number of rows does not match the specified height."))
            .times(1)
            .return_const(());

        let game_controller = GameController::new(
            || mock_input.read_input(),
            |data| mock_output.write_output(data),
            "final".to_string(),
        );

        game_controller.run();
    }
}