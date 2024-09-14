package com.abcRestaurantBackend.abcRestaurantBackend.Service;

import com.abcRestaurantBackend.abcRestaurantBackend.Exception.ResourceNotFoundException;
import com.abcRestaurantBackend.abcRestaurantBackend.Model.User;
import com.abcRestaurantBackend.abcRestaurantBackend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> allUser() {
        try {
            return userRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error while fetching users: " + e.getMessage(), e);
        }
    }

    public Optional<User> singleUser(String userId) {  // Change ObjectId to String
        try {
            return userRepository.findById(userId);
        } catch (Exception e) {
            throw new RuntimeException("Error while fetching user with ID " + userId + ": " + e.getMessage(), e);
        }
    }

    public User addUser(User user) {
        try {
            if (user.getUserId() == null || user.getUserId().isEmpty()) {
                user.setUserId(generateUserId());  // Ensure userId is set
            }
            return userRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException("Error while adding user: " + e.getMessage(), e);
        }
    }

    public User updateUser(String userId, User user) {  // Change ObjectId to String
        try {
            if (!userRepository.existsById(userId)) {
                throw new ResourceNotFoundException("User not found with userId " + userId);
            }
            user.setUserId(userId);  // Set the userId before saving
            return userRepository.save(user);
        } catch (ResourceNotFoundException e) {
            throw e;  // Keep custom exceptions
        } catch (Exception e) {
            throw new RuntimeException("Error while updating user with ID " + userId + ": " + e.getMessage(), e);
        }
    }

    public void deleteUser(String userId) {  // Change ObjectId to String
        try {
            if (!userRepository.existsById(userId)) {
                throw new ResourceNotFoundException("User not found with userId " + userId);
            }
            userRepository.deleteById(userId);
        } catch (ResourceNotFoundException e) {
            throw e;  // Keep custom exceptions
        } catch (Exception e) {
            throw new RuntimeException("Error while deleting user with ID " + userId + ": " + e.getMessage(), e);
        }
    }

    private String generateUserId() {
        List<User> users = userRepository.findAll();
        int maxId = 0;
        for (User user : users) {
            String userId = user.getUserId();
            try {
                int numericPart = Integer.parseInt(userId.split("-")[1]);
                if (numericPart > maxId) {
                    maxId = numericPart;
                }
            } catch (Exception e) {
                // Handle exception
            }
        }
        int nextId = maxId + 1;
        return String.format("U-%03d", nextId);
    }
}