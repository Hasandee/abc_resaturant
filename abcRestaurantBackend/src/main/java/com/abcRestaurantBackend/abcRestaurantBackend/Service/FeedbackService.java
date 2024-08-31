package com.abcRestaurantBackend.abcRestaurantBackend.Service;

import com.abcRestaurantBackend.abcRestaurantBackend.Exception.ResourceNotFoundException;
import com.abcRestaurantBackend.abcRestaurantBackend.Model.Feedback;
import com.abcRestaurantBackend.abcRestaurantBackend.Repository.FeedbackRepository;
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

    // Get a single feedback by feedbackId
    public Optional<Feedback> singleFeedback(String feedbackId) {
        return feedbackRepository.findByFeedbackId(feedbackId);
    }

    // Add a new feedback
    public Feedback addFeedback(Feedback feedback) {
        feedback.setFeedbackId(generateFeedbackId());
        return feedbackRepository.save(feedback);
    }

    // Generate a new feedback ID
    private String generateFeedbackId() {
        long count = feedbackRepository.count();
        return String.format("F-%03d", count + 1);
    }

    // Update an existing feedback by feedbackId
    public Feedback updateFeedback(String feedbackId, Feedback feedback) {
        if (!feedbackRepository.existsByFeedbackId(feedbackId)) {
            throw new ResourceNotFoundException("Feedback not found with id " + feedbackId);
        }
        // Ensure the feedbackId in the request body matches the feedbackId in the URL
        feedback.setFeedbackId(feedbackId);
        return feedbackRepository.save(feedback);
    }

    // Delete a feedback by feedbackId
    public void deleteFeedback(String feedbackId) {
        if (!feedbackRepository.existsByFeedbackId(feedbackId)) {
            throw new ResourceNotFoundException("Feedback not found with id " + feedbackId);
        }
        feedbackRepository.deleteByFeedbackId(feedbackId);
    }
}
