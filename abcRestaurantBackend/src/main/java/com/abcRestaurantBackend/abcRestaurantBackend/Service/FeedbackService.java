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
        try {
            return feedbackRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error fetching feedback list", e);
        }
    }

    // Get a single feedback by feedbackId
    public Optional<Feedback> singleFeedback(String feedbackId) {
        try {
            return feedbackRepository.findByFeedbackId(feedbackId);
        } catch (Exception e) {
            throw new RuntimeException("Error fetching feedback with id " + feedbackId, e);
        }
    }

    // Add a new feedback
    public Feedback addFeedback(Feedback feedback) {
        try {
            feedback.setFeedbackId(generateFeedbackId());
            return feedbackRepository.save(feedback);
        } catch (Exception e) {
            throw new RuntimeException("Error adding new feedback", e);
        }
    }

    // Generate a new feedback ID
    private String generateFeedbackId() {
        try {
            long count = feedbackRepository.count();
            return String.format("F-%03d", count + 1);
        } catch (Exception e) {
            throw new RuntimeException("Error generating feedback ID", e);
        }
    }

    // Update an existing feedback by feedbackId
    public Feedback updateFeedback(String feedbackId, Feedback feedback) {
        try {
            if (!feedbackRepository.existsByFeedbackId(feedbackId)) {
                throw new ResourceNotFoundException("Feedback not found with id " + feedbackId);
            }
            feedback.setFeedbackId(feedbackId);  // Ensure feedbackId in the request matches the URL feedbackId
            return feedbackRepository.save(feedback);
        } catch (ResourceNotFoundException e) {
            throw e;  // Re-throw custom exceptions
        } catch (Exception e) {
            throw new RuntimeException("Error updating feedback with id " + feedbackId, e);
        }
    }

    // Delete a feedback by feedbackId
    public void deleteFeedback(String feedbackId) {
        try {
            if (!feedbackRepository.existsByFeedbackId(feedbackId)) {
                throw new ResourceNotFoundException("Feedback not found with id " + feedbackId);
            }
            feedbackRepository.deleteByFeedbackId(feedbackId);
        } catch (ResourceNotFoundException e) {
            throw e;  // Re-throw custom exceptions
        } catch (Exception e) {
            throw new RuntimeException("Error deleting feedback with id " + feedbackId, e);
        }
    }
}
