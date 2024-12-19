use std::fs;

pub fn read_input(path: &str) -> Result<String, std::io::Error> {
    fs::read_to_string(path)
}

pub fn write_output(path: &str, data: &str) -> Result<(), std::io::Error> {
    fs::write(path, data)
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::fs;
    use tempfile::NamedTempFile;
    
    #[test]
    fn test_read_input_valid_file() {
        let temp_file: NamedTempFile = NamedTempFile::new().expect("Не вдалося створити тимчасовий файл");
        let file_path = temp_file.path().to_str().expect("Не вдалося отримати шлях до файлу");

        fs::write(file_path, "Test data").expect("Не вдалося записати в файл");

        let result = read_input(file_path);
        assert!(result.is_ok());
        assert_eq!(result.unwrap(), "Test data");
    }

    #[test]
    fn test_read_input_invalid_file() {
        let result = read_input("non_existent_file.txt");
        assert!(result.is_err());
    }

    #[test]
    fn test_write_output_valid_file() {
        let temp_file = NamedTempFile::new().expect("Не вдалося створити тимчасовий файл");
        let file_path = temp_file.path().to_str().expect("Не вдалося отримати шлях до файлу");

        let result = write_output(file_path, "Test data");
        assert!(result.is_ok());

        let content = fs::read_to_string(file_path).expect("Не вдалося прочитати з файлу");
        assert_eq!(content, "Test data");
    }

    #[test]
    fn test_write_output_invalid_path() {
        let result = write_output("/invalid/path/to/file.txt", "Test data");
        assert!(result.is_err());
    }
}