package com.abcRestaurantBackend.abcRestaurantBackend.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    public Path getPath(String filename) {
        return Paths.get(uploadDir).resolve(filename);
    }

    public Resource loadAsResource(String filename) throws IOException {
        Path file = getPath(filename);
        return new UrlResource(file.toUri());
    }

    public String saveFile(byte[] fileBytes, String filename) throws IOException {
        // Generate a unique filename with a timestamp
        String timestamp = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
        String fileExtension = "";

        // Extract file extension if present
        if (filename != null && filename.contains(".")) {
            fileExtension = filename.substring(filename.lastIndexOf('.'));
        }
        String savedFilename = "image-" + timestamp + fileExtension;
        Path targetLocation = getPath(savedFilename);

        // Ensure the directory exists
        Files.createDirectories(targetLocation.getParent());

        // Save the file
        Files.write(targetLocation, fileBytes);
        return savedFilename;
    }

    public String handleProfilePictureUpload(MultipartFile imageFile) throws IOException {
        return saveFile(imageFile.getBytes(), imageFile.getOriginalFilename());
    }
}
