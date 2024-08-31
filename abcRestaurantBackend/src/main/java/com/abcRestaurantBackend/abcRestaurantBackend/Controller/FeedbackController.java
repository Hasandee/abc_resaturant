package com.abcRestaurantBackend.abcRestaurantBackend.Controller;

import com.abcRestaurantBackend.abcRestaurantBackend.Model.Feedback;
import com.abcRestaurantBackend.abcRestaurantBackend.Service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @GetMapping
    public ResponseEntity<List<Feedback>> getAllFeedbacks() {
        return new ResponseEntity<>(feedbackService.allFeedback(), HttpStatus.OK);
    }

    @GetMapping("/{feedbackId}")
    public ResponseEntity<Optional<Feedback>> getSingleFeedback(@PathVariable String feedbackId) {
        return new ResponseEntity<>(feedbackService.singleFeedback(feedbackId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Feedback> addFeedback(@RequestBody Feedback feedback) {
        Feedback newFeedback = feedbackService.addFeedback(feedback);
        return new ResponseEntity<>(newFeedback, HttpStatus.CREATED);
    }

    // Update an existing feedback by feedbackId
    @PutMapping("/{feedbackId}")
    public ResponseEntity<Feedback> updateFeedback(@PathVariable("feedbackId") String feedbackId, @RequestBody Feedback feedback) {
        Feedback updatedFeedback = feedbackService.updateFeedback(feedbackId, feedback);
        return ResponseEntity.ok(updatedFeedback);
    }

    // Delete a feedback by feedbackId
    @DeleteMapping("/{feedbackId}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable("feedbackId") String feedbackId) {
        feedbackService.deleteFeedback(feedbackId);
        return ResponseEntity.noContent().build();
    }
}
