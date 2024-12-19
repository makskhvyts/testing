#[path = "../src/game_logic.rs"] mod game_logic;
use crate::game_logic::GameField;
use rand::Rng;

#[test]
fn test_large_input() {
    let width = 1000;
    let height = 1000;
    
    let figure = (0..1000).map(|x| (x, 0)).collect::<Vec<(usize, usize)>>();
    let landscape = (0..1000).map(|x| (x, height - 1)).collect::<Vec<(usize, usize)>>();

    let mut game_field = GameField::new(width, height, figure, landscape);

    let mut output = String::new();
    game_field.drop_figure_steps(&mut output);

    assert!(output.len() > 0);
}

#[test]
fn test_random_large_input() {
    let width = 1000;
    let height = 1000;
    
    let mut rng = rand::thread_rng();
    let figure: Vec<(usize, usize)> = (0..500).map(|_| (rng.gen_range(0..width), rng.gen_range(0..height)) ).collect();

    let landscape = (0..1000).map(|x| (x, height - 1)).collect::<Vec<(usize, usize)>>();

    let mut game_field = GameField::new(width, height, figure, landscape);

    let mut output = String::new();
    game_field.drop_figure_steps(&mut output);

    assert!(output.len() > 0);
}

#[test]
fn test_many_figures() {
    let width = 1000;
    let height = 1000;
    
    let figure = (0..5000).map(|x| (x % width, x / width)).collect::<Vec<(usize, usize)>>();

    let landscape = (0..1000).map(|x| (x, height - 1)).collect::<Vec<(usize, usize)>>();

    let mut game_field = GameField::new(width, height, figure, landscape);

    let mut output = String::new();
    game_field.drop_figure_steps(&mut output);

    assert!(output.len() > 0);
}

#[test]
fn test_random_large_input_2() {
    let width = 10000;
    let height = 10000;
    
    let mut rng = rand::thread_rng();
    let figure: Vec<(usize, usize)> = (0..10000).map(|_| (rng.gen_range(0..width), rng.gen_range(0..height)) ).collect();

    let landscape = (0..10000).map(|x| (x, height - 1)).collect::<Vec<(usize, usize)>>();

    let mut game_field = GameField::new(width, height, figure, landscape);

    let mut output = String::new();
    game_field.drop_figure_steps(&mut output);

    assert!(output.len() > 0);
}

#[test]
fn test_edge_case_large_input() {
    let width = 1;
    let height = 10000;

    let figure = vec![(0, 0)];
    let landscape = (0..10000).map(|x| (x, height - 1)).collect::<Vec<(usize, usize)>>();

    let mut game_field = GameField::new(width, height, figure, landscape);

    let mut output = String::new();
    game_field.drop_figure_steps(&mut output);

    assert!(output.len() > 0);
}