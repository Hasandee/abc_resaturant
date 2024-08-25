package com.abcRestaurantBackend.abcRestaurantBackend.Service;

import com.abcRestaurantBackend.abcRestaurantBackend.Exception.ResourceNotFoundException;
import com.abcRestaurantBackend.abcRestaurantBackend.Model.Payment;
import com.abcRestaurantBackend.abcRestaurantBackend.Repository.PaymentRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    // Get all payment
    public List<Payment> allPayment() {
        return paymentRepository.findAll();
    }

    // Get a single payment by id
    public Optional<Payment> singlePayment(ObjectId id) {
        return paymentRepository.findById(id);
    }

    // Add a new payment
    public Payment addPayment(Payment payment) {
        payment.setPaymentId(generatePaymentId());
        return paymentRepository.save(payment);
    }

    // Generate a new payment ID
    private String generatePaymentId() {
        long count = paymentRepository.count();
        return String.format("A-%03d", count + 1);
    }

    // Update an existing Payment by id
    public Payment updatePayment(ObjectId id, Payment payment) {
        if (!paymentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Payment not found with id " + id);
        }
        // Ensure the ID in the request body matches the ID in the URL
        payment.setId(id);
        return paymentRepository.save(payment);
    }

    // Delete a payment by id
    public void deletePayment(ObjectId id) {
        if (!paymentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Payment not found with id " + id);
        }
        paymentRepository.deleteById(id);
    }
}
