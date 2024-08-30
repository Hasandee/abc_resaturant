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
        return userRepository.findAll();
    }

    public Optional<User> singleUser(String userId) {  // Change ObjectId to String
        return userRepository.findById(userId);
    }

    public User addUser(User user) {
        if (user.getUserId() == null || user.getUserId().isEmpty()) {
            user.setUserId(generateUserId());  // Ensure userId is set
        }
        return userRepository.save(user);
    }

    private String generateUserId() {
        long count = userRepository.count();
        return String.format("U-%03d", count + 1);
    }

    public User updateUser(String userId, User user) {  // Change ObjectId to String
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with userId " + userId);
        }
        user.setUserId(userId);  // Set the userId before saving
        return userRepository.save(user);
    }

    public void deleteUser(String userId) {  // Change ObjectId to String
        if (!userRepository.existsById(userId)) {
            throw new ResourceNotFoundException("User not found with userId " + userId);
        }
        userRepository.deleteById(userId);
    }
}
