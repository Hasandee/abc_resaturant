package com.abcRestaurantBackend.abcRestaurantBackend;

import com.abcRestaurantBackend.abcRestaurantBackend.Exception.ResourceNotFoundException;
import com.abcRestaurantBackend.abcRestaurantBackend.Model.Feedback;
import com.abcRestaurantBackend.abcRestaurantBackend.Repository.FeedbackRepository;
import com.abcRestaurantBackend.abcRestaurantBackend.Service.FeedbackService;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class FeedbackServiceTest {

    @Mock
    private FeedbackRepository feedbackRepository;

    @InjectMocks
    private FeedbackService feedbackService;

    private Feedback feedback;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        feedback = new Feedback(new ObjectId(), "F-001", "user123", "Great food!", 5, "2023-09-07");
    }

    @Test
    void testAllFeedback() {
        List<Feedback> feedbackList = Arrays.asList(feedback);
        when(feedbackRepository.findAll()).thenReturn(feedbackList);

        List<Feedback> result = feedbackService.allFeedback();

        assertEquals(1, result.size());
        assertEquals(feedback.getFeedbackId(), result.get(0).getFeedbackId());
    }

    @Test
    void testSingleFeedbackFound() {
        when(feedbackRepository.findByFeedbackId("F-001")).thenReturn(Optional.of(feedback));

        Optional<Feedback> result = feedbackService.singleFeedback("F-001");

        assertTrue(result.isPresent());
        assertEquals("F-001", result.get().getFeedbackId());
    }

    @Test
    void testSingleFeedbackNotFound() {
        when(feedbackRepository.findByFeedbackId("F-002")).thenReturn(Optional.empty());

        Optional<Feedback> result = feedbackService.singleFeedback("F-002");

        assertFalse(result.isPresent());
    }

    @Test
    void testAddFeedback() {
        when(feedbackRepository.save(any(Feedback.class))).thenReturn(feedback);

        Feedback result = feedbackService.addFeedback(feedback);

        assertNotNull(result);
        assertEquals("F-001", result.getFeedbackId());
    }

    @Test
    void testUpdateFeedbackSuccess() {
        when(feedbackRepository.existsByFeedbackId("F-001")).thenReturn(true);
        when(feedbackRepository.save(any(Feedback.class))).thenReturn(feedback);

        Feedback updatedFeedback = feedbackService.updateFeedback("F-001", feedback);

        assertNotNull(updatedFeedback);
        assertEquals("F-001", updatedFeedback.getFeedbackId());
    }

    @Test
    void testUpdateFeedbackNotFound() {
        when(feedbackRepository.existsByFeedbackId("F-002")).thenReturn(false);

        assertThrows(ResourceNotFoundException.class, () -> feedbackService.updateFeedback("F-002", feedback));
    }

    @Test
    void testDeleteFeedbackSuccess() {
        when(feedbackRepository.existsByFeedbackId("F-001")).thenReturn(true);

        feedbackService.deleteFeedback("F-001");

        verify(feedbackRepository, times(1)).deleteByFeedbackId("F-001");
    }

    @Test
    void testDeleteFeedbackNotFound() {
        when(feedbackRepository.existsByFeedbackId("F-002")).thenReturn(false);

        assertThrows(ResourceNotFoundException.class, () -> feedbackService.deleteFeedback("F-002"));
    }
}
