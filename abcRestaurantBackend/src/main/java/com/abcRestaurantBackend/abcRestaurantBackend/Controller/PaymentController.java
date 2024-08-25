package com.abcRestaurantBackend.abcRestaurantBackend.Controller;

import com.abcRestaurantBackend.abcRestaurantBackend.Model.Payment;
import com.abcRestaurantBackend.abcRestaurantBackend.Service.PaymentService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping
    public ResponseEntity<List<Payment>> getAllPayments() {
        return new ResponseEntity<>(paymentService.allPayment(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Payment>> getSinglePayment(@PathVariable ObjectId id) {
        return new ResponseEntity<>(paymentService.singlePayment(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Payment> addPayment(@RequestBody Payment payment) {
        Payment newPayment = paymentService.addPayment(payment);
        return new ResponseEntity<>(newPayment, HttpStatus.CREATED);
    }

    // Update an existing payment by id
    @PutMapping("/{id}")
    public ResponseEntity<Payment> updatePayment(@PathVariable("id") ObjectId id, @RequestBody Payment payment) {
        Payment updatedUser = paymentService.updatePayment(id, payment);
        return ResponseEntity.ok(updatedUser);
    }

    // Delete a payment by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable("id") ObjectId id) {
        paymentService.deletePayment(id);
        return ResponseEntity.noContent().build();
    }
}
