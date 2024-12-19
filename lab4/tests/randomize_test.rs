#[path = "../src/game_logic.rs"] mod game_logic;
use crate::game_logic::GameField;

#[test]
fn test_randomized_game() {
    use rand::Rng;
    
    let mut rng = rand::thread_rng();
    let width = rng.gen_range(1..=10);
    let height = rng.gen_range(1..=10);
    
    let figure = vec![(rng.gen_range(0..width), 0)];
    let landscape = vec![(rng.gen_range(0..width), height - 1)];

    let mut game_field = GameField::new(width, height, figure, landscape);

    let mut output = String::new();
    game_field.drop_figure_steps(&mut output);

    assert!(output.contains("STEP"));
}

#[test]
fn test_randomized_large_figure() {
    use rand::Rng;

    let mut rng = rand::thread_rng();
    let width = rng.gen_range(5..=50);
    let height = rng.gen_range(5..=50);

    let figure_size = rng.gen_range(1..=10);
    let figure: Vec<(usize, usize)> = (0..figure_size)
        .map(|_| (rng.gen_range(0..width), rng.gen_range(0..height)))
        .collect();

    let landscape = (0..width).map(|x| (x, height - 1)).collect::<Vec<(usize, usize)>>();

    let mut game_field = GameField::new(width, height, figure, landscape);

    let mut output = String::new();
    game_field.drop_figure_steps(&mut output);

    assert!(output.contains("STEP"));
}

#[test]
fn test_randomized_multiple_figures() {
    use rand::Rng;

    let mut rng = rand::thread_rng();
    let width = rng.gen_range(10..=20);
    let height = rng.gen_range(10..=20);

    let num_figures = rng.gen_range(5..=20);
    let figure: Vec<(usize, usize)> = (0..num_figures)
        .map(|_| (rng.gen_range(0..width), rng.gen_range(0..height)))
        .collect();

    let landscape = (0..width).map(|x| (x, height - 1)).collect::<Vec<(usize, usize)>>();

    let mut game_field = GameField::new(width, height, figure, landscape);

    let mut output = String::new();
    game_field.drop_figure_steps(&mut output);

    assert!(output.contains("STEP"));
    assert!(output.len() > 0);
}

#[test]
fn test_randomized_empty_landscape() {
    use rand::Rng;

    let mut rng = rand::thread_rng();
    let width = rng.gen_range(10..=30);
    let height = rng.gen_range(5..=15);

    let figure = vec![(rng.gen_range(0..width), 0)];
    
    let landscape = (0..width).map(|x| (x, height - 1)).collect::<Vec<(usize, usize)>>();

    let mut game_field = GameField::new(width, height, figure, landscape);

    let mut output = String::new();
    game_field.drop_figure_steps(&mut output);

    assert!(output.contains("STEP"));
}

#[test]
fn test_randomized_edge_case_landscape() {
    use rand::Rng;

    let mut rng = rand::thread_rng();
    let width = rng.gen_range(5..=15);
    let height = rng.gen_range(5..=15);

    let figure = vec![(rng.gen_range(0..width), 0)];

    let landscape: Vec<(usize, usize)> = (0..width)
        .filter_map(|x| {
            if rng.gen_bool(0.5) {
                Some((x, rng.gen_range(0..height)))
            } else {
                None
            }
        })
        .collect();

    let mut game_field = GameField::new(width, height, figure, landscape);

    let mut output = String::new();
    game_field.drop_figure_steps(&mut output);

    assert!(output.contains("STEP"));
    assert!(output.len() > 0);
}

#[test]
fn test_randomized_variable_field_sizes() {
    use rand::Rng;

    let mut rng = rand::thread_rng();
    let width = rng.gen_range(1..=100);
    let height = rng.gen_range(1..=100);

    let figure = vec![(rng.gen_range(0..width), 0)];

    let landscape = (0..width).map(|x| (x, height - 1)).collect::<Vec<(usize, usize)>>();

    let mut game_field = GameField::new(width, height, figure, landscape);

    let mut output = String::new();
    game_field.drop_figure_steps(&mut output);

    assert!(output.contains("STEP"));
    assert!(output.len() > 0);
}