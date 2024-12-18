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
    fn test_drop_figure_on_top() {
        let figure = vec![(0, 0), (1, 0), (2, 0)];
        let landscape = vec![(0, 0), (1, 0), (2, 0), (3, 0)];
        let mut field = GameField::new(5, 5, figure.clone(), landscape.clone());

        field.drop_figure();

        let expected_figure = vec![(0, 4), (1, 4), (2, 4)];
        let expected_landscape = vec![(0, 0), (1, 0), (2, 0), (3, 0), (0, 4), (1, 4), (2, 4)];
        assert_eq!(field.figure, expected_figure);
        assert_eq!(field.landscape, expected_landscape);
    }

    #[test]
    fn test_large_field_with_figures() {
        let figure = vec![(1, 1), (2, 1), (3, 1)];
        let landscape = vec![(0, 0), (4, 0)];
        let mut field = GameField::new(100, 100, figure.clone(), landscape.clone());

        field.drop_figure();

        let expected_figure = vec![(1, 99), (2, 99), (3, 99)];
        let expected_landscape = vec![(0, 0), (4, 0), (1, 99), (2, 99), (3, 99)];
        assert_eq!(field.figure, expected_figure);
        assert_eq!(field.landscape, expected_landscape);
    }

    #[test]
    fn test_figure_falls_one_row() {
        let figure = vec![(1, 0), (2, 0), (3, 0)];
        let landscape = vec![(0, 0), (1, 0), (2, 0), (3, 0), (4, 0)];
        let mut field = GameField::new(5, 5, figure.clone(), landscape.clone());

        field.drop_figure();

        let expected_figure = vec![(1, 4), (2, 4), (3, 4)];
        let expected_landscape = vec![(0, 0), (1, 0), (2, 0), (3, 0), (4, 0), (1, 4), (2, 4), (3, 4)];
        assert_eq!(field.figure, expected_figure);
        assert_eq!(field.landscape, expected_landscape);
    }

    #[test]
    fn test_figure_at_top() {
        let figure = vec![(1, 0), (2, 0), (3, 0)];
        let landscape = vec![(0, 0), (4, 0)];
        let mut field = GameField::new(5, 5, figure.clone(), landscape.clone());

        field.drop_figure();

        let expected_figure = vec![(1, 4), (2, 4), (3, 4)];
        let expected_landscape = vec![(0, 0), (4, 0), (1, 4), (2, 4), (3, 4)];
        assert_eq!(field.figure, expected_figure);
        assert_eq!(field.landscape, expected_landscape);
    }

    #[test]
    fn test_figure_at_bottom() {
        let figure = vec![(1, 4), (2, 4), (3, 4)];
        let landscape = vec![(0, 0), (1, 0), (2, 0), (3, 0), (4, 0)];
        let mut field = GameField::new(5, 5, figure.clone(), landscape.clone());

        field.drop_figure();

        let expected_figure = vec![(1, 4), (2, 4), (3, 4)];
        let expected_landscape = vec![(0, 0), (1, 0), (2, 0), (3, 0), (4, 0), (1, 4), (2, 4), (3, 4)];
        assert_eq!(field.figure, expected_figure);
        assert_eq!(field.landscape, expected_landscape);
    }

    #[test]
    fn test_empty_landscape() {
        let figure = vec![(1, 1), (2, 1), (3, 1)];
        let landscape = vec![];
        let mut field = GameField::new(5, 5, figure.clone(), landscape.clone());

        field.drop_figure();

        let expected_figure = vec![(1, 4), (2, 4), (3, 4)];
        let expected_landscape = vec![(1, 4), (2, 4), (3, 4)];
        assert_eq!(field.figure, expected_figure);
        assert_eq!(field.landscape, expected_landscape);
    }

    #[test]
    fn test_drop_in_narrow_space() {
        let figure = vec![(1, 0), (2, 0), (3, 0)];
        let landscape = vec![(0, 0), (4, 0)];
        let mut field = GameField::new(5, 5, figure.clone(), landscape.clone());

        field.drop_figure();

        let expected_figure = vec![(1, 4), (2, 4), (3, 4)];
        let expected_landscape = vec![(0, 0), (4, 0), (1, 4), (2, 4), (3, 4)];
        assert_eq!(field.figure, expected_figure);
        assert_eq!(field.landscape, expected_landscape);
    }

    #[test]
    fn test_multiple_figures() {
        let figure1 = vec![(1, 0), (2, 0), (3, 0)];
        let figure2 = vec![(1, 1), (2, 1), (3, 1)];
        let landscape = vec![(0, 0), (1, 0), (2, 0), (3, 0), (4, 0)];
        let mut field = GameField::new(5, 5, figure1.clone(), landscape.clone());

        field.drop_figure();
        assert_eq!(field.figure, vec![(1, 4), (2, 4), (3, 4)]);

        field.figure = figure2;
        field.drop_figure();

        assert_eq!(field.figure, vec![(1, 3), (2, 3), (3, 3)]);
        let mut expected_landscape = landscape.clone();
        expected_landscape.push((1, 4));
        expected_landscape.push((2, 4));
        expected_landscape.push((3, 4));
        expected_landscape.push((1, 3));
        expected_landscape.push((2, 3));
        expected_landscape.push((3, 3));
        assert_eq!(field.landscape, expected_landscape);
    }

    #[test]
    fn test_figure_falling_into_empty_space() {
        let figure = vec![(0, 0), (1, 0), (2, 0)];
        let landscape = vec![(0, 0), (1, 0), (2, 0), (3, 0)];
        let mut field = GameField::new(5, 5, figure.clone(), landscape.clone());

        field.drop_figure();

        let expected_figure = vec![(0, 4), (1, 4), (2, 4)];
        let expected_landscape = vec![(0, 0), (1, 0), (2, 0), (3, 0), (0, 4), (1, 4), (2, 4)];
        assert_eq!(field.figure, expected_figure);
        assert_eq!(field.landscape, expected_landscape);
    }

    #[test]
    fn test_number_of_figures_on_landscape() {
        let figure = vec![(0, 0), (1, 0), (2, 0)];
        let landscape = vec![(0, 0), (1, 0), (2, 0), (3, 0)];
        let mut field = GameField::new(5, 5, figure.clone(), landscape.clone());
    
        field.drop_figure();
    
        let expected_figure = vec![(0, 4), (1, 4), (2, 4)];
        let expected_landscape = vec![(0, 0), (1, 0), (2, 0), (3, 0), (0, 4), (1, 4), (2, 4)];
    
        assert_eq!(field.figure, expected_figure);
        assert_eq!(field.landscape, expected_landscape);
    
        assert_eq!(field.landscape.len(), 7);
    }
    
    #[test]
    fn test_full_row() {
        let figure = vec![(1, 0), (2, 0), (3, 0)];
        let landscape = vec![(0, 0), (1, 0), (2, 0), (3, 0), (4, 0)];
        let mut field = GameField::new(5, 5, figure.clone(), landscape.clone());

        field.drop_figure();

        let expected_figure = vec![(1, 4), (2, 4), (3, 4)];
        let expected_landscape = vec![(0, 0), (1, 0), (2, 0), (3, 0), (4, 0), (1, 4), (2, 4), (3, 4)];
        assert_eq!(field.figure, expected_figure);
        assert_eq!(field.landscape, expected_landscape);
    }

    #[test]
    fn test_multiple_figures_filling_rows() {
        let figure1 = vec![(1, 0), (2, 0), (3, 0)];
        let figure2 = vec![(1, 1), (2, 1), (3, 1)];
        let landscape = vec![(0, 0), (4, 0), (0, 1), (4, 1)];
        let mut field = GameField::new(5, 5, figure1.clone(), landscape.clone());

        field.drop_figure();
        assert_eq!(field.figure, vec![(1, 4), (2, 4), (3, 4)]);

        field.figure = figure2;
        field.drop_figure();
        assert_eq!(field.figure, vec![(1, 3), (2, 3), (3, 3)]);

        let mut expected_landscape = landscape.clone();
        expected_landscape.push((1, 4));
        expected_landscape.push((2, 4));
        expected_landscape.push((3, 4));
        expected_landscape.push((1, 3));
        expected_landscape.push((2, 3));
        expected_landscape.push((3, 3));
        assert_eq!(field.landscape, expected_landscape);
    }

    #[test]
    fn test_figure_overflow() {
        let figure = vec![(1, 4), (2, 4), (3, 4)];
        let landscape = vec![(0, 0), (1, 0), (2, 0), (3, 0), (4, 0)];
        let mut field = GameField::new(5, 5, figure.clone(), landscape.clone());
    
        field.drop_figure();
    
        let expected_figure = vec![(1, 4), (2, 4), (3, 4)];
        let expected_landscape = vec![(0, 0), (1, 0), (2, 0), (3, 0), (4, 0), (1, 4), (2, 4), (3, 4)];
        assert_eq!(field.figure, expected_figure);
        assert_eq!(field.landscape, expected_landscape);
    }    

    #[test]
    fn test_figure_falls_with_no_obstructions() {
        let figure = vec![(1, 0), (2, 0), (3, 0)];
        let landscape = vec![];
        let mut field = GameField::new(5, 5, figure.clone(), landscape.clone());

        field.drop_figure();

        let expected_figure = vec![(1, 4), (2, 4), (3, 4)];
        let expected_landscape = vec![(1, 4), (2, 4), (3, 4)];
        assert_eq!(field.figure, expected_figure);
        assert_eq!(field.landscape, expected_landscape);
    }

    #[test]
    fn test_drop_on_filled_row() {
        let figure = vec![(1, 0), (2, 0), (3, 0)];
        let landscape = vec![(0, 0), (1, 0), (2, 0), (3, 0), (4, 0), (1, 4), (2, 4), (3, 4)];
        let mut field = GameField::new(5, 5, figure.clone(), landscape.clone());

        field.drop_figure();

        let expected_figure = vec![(1, 3), (2, 3), (3, 3)];
        let expected_landscape = vec![(0, 0), (1, 0), (2, 0), (3, 0), (4, 0), (1, 4), (2, 4), (3, 4), (1, 3), (2, 3), (3, 3)];
        assert_eq!(field.figure, expected_figure);
        assert_eq!(field.landscape, expected_landscape);
    }

    #[test]
    fn test_empty_field_falling() {
        let figure = vec![(1, 0), (2, 0), (3, 0)];
        let landscape = vec![];
        let mut field = GameField::new(5, 5, figure.clone(), landscape.clone());

        field.drop_figure();

        let expected_figure = vec![(1, 4), (2, 4), (3, 4)];
        let expected_landscape = vec![(1, 4), (2, 4), (3, 4)];
        assert_eq!(field.figure, expected_figure);
        assert_eq!(field.landscape, expected_landscape);
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