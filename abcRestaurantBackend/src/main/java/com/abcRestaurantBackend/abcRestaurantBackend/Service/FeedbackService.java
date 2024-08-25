package com.abcRestaurantBackend.abcRestaurantBackend.Service;

import com.abcRestaurantBackend.abcRestaurantBackend.Exception.ResourceNotFoundException;
import com.abcRestaurantBackend.abcRestaurantBackend.Model.Feedback;
import com.abcRestaurantBackend.abcRestaurantBackend.Repository.FeedbackRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;

    // Get all feedback
    public List<Feedback> allFeedback() {
        return feedbackRepository.findAll();
    }

    // Get a single feedback by id
    public Optional<Feedback> singleFeedback(ObjectId id) {
        return feedbackRepository.findById(id);
    }

    // Add a new feedback
    public Feedback addFeedback(Feedback feedback) {
        feedback.setFeedbackId(generateFeedbackId());
        return feedbackRepository.save(feedback);
    }

    // Generate a new feedback ID
    private String generateFeedbackId() {
        long count = feedbackRepository.count();
        return String.format("E-%03d", count + 1);
    }

    // Update an existing feedback by id
    public Feedback updateFeedback(ObjectId id, Feedback feedback) {
        if (!feedbackRepository.existsById(id)) {
            throw new ResourceNotFoundException("Feedback not found with id " + id);
        }
        // Ensure the ID in the request body matches the ID in the URL
        feedback.setId(id);
        return feedbackRepository.save(feedback);
    }

    // Delete a feedback by id
    public void deleteFeedback(ObjectId id) {
        if (!feedbackRepository.existsById(id)) {
            throw new ResourceNotFoundException("Feedback not found with id " + id);
        }
        feedbackRepository.deleteById(id);
    }
}