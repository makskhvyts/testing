mod game_logic;
mod io;
mod communication;
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    let output_option = if args.len() > 1 {
        &args[1]
    } else {
        "final"
    };

    communication::run_game_from_file(output_option);
}