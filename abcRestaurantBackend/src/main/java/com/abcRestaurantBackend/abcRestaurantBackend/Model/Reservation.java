package com.abcRestaurantBackend.abcRestaurantBackend.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

// src/main/java/com/abcRestaurantBackend/abcRestaurantBackend/Model/Reservation.java

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "Reservation")
public class Reservation {
    @Id
    private String id;
    private String reservationId;
    private String userId;
    private String reservationDate;
    private String reservationType;
    private int numberOfPeople;
    private String specialRequests;
    private String branch;
    private String status;
    private String phone; // New field
    private String email; // New field
    private boolean emailConfirmed; // New field
}
