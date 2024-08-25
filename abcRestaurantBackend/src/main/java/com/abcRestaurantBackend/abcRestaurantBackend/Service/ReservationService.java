package com.abcRestaurantBackend.abcRestaurantBackend.Service;

import com.abcRestaurantBackend.abcRestaurantBackend.Exception.ResourceNotFoundException;
import com.abcRestaurantBackend.abcRestaurantBackend.Model.Reservation;
import com.abcRestaurantBackend.abcRestaurantBackend.Model.Reservation;
import com.abcRestaurantBackend.abcRestaurantBackend.Repository.ReservationRepository;
import com.abcRestaurantBackend.abcRestaurantBackend.Repository.ReservationRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    // Get all reservation
    public List<Reservation> allReservation() {
        return reservationRepository.findAll();
    }

    // Get a single reservation by id
    public Optional<Reservation> singleReservation(ObjectId id) {
        return reservationRepository.findById(id);
    }

    // Add a new reservation
    public Reservation addReservation(Reservation reservation) {
        reservation.setReservationId(generateReservationId());
        return reservationRepository.save(reservation);
    }

    // Generate a new reservation ID
    private String generateReservationId() {
        long count = reservationRepository.count();
        return String.format("R-%03d", count + 1);
    }

    // Update an existing reservation by id
    public Reservation updateReservation(ObjectId id, Reservation reservation) {
        if (!reservationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Reservation not found with id " + id);
        }
        // Ensure the ID in the request body matches the ID in the URL
        reservation.setId(id);
        return reservationRepository.save(reservation);
    }

    // Delete a reservation by id
    public void deleteReservation(ObjectId id) {
        if (!reservationRepository.existsById(id)) {
            throw new ResourceNotFoundException("Reservation not found with id " + id);
        }
        reservationRepository.deleteById(id);
    }
}