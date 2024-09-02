package com.abcRestaurantBackend.abcRestaurantBackend.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "Offer")
public class Offer {
    @Id
    private String offerId; // This is now the primary identifier
    private String offerCode;
    private String description;
    private double discountPercentage;
}
