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
    private String id;  // Change to String for reservationId
    private String reservationId;
    private String userId;
    private String reservationDate;
    private String reservationType;
    private int numberOfPeople;
    private String specialRequests;
    private String Branch;
    private String status;
}
