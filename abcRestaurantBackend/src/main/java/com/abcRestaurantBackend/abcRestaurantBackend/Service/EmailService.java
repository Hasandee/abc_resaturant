package com.abcRestaurantBackend.abcRestaurantBackend.Service;

import com.abcRestaurantBackend.abcRestaurantBackend.Model.Reservation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    public void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        emailSender.send(message);
    }

    public void sendReservationConfirmation(Reservation reservation) {
        String to = reservation.getEmail();
        String subject = "Reservation Confirmation";
        String text = "Dear " + reservation.getUserId() + ",\n\n" +
                "Your reservation for " + reservation.getReservationDate() + " has been confirmed.\n" +
                "Reservation Details:\n" +
                "Type: " + reservation.getReservationType() + "\n" +
                "Number of People: " + reservation.getNumberOfPeople() + "\n" +
                "Branch: " + reservation.getBranch() + "\n\n" +
                "Thank you for choosing our restaurant.\n\nBest regards,\nABC Restaurant";

        sendSimpleMessage(to, subject, text);
    }
}
