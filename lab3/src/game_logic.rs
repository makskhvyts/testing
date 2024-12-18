#[derive(Clone, Debug)]
pub struct GameField {
    pub width: usize,
    pub height: usize,
    pub figure: Vec<(usize, usize)>,
    pub landscape: Vec<(usize, usize)>,
}

impl GameField {
    pub fn new(width: usize, height: usize, figure: Vec<(usize, usize)>, landscape: Vec<(usize, usize)>) -> Self {
        GameField { width, height, figure, landscape }
    }

    pub fn drop_figure(&mut self) {
        loop {
            let mut new_figure = Vec::new();
            let mut can_move = true;

            for (x, y) in &self.figure {
                let new_y = y + 1;
                if new_y < self.height && !self.landscape.contains(&(*x, new_y)) {
                    new_figure.push((*x, new_y));
                } else {
                    can_move = false;
                    break;
                }
            }

            if can_move {
                self.figure = new_figure;
            } else {
                self.landscape.extend(self.figure.clone());
                return;
            }
        }
    }

    #[allow(dead_code)]
    pub fn to_string(&self) -> String {
        let mut field = vec![vec!['.'; self.width]; self.height];

        for (x, y) in &self.landscape {
            if *y < self.height && *x < self.width {
                field[*y][*x] = '#';
            }
        }

        for (x, y) in &self.figure {
            if *y < self.height && *x < self.width {
                field[*y][*x] = 'p';
            }
        }

        field.iter()
            .map(|row| row.iter().collect::<String>())
            .collect::<Vec<String>>()
            .join("\n")
    }
}