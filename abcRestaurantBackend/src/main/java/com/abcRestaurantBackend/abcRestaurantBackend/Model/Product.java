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
@Document(collection = "Product")

public class
Product {
    @Id
    private ObjectId id;
    private String productId;
    private String name;
    private String description;
    private double price;
    private String imageUrl;  // Store the URL or path of the product image
    private String categoryId;  // Reference to the category this product belongs to
    private boolean availability;  // Indicate if the product is available
}

