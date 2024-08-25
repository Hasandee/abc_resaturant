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
@Document(collection = "User")

public class User {
    @Id
    private ObjectId id;
    private String userId;
    private String username;
    private String password;
    private String userEmail;
    private long phoneNumber;
    private String profilePicture;
    private String userType;
}

