package com.abcRestaurantBackend.abcRestaurantBackend.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "User")
public class User {
    @Id
    private String userId;  // Change this from ObjectId to String and make it the primary key
    private String username;
    private String password;
    private String userEmail;
    private String userType;
}
