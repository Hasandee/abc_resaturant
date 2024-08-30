package com.abcRestaurantBackend.abcRestaurantBackend.Controller;

import com.abcRestaurantBackend.abcRestaurantBackend.Model.Reservation;
import com.abcRestaurantBackend.abcRestaurantBackend.Service.ReservationService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reservation")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    // Method to get all reservations
    @GetMapping
    public ResponseEntity<List<Reservation>> getAllReservations() {
        return new ResponseEntity<>(reservationService.allReservation(), HttpStatus.OK);
    }

    // Method to get a single reservation by id
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Reservation>> getSingleReservation(@PathVariable ObjectId id) {
        return new ResponseEntity<>(reservationService.singleReservation(id), HttpStatus.OK);
    }

    // Method to add a new reservation
    @PostMapping
    public ResponseEntity<Reservation> addReservation(@RequestBody Reservation reservation) {
        Reservation newReservation = reservationService.addReservation(reservation);
        return new ResponseEntity<>(newReservation, HttpStatus.CREATED);
    }

    // Method to update an existing reservation by id
    @PutMapping("/{id}")
    public ResponseEntity<Reservation> updateReservation(@PathVariable("id") ObjectId id, @RequestBody Reservation reservation) {
        Reservation updatedReservation = reservationService.updateReservation(id, reservation);
        return ResponseEntity.ok(updatedReservation);
    }

    // Method to delete a reservation by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable("id") ObjectId id) {
        reservationService.deleteReservation(id);
        return ResponseEntity.noContent().build();
    }
}
