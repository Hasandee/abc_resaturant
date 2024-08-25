package com.abcRestaurantBackend.abcRestaurantBackend.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "Payment")

public class Payment {
    @Id
    private ObjectId id;
    private String paymentId;
    private String orderId;
    private double amount;
    private String paymentMethod; // e.g., Credit Card, PayPal, etc.
    private String paymentStatus; // e.g., Paid, Pending, Failed
    private String paymentDate;
}

