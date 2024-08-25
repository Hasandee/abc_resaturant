package com.abcRestaurantBackend.abcRestaurantBackend.Service;

import com.abcRestaurantBackend.abcRestaurantBackend.Exception.ResourceNotFoundException;
import com.abcRestaurantBackend.abcRestaurantBackend.Model.User;
import com.abcRestaurantBackend.abcRestaurantBackend.Repository.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    // Get all users
    public List<User> allUser() {
        return userRepository.findAll();
    }

    // Get a single user by id
    public Optional<User> singleUser(ObjectId id) {
        return userRepository.findById(id);
    }

    // Add a new user
    public User addUser(User user) {
        user.setUserId(generateUserId());
        return userRepository.save(user);
    }

    // Generate a new user ID
    private String generateUserId() {
        long count = userRepository.count();
        return String.format("U-%03d", count + 1);
    }

    // Update an existing user by id
    public User updateUser(ObjectId id, User user) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id " + id);
        }
        // Ensure the ID in the request body matches the ID in the URL
        user.setId(id);
        return userRepository.save(user);
    }

    // Delete a user by id
    public void deleteUser(ObjectId id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id " + id);
        }
        userRepository.deleteById(id);
    }
}