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

    public List<User> allUser() {
        return userRepository.findAll();
    }

    public Optional<User> singleUser(ObjectId id) {
        return userRepository.findById(id);
    }

    public User addUser(User user) {
        user.setUserId(generateUserId());
        return userRepository.save(user);
    }

    private String generateUserId() {
        long count = userRepository.count();
        return String.format("U-%03d", count + 1);
    }

    public User updateUser(ObjectId id, User user) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id " + id);
        }
        user.setId(id);
        return userRepository.save(user);
    }

    public void deleteUser(ObjectId id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with id " + id);
        }
        userRepository.deleteById(id);
    }
}
