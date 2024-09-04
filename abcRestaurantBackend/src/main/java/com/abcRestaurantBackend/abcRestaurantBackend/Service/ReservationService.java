package com.abcRestaurantBackend.abcRestaurantBackend.Service;

import com.abcRestaurantBackend.abcRestaurantBackend.Exception.ResourceNotFoundException;
import com.abcRestaurantBackend.abcRestaurantBackend.Model.Reservation;
import com.abcRestaurantBackend.abcRestaurantBackend.Repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> allReservation() {
        return reservationRepository.findAll();
    }

    public Reservation singleReservation(String reservationId) {
        return reservationRepository.findByReservationId(reservationId);
    }

    public Reservation addReservation(Reservation reservation) {
        try {
            reservation.setReservationId(generateReservationId());
            return reservationRepository.save(reservation);
        } catch (Exception e) {
            System.err.println("Error saving reservation: " + e.getMessage());
            throw new RuntimeException("Failed to save reservation");
        }
    }

    private String generateReservationId() {
        long count = reservationRepository.count();
        return String.format("R-%03d", count + 1);
    }

    public Reservation updateReservation(String reservationId, Reservation reservation) {
        if (!reservationRepository.existsByReservationId(reservationId)) {
            throw new ResourceNotFoundException("Reservation not found with id " + reservationId);
        }
        reservation.setReservationId(reservationId);
        return reservationRepository.save(reservation);
    }

    public void deleteReservation(String reservationId) {
        Reservation reservation = reservationRepository.findByReservationId(reservationId);
        if (reservation == null) {
            throw new ResourceNotFoundException("Reservation not found with id " + reservationId);
        }
        reservationRepository.delete(reservation);

    }
}
