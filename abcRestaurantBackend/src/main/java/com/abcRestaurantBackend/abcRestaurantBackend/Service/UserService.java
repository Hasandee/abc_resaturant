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
            throw new RuntimeException("Error retrieving all users", e);
        }
    }

    public Optional<User> singleUser(String userId) {
        try {
            return userRepository.findById(userId);
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving user with ID: " + userId, e);
        }
    }

    /*public User addUser(User user) {
        try {

                user.setUserId(generateUserId());

            return userRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException("Error adding new user", e);
        }
    }*/

    public User addUser(User user){


        user.setUserId(generateUserId());
        user.setUsername(user.getUsername());
        user.setUserEmail(user.getUserEmail());
        user.setPassword(user.getPassword());
        user.setUserType(user.getUserType());

        return userRepository.save(user);
    }






    public User updateUser(String userId, User user) {
        try {
            if (!userRepository.existsById(userId)) {
                throw new ResourceNotFoundException("User not found with userId: " + userId);
            }
            user.setUserId(userId);  // Set the userId before saving
            return userRepository.save(user);
        } catch (ResourceNotFoundException e) {
            throw e;  // Re-throw if it's a resource not found exception
        } catch (Exception e) {
            throw new RuntimeException("Error updating user with ID: " + userId, e);
        }
    }

    public void deleteUser(String userId) {
        try {
            if (!userRepository.existsById(userId)) {
                throw new ResourceNotFoundException("User not found with userId: " + userId);
            }
            userRepository.deleteById(userId);
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Error deleting user with ID: " + userId, e);
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
            } catch (NumberFormatException | ArrayIndexOutOfBoundsException e) {
                System.err.println("Error parsing userId: " + userId + ". Skipping this entry.");
            }
        }
        int nextId = maxId + 1;
        return String.format("u-%03d", nextId);
    }
}
