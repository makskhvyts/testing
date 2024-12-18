#[path = "../src/game_logic.rs"] mod game_logic;
use crate::game_logic::GameField;

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_new_game_field() {
        let figure = vec![(1, 1), (2, 1), (3, 1)];
        let landscape = vec![(0, 0), (1, 0), (2, 0)];
        let field = GameField::new(5, 5, figure.clone(), landscape.clone());

        assert_eq!(field.width, 5);
        assert_eq!(field.height, 5);
        assert_eq!(field.figure, figure);
        assert_eq!(field.landscape, landscape);
    }

    #[test]
    fn test_invalid_figure_coordinates() {
        let mut game_field = GameField::new(5, 5, vec![(6, 0)], vec![]);
        let mut output = String::new();
        game_field.drop_figure_steps(&mut output);
        assert_eq!(game_field.landscape, vec![(6, 4)]);
    }

    #[test]
    fn test_figure_outside_bounds_final() {
        let mut game_field = GameField::new(5, 5, vec![(6, 0)], vec![]);
        let mut output = String::new();
        game_field.drop_figure_final(&mut output);
        assert_eq!(game_field.landscape, vec![(6, 4)]);
    }

    #[test]
    fn test_multiple_figures_with_gaps() {
        let mut game_field = GameField::new(6, 6, vec![(1, 0), (3, 0)], vec![]);
        let mut output = String::new();
        game_field.drop_figure_steps(&mut output);
        assert!(game_field.landscape.contains(&(1, 5)));
        assert!(game_field.landscape.contains(&(3, 5)));
    }

        #[test]
    fn test_landscape_blockage() {
        let mut game_field = GameField::new(5, 5, vec![(2, 0)], vec![(2, 4)]);
        let mut output = String::new();
        game_field.drop_figure_steps(&mut output);
        assert_eq!(game_field.landscape, vec![(2, 4), (2, 3)]);
    }

    #[test]
    fn test_small_field_minimum_dimension() {
        let mut game_field = GameField::new(1, 1, vec![(0, 0)], vec![]);
        let mut output = String::new();
        game_field.drop_figure_steps(&mut output);
        assert_eq!(game_field.landscape, vec![(0, 0)]);
    }

    #[test]
    fn test_no_unexpected_output() {
        let mut game_field = GameField::new(5, 5, vec![(2, 0)], vec![]);
        let mut output = String::new();
        game_field.drop_figure_steps(&mut output);
        assert!(!output.contains("DEBUG"));
    }

    #[test]
    fn test_gamefield_creation() {
        let game_field = GameField::new(5, 5, vec![(2, 0)], vec![]);
        assert_eq!(game_field.width, 5);
        assert_eq!(game_field.height, 5);
        assert_eq!(game_field.figure, vec![(2, 0)]);
        assert_eq!(game_field.landscape, vec![]);
    }

    #[test]
    fn test_drop_figure_steps_simple() {
        let mut game_field = GameField::new(5, 5, vec![(2, 0)], vec![]);
        let mut output = String::new();

        game_field.drop_figure_steps(&mut output);
        assert_eq!(game_field.landscape, vec![(2, 4)]);
        assert!(output.contains("STEP 0"));
        assert!(output.contains("STEP 1"));
    }

    #[test]
    fn test_drop_figure_blocks_by_landscape() {
        let mut game_field = GameField::new(5, 5, vec![(2, 0)], vec![(2, 3)]);
        let mut output = String::new();

        game_field.drop_figure_steps(&mut output);
        assert_eq!(game_field.landscape, vec![(2, 3), (2, 2)]);
        assert!(output.contains("STEP 0"));
        assert!(output.contains("STEP 1"));
        assert!(!output.contains("STEP 3"));
    }

    #[test]
    fn test_multiple_figures() {
        let mut game_field = GameField::new(5, 5, vec![(2, 0), (3, 0)], vec![]);
        let mut output = String::new();

        game_field.drop_figure_steps(&mut output);
        assert_eq!(game_field.landscape, vec![(2, 4), (3, 4)]);
        assert!(output.contains("STEP 0"));
        assert!(output.contains("STEP 4"));
    }

    #[test]
    fn test_large_field_with_simple_figure() {
        let mut game_field = GameField::new(10, 10, vec![(5, 0)], vec![]);
        let mut output = String::new();

        game_field.drop_figure_steps(&mut output);

        assert!(game_field.landscape.contains(&(5, 9)));
        assert_eq!(game_field.landscape.len(), 1);
    }

    #[test]
    fn test_complex_figure_falls_correctly() {
        let figure = vec![(2, 1), (3, 1), (4, 1), (3, 2)];
        let mut game_field = GameField::new(6, 6, figure, vec![]);
        let mut output = String::new();

        game_field.drop_figure_steps(&mut output);

        let expected_landscape = vec![(2, 4), (3, 4), (4, 4), (3, 5)];
        assert_eq!(game_field.landscape, expected_landscape);
    }

    #[test]
    fn test_figure_stops_on_landscape() {
        let landscape = vec![(3, 3)];
        let mut game_field = GameField::new(5, 5, vec![(3, 0)], landscape);
        let mut output = String::new();

        game_field.drop_figure_steps(&mut output);

        assert_eq!(game_field.landscape, vec![(3, 3), (3, 2)]);
    }

    #[test]
    fn test_multiple_figures_in_sequence() {
        let mut game_field = GameField::new(5, 5, vec![(2, 0)], vec![(2, 4)]);
        let mut output = String::new();

        game_field.drop_figure_steps(&mut output);
        assert!(game_field.landscape.contains(&(2, 3)));

        game_field.figure = vec![(3, 0)];
        game_field.drop_figure_steps(&mut output);
        assert!(game_field.landscape.contains(&(3, 4)));
    }

    #[test]
    fn test_no_movement_when_landscape_blocks() {
        let landscape = vec![(2, 1)];
        let mut game_field = GameField::new(5, 5, vec![(2, 0)], landscape);
        let mut output = String::new();

        game_field.drop_figure_steps(&mut output);

        assert_eq!(game_field.landscape, vec![(2, 1), (2, 0)]);
    }

    #[test]
    fn test_small_field_edge_case() {
        let mut game_field = GameField::new(1, 1, vec![(0, 0)], vec![]);
        let mut output = String::new();

        game_field.drop_figure_steps(&mut output);

        assert_eq!(game_field.landscape, vec![(0, 0)]);
    }

    #[test]
    fn test_drop_figure_steps_stop_on_landscape() {
        let mut game_field = GameField::new(
            5,
            5,
            vec![(2, 1), (3, 1)],
            vec![(2, 3), (3, 3)]
        );
        let mut output = String::new();

        game_field.drop_figure_steps(&mut output);

        assert_eq!(game_field.landscape, vec![(2, 3), (3, 3), (2, 2), (3, 2)]);
    }

    #[test]
    fn test_drop_figure_steps_multiple_steps() {
        let mut game_field = GameField::new(
            5,
            5,
            vec![(1, 0), (2, 0)],
            vec![(0, 4), (3, 4)]
        );
        let mut output = String::new();

        game_field.drop_figure_steps(&mut output);

        assert_eq!(game_field.landscape, vec![(0, 4), (3, 4), (1, 4), (2, 4)]);
        assert!(output.contains("STEP 4"));
    }

    #[test]
    fn test_drop_figure_steps_empty_landscape() {
        let mut game_field = GameField::new(5, 5, vec![(2, 0), (3, 0)], vec![]);
        let mut output = String::new();

        game_field.drop_figure_steps(&mut output);

        assert_eq!(game_field.landscape, vec![(2, 4), (3, 4)]);
        assert!(output.contains("STEP 4"));
    }

    #[test]
    fn test_drop_figure_steps_complex_figure() {
        let mut game_field = GameField::new(
            6,
            6,
            vec![(2, 0), (3, 0), (2, 1), (3, 1)],
            vec![(0, 5), (5, 5)]
        );
        let mut output = String::new();

        game_field.drop_figure_steps(&mut output);

        assert_eq!(
            game_field.landscape,
            vec![(0, 5), (5, 5), (2, 4), (3, 4), (2, 5), (3, 5)]
        );
        assert!(output.contains("STEP 4"));
    }

    #[test]
    fn test_drop_figure_steps_simple_case() {
        let mut game_field = GameField::new(4, 4, vec![(1, 0)], vec![]);
        let mut output = String::new();

        game_field.drop_figure_steps(&mut output);

        assert_eq!(game_field.landscape, vec![(1, 3)]);
        assert!(output.contains("STEP 3"));
    }

    #[test]
    fn test_drop_figure_steps_two_figures() {
        let mut game_field = GameField::new(5, 5, vec![(1, 0), (2, 0)], vec![]);
        let mut output = String::new();

        game_field.drop_figure_steps(&mut output);

        assert_eq!(game_field.landscape, vec![(1, 4), (2, 4)]);
        assert!(output.contains("STEP 4"));
    }

    #[test]
    fn test_drop_figure_steps_empty_field() {
        let mut game_field = GameField::new(5, 5, vec![(2, 0)], vec![]);
        let mut output = String::new();

        game_field.drop_figure_steps(&mut output);

        assert_eq!(game_field.landscape, vec![(2, 4)]);
        assert!(output.contains("STEP 4"));
    }

    #[test]
    fn test_drop_figure_steps_multiple_figures() {
        let mut game_field = GameField::new(6, 6, vec![(1, 0), (2, 0)], vec![]);
        let mut output = String::new();

        game_field.drop_figure_steps(&mut output);

        assert_eq!(game_field.landscape, vec![(1, 5), (2, 5)]);
        assert!(output.contains("STEP 5"));
    }

    #[test]
    fn test_drop_figure_final_basic_case() {
        let mut game_field = GameField::new(5, 5, vec![(2, 0)], vec![]);
        let mut output = String::new();

        game_field.drop_figure_final(&mut output);

        assert_eq!(game_field.landscape, vec![(2, 4)]);
        assert!(output.ends_with(".....\n.....\n.....\n.....\n..p.."));
    }

    #[test]
    fn test_large_figure() {
        let figure = vec![(0, 0), (1, 0), (2, 0), (3, 0), (4, 0)];
        let mut game_field = GameField::new(5, 5, figure, vec![]);
        let mut output = String::new();

        game_field.drop_figure_final(&mut output);

        assert!(game_field.landscape.contains(&(0, 4)));
        assert!(game_field.landscape.contains(&(4, 4)));
    }

    #[test]
    fn test_figure_outside_bounds() {
        let mut game_field = GameField::new(5, 5, vec![(6, 0)], vec![]);
        let mut output = String::new();

        game_field.drop_figure_final(&mut output);
        assert_eq!(game_field.landscape, vec![(6, 4)]);
    }

    #[test]
    fn test_drop_figure_final_simple() {
        let mut game_field = GameField::new(5, 5, vec![(2, 0)], vec![]);
        let mut output = String::new();

        game_field.drop_figure_final(&mut output);
        assert_eq!(game_field.landscape, vec![(2, 4)]);
        assert!(output.contains("p"));
    }
    
    #[test]
    fn test_drop_figure_final_reaches_bottom() {
        let mut game_field = GameField::new(5, 5, vec![(0, 0)], vec![]);
        let mut output = String::new();

        game_field.drop_figure_final(&mut output);

        assert_eq!(game_field.landscape, vec![(0, 4)]);
        assert!(output.ends_with(".....\n.....\n.....\n.....\np...."));
    }

    #[test]
    fn test_drop_figure_final_stop_on_landscape() {
        let mut game_field = GameField::new(
            5,
            5,
            vec![(1, 0)],
            vec![(1, 3)]
        );
        let mut output = String::new();

        game_field.drop_figure_final(&mut output);

        assert_eq!(game_field.landscape, vec![(1, 3), (1, 2)]);
    }

    #[test]
    fn test_to_string_no_figure_or_landscape() {
        let game_field = GameField::new(4, 4, vec![], vec![]);
        let expected = "....\n....\n....\n....";
        assert_eq!(game_field.to_string(), expected);
    }

    #[test]
    fn test_to_string_with_large_field() {
        let figure = vec![(1, 1), (2, 2)];
        let landscape = vec![(0, 3), (3, 3)];
        let game_field = GameField::new(4, 5, figure, landscape);

        let expected = "\
    ....\n\
    .p..\n\
    ..p.\n\
    #..#\n\
    ....";
        assert_eq!(game_field.to_string(), expected);
    }

    #[test]
    fn test_to_string_empty_field() {
        let game_field = GameField::new(4, 4, vec![], vec![]);
        let expected = "....\n....\n....\n....";
        assert_eq!(game_field.to_string(), expected);
    }

    #[test]
    fn test_to_string() {
        let width = 5;
        let height = 5;
        let figure = vec![(1, 2)];
        let landscape = vec![(0, 4), (3, 4)];

        let game_field = GameField::new(width, height, figure.clone(), landscape.clone());

        let expected_output = "\
.....
.....
.p...
.....
#..#.".to_string();

        assert_eq!(game_field.to_string(), expected_output);
    }

    #[test]
    fn test_empty_field() {
        let game_field = GameField::new(5, 5, Vec::new(), Vec::new());
        let expected = ".....\n.....\n.....\n.....\n.....";
        assert_eq!(game_field.to_string(), expected);
    }

    #[test]
    fn test_field_with_landscape() {
        let landscape = vec![(0, 0), (1, 0), (2, 0), (3, 0), (4, 0)];
        let game_field = GameField::new(5, 5, Vec::new(), landscape);
        let expected = "#####\n.....\n.....\n.....\n.....";
        assert_eq!(game_field.to_string(), expected);
    }

    #[test]
    fn test_field_with_figure() {
        let figure = vec![(2, 2), (2, 3), (3, 3)];
        let game_field = GameField::new(5, 5, figure, Vec::new());
        let expected = ".....\n.....\n..p..\n..pp.\n.....";
        assert_eq!(game_field.to_string(), expected);
    }

    #[test]
    fn test_field_with_figure_on_edge() {
        let figure = vec![(4, 4), (4, 3)];
        let game_field = GameField::new(5, 5, figure, Vec::new());
        let expected = ".....\n.....\n.....\n....p\n....p";
        assert_eq!(game_field.to_string(), expected);
    }

    #[test]
    fn test_field_with_full_landscape() {
        let landscape = vec![(0, 0), (1, 0), (2, 0), (3, 0), (4, 0), 
                             (0, 1), (1, 1), (2, 1), (3, 1), (4, 1)];
        let game_field = GameField::new(5, 5, Vec::new(), landscape);
        let expected = "#####\n#####\n.....\n.....\n.....";
        assert_eq!(game_field.to_string(), expected);
    }

    #[test]
    fn test_full_landscape_field() {
        let landscape = (0..5).flat_map(|y| (0..5).map(move |x| (x, y))).collect::<Vec<_>>();
        let game_field = GameField::new(5, 5, Vec::new(), landscape);
        let expected = "#####\n#####\n#####\n#####\n#####";
        assert_eq!(game_field.to_string(), expected);
    }
}