package com.abcRestaurantBackend.abcRestaurantBackend.Repository;

import com.abcRestaurantBackend.abcRestaurantBackend.Model.Feedback;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface FeedbackRepository extends MongoRepository<Feedback, String> {
    Optional<Feedback> findByFeedbackId(String feedbackId);

    void deleteByFeedbackId(String feedbackId);

    boolean existsByFeedbackId(String feedbackId);
}
