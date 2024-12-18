use std::fs;
use tempfile::NamedTempFile;
#[path = "../src/io.rs"] mod io;
use crate::io::{read_input, write_output};

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_read_input() {
        let temp_file = NamedTempFile::new().expect("Failed to create temporary file");
        let file_path = temp_file.path().to_str().expect("Failed to get file path");

        let test_data = "Test file content";
        fs::write(file_path, test_data).expect("Failed to write to temporary file");

        let content = read_input(file_path).expect("Failed to read input from file");
        assert_eq!(content, test_data, "The content read from the file should match the written data");
    }

    #[test]
    fn test_write_output() {
        let temp_file = NamedTempFile::new().expect("Failed to create temporary file");
        let file_path = temp_file.path().to_str().expect("Failed to get file path");
    
        let data_to_write = "This is test text for writing";
    
        write_output(file_path, data_to_write).expect("Failed to write output to file");
    
        let content = fs::read_to_string(file_path).expect("Failed to read the file after writing");
        assert_eq!(content, data_to_write, "The content in the file should match the written data");
    }
    
    #[test]
    fn test_read_input_invalid_file() {
        let invalid_path = "non_existent_file.txt";
        let result = read_input(invalid_path);
        assert!(result.is_err(), "Expected an error when reading non-existent file");
    }    

    #[test]
    fn test_read_input_empty_file() {
        let temp_file = NamedTempFile::new().expect("Failed to create temporary file");
        let file_path = temp_file.path().to_str().expect("Failed to get file path");

        fs::write(file_path, "").expect("Failed to write empty content to the file");

        let content = read_input(file_path).expect("Failed to read the empty file");
        assert_eq!(content, "", "The content of the empty file should be an empty string");
    }

    #[test]
    fn test_write_output_empty_data() {
        let temp_file = NamedTempFile::new().expect("Failed to create temporary file");
        let file_path = temp_file.path().to_str().expect("Failed to get file path");

        let empty_data = "";
        write_output(file_path, empty_data).expect("Failed to write empty data to the file");

        let content = fs::read_to_string(file_path).expect("Failed to read the file after writing empty data");
        assert_eq!(content, empty_data, "The content in the file should be an empty string");
    }

    #[test]
    fn test_large_file() {
        let temp_file = NamedTempFile::new().expect("Failed to create temporary file");
        let file_path = temp_file.path().to_str().expect("Failed to get file path");

        let large_data = "A".repeat(1_000_000);
        write_output(file_path, &large_data).expect("Failed to write large data to the file");

        let content = read_input(file_path).expect("Failed to read the large file");
        assert_eq!(content, large_data, "The content read from the file should match the large written data");
    }

    #[test]
    fn test_write_output_file_exists() {
        let temp_file = NamedTempFile::new().expect("Failed to create temporary file");
        let file_path = temp_file.path().to_str().expect("Failed to get file path");

        let data_to_write = "Test content";
        write_output(file_path, data_to_write).expect("Failed to write test content to the file");

        assert!(std::path::Path::new(file_path).exists(), "The file should exist after writing content");
    }

    #[test]
    fn test_write_output_overwrite_existing_file() {
        let temp_file = NamedTempFile::new().expect("Failed to create temporary file");
        let file_path = temp_file.path().to_str().expect("Failed to get file path");

        let initial_data = "Initial content";
        write_output(file_path, initial_data).expect("Failed to write initial data");

        let new_data = "New content";
        write_output(file_path, new_data).expect("Failed to overwrite file");

        let content = fs::read_to_string(file_path).expect("Failed to read the file after overwrite");
        assert_eq!(content, new_data, "The content in the file should be overwritten");
    }

    #[test]
    fn test_write_output_invalid_path() {
        let invalid_path = "/invalid/path/to/file.txt";
        let result = write_output(invalid_path, "Test data");
        assert!(result.is_err(), "Writing to an invalid path should result in an error");
    }

    #[test]
    fn test_special_characters_in_write_and_read() {
        let temp_file = NamedTempFile::new().expect("Failed to create temporary file");
        let file_path = temp_file.path().to_str().expect("Failed to get file path");

        let special_data = "Hello, world! @$%^&*()_+";
        write_output(file_path, special_data).expect("Failed to write special characters to file");

        let content = read_input(file_path).expect("Failed to read the file");
        assert_eq!(content, special_data, "The content should match with special characters");
    }
}