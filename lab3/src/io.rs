use std::fs;

pub fn read_input(path: &str) -> Result<String, std::io::Error> {
    fs::read_to_string(path)
}

pub fn write_output(path: &str, data: &str) -> Result<(), std::io::Error> {
    fs::write(path, data)
}