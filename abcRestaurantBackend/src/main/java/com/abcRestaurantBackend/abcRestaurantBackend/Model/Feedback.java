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
@Document(collection = "Feedback")

public class Feedback {
    @Id
    private  ObjectId id;
    private String feedbackId;
    private String userId; // ID of the user who provided the feedback
    private String message;
    private int rating; // Rating given by the user, e.g., 1 to 5
    private String date;
}

