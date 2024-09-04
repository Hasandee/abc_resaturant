package com.abcRestaurantBackend.abcRestaurantBackend.Controller;

import com.abcRestaurantBackend.abcRestaurantBackend.Model.Reservation;
import com.abcRestaurantBackend.abcRestaurantBackend.Service.EmailService;
import com.abcRestaurantBackend.abcRestaurantBackend.Service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/reservation")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private EmailService emailService;

    @GetMapping
    public ResponseEntity<List<Reservation>> getAllReservations() {
        List<Reservation> reservations = reservationService.allReservation();
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    @GetMapping("/{reservationId}")
    public ResponseEntity<Reservation> getSingleReservation(@PathVariable String reservationId) {
        Reservation reservation = reservationService.singleReservation(reservationId);
        return reservation != null ? new ResponseEntity<>(reservation, HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<Reservation> addReservation(@RequestBody Reservation reservation) {
        try {
            Reservation newReservation = reservationService.addReservation(reservation);
            return new ResponseEntity<>(newReservation, HttpStatus.CREATED);
        } catch (Exception e) {
            System.err.println("Failed to add reservation: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{reservationId}")
    public ResponseEntity<Reservation> updateReservation(
            @PathVariable String reservationId,
            @RequestBody Reservation updatedReservation
    ) {
        try {
            Reservation reservation = reservationService.updateReservation(reservationId, updatedReservation);
            if (reservation != null) {
                // After successfully updating, check the status and send the appropriate email
                String status = reservation.getStatus();
                if ("Confirmed".equalsIgnoreCase(status)) {
                    String emailBody = String.format(
                            "Thank you for making a reservation with ABC Restaurant, %s.\n\n" +
                                    "Your reservation is confirmed.\n\n" +
                                    "Reservation Date: %s\n\n" +
                                    "Time: %s\n\n" +
                                    "Table Number: %s.\n\n" +
                                    "Any clarification please call ABC Restaurant Front Desk.\n\n" +
                                    "ABC RESTAURANT - %s\n" +
                                    "Telephone No: (123) 456-7890",
                            reservation.getUserName(),
                            reservation.getReservationDate(),
                            reservation.getReservationType(),
                            reservation.getNumberOfPeople(),
                            reservation.getBranch()
                    );

                    emailService.sendEmail(
                            reservation.getEmail(),
                            "Table Reservation Confirmed",
                            emailBody
                    );

                } else if ("Rejected".equalsIgnoreCase(status)) {
                    String emailBody = String.format(
                            "Dear %s,\n\n" +
                                    "We regret to inform you that your reservation at ABC Restaurant on %s " +
                                    "has been rejected as we are fully booked for that day.\n\n" +
                                    "We apologize for the inconvenience and hope to serve you on another occasion.\n\n" +
                                    "ABC RESTAURANT - %s\n" +
                                    "Telephone No: (123) 456-7890",
                            reservation.getUserName(),
                            reservation.getReservationDate(),
                            reservation.getBranch()
                    );

                    emailService.sendEmail(
                            reservation.getEmail(),
                            "Table Reservation Rejected",
                            emailBody
                    );
                }

                return ResponseEntity.ok(reservation);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.err.println("Failed to update reservation: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{reservationId}")
    public ResponseEntity<Void> deleteReservation(@PathVariable String reservationId) {
        try {
            reservationService.deleteReservation(reservationId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            System.err.println("Failed to delete reservation: " + e.getMessage());
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
