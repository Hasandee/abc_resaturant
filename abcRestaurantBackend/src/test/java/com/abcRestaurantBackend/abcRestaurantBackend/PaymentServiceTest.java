package com.abcRestaurantBackend.abcRestaurantBackend;

import com.abcRestaurantBackend.abcRestaurantBackend.Exception.ResourceNotFoundException;
import com.abcRestaurantBackend.abcRestaurantBackend.Model.Payment;
import com.abcRestaurantBackend.abcRestaurantBackend.Repository.PaymentRepository;
import com.abcRestaurantBackend.abcRestaurantBackend.Service.PaymentService;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PaymentServiceTest {

    @InjectMocks
    private PaymentService paymentService;

    @Mock
    private PaymentRepository paymentRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void allPayment() {
        List<Payment> payments = List.of(new Payment(), new Payment());
        when(paymentRepository.findAll()).thenReturn(payments);

        List<Payment> result = paymentService.allPayment();

        assertEquals(2, result.size());
        verify(paymentRepository, times(1)).findAll();
    }

    @Test
    void singlePayment() {
        ObjectId id = new ObjectId();
        Payment payment = new Payment();
        when(paymentRepository.findById(id)).thenReturn(Optional.of(payment));

        Optional<Payment> result = paymentService.singlePayment(id);

        assertTrue(result.isPresent());
        assertEquals(payment, result.get());
        verify(paymentRepository, times(1)).findById(id);
    }

    @Test
    void addPayment() {
        Payment payment = new Payment();
        when(paymentRepository.save(payment)).thenReturn(payment);

        Payment result = paymentService.addPayment(payment);

        assertEquals(payment, result);
        verify(paymentRepository, times(1)).save(payment);
    }

    @Test
    void updatePayment() {
        ObjectId id = new ObjectId();
        Payment payment = new Payment();
        when(paymentRepository.existsById(id)).thenReturn(true);
        when(paymentRepository.save(payment)).thenReturn(payment);

        Payment result = paymentService.updatePayment(id, payment);

        assertEquals(payment, result);
        verify(paymentRepository, times(1)).save(payment);
    }

    @Test
    void updatePayment_NotFound() {
        ObjectId id = new ObjectId();
        Payment payment = new Payment();
        when(paymentRepository.existsById(id)).thenReturn(false);

        assertThrows(ResourceNotFoundException.class, () -> paymentService.updatePayment(id, payment));
    }

    @Test
    void deletePayment() {
        ObjectId id = new ObjectId();
        when(paymentRepository.existsById(id)).thenReturn(true);
        doNothing().when(paymentRepository).deleteById(id);

        paymentService.deletePayment(id);

        verify(paymentRepository, times(1)).deleteById(id);
    }

    @Test
    void deletePayment_NotFound() {
        ObjectId id = new ObjectId();
        when(paymentRepository.existsById(id)).thenReturn(false);

        assertThrows(ResourceNotFoundException.class, () -> paymentService.deletePayment(id));
    }
}
