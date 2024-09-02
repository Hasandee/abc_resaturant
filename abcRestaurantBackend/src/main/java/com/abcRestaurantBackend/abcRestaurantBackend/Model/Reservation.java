package com.abcRestaurantBackend.abcRestaurantBackend.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "Reservation")
public class Reservation {
    @Id
    private String id;
    private String reservationId;
    private String userName;
    private String reservationDate; // Change type to Date if you want to store it as Date
    private String reservationType;
    private int numberOfPeople;
    private String specialRequests;
    private String branch;
    private String status;
    private String phone;
    private String email;
}
