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

    pub fn drop_figure_steps(&mut self, output: &mut String) {
        let mut step = 1;

        output.push_str(&format!("STEP 0\n{}", self.to_string()));
        output.push_str("\n\n");

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

                output.push_str(&format!("STEP {}\n{}", step, self.to_string()));
                output.push_str("\n\n");

                step += 1;
            } else {
                self.landscape.extend(self.figure.clone());
                return;
            }
        }
    }

    pub fn drop_figure_final(&mut self, output: &mut String) {
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
                output.push_str(&self.to_string());
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