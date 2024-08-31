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

    @Autowired
    private EmailService emailService;

    public List<Reservation> allReservation() {
        return reservationRepository.findAll();
    }

    public Reservation singleReservation(String reservationId) {
        return reservationRepository.findByReservationId(reservationId)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found with id " + reservationId));
    }

    public Reservation addReservation(Reservation reservation) {
        reservation.setReservationId(generateReservationId());
        return reservationRepository.save(reservation);
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
        Reservation reservation = singleReservation(reservationId);
        reservationRepository.delete(reservation);
    }

    public Reservation confirmReservation(String reservationId) {
        Reservation reservation = singleReservation(reservationId);
        reservation.setStatus("Confirmed");
        reservation.setEmailConfirmed(true);
        Reservation updatedReservation = reservationRepository.save(reservation);

        // Send confirmation email
        emailService.sendSimpleEmail(
                reservation.getEmail(),
                "Reservation Confirmation",
                "Your reservation with ID " + reservationId + " has been confirmed."
        );

        return updatedReservation;
    }
}
