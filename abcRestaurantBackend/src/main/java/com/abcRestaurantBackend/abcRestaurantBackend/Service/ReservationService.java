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
        try {
            return reservationRepository.findAll();
        } catch (Exception e) {
            System.err.println("Error fetching all reservations: " + e.getMessage());
            throw new RuntimeException("Failed to fetch reservations.");
        }
    }

    public Reservation singleReservation(String reservationId) {
        try {
            return reservationRepository.findByReservationId(reservationId);
        } catch (Exception e) {
            System.err.println("Error fetching reservation with ID " + reservationId + ": " + e.getMessage());
            throw new ResourceNotFoundException("Reservation not found with ID " + reservationId);
        }
    }

    public Reservation addReservation(Reservation reservation) {
        try {
            reservation.setReservationId(generateReservationId());
            return reservationRepository.save(reservation);
        } catch (Exception e) {
            System.err.println("Error saving reservation: " + e.getMessage());
            throw new RuntimeException("Failed to save reservation.");
        }
    }

    public Reservation updateReservation(String reservationId, Reservation reservation) {
        try {
            if (!reservationRepository.existsByReservationId(reservationId)) {
                throw new ResourceNotFoundException("Reservation not found with ID " + reservationId);
            }
            reservation.setReservationId(reservationId);
            return reservationRepository.save(reservation);
        } catch (Exception e) {
            System.err.println("Error updating reservation with ID " + reservationId + ": " + e.getMessage());
            throw new RuntimeException("Failed to update reservation.");
        }
    }

    public void deleteReservation(String reservationId) {
        try {
            Reservation reservation = reservationRepository.findByReservationId(reservationId);
            if (reservation == null) {
                throw new ResourceNotFoundException("Reservation not found with ID " + reservationId);
            }
            reservationRepository.delete(reservation);
        } catch (Exception e) {
            System.err.println("Error deleting reservation with ID " + reservationId + ": " + e.getMessage());
            throw new RuntimeException("Failed to delete reservation.");
        }
    }

    private String generateReservationId() {
        long count = reservationRepository.count();
        return String.format("R-%03d", count + 1);
    }
}
