package com.abcRestaurantBackend.abcRestaurantBackend.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor // Lombok will generate a constructor with all the fields
@NoArgsConstructor  // Lombok will generate a no-args constructor
@Data               // Lombok will generate getters, setters, equals, hashCode, toString
@Document(collection = "User")
public class User {
    @Id
    private ObjectId id;
    private String userId;
    private String username;
    private String password;
    private String userEmail;
    private String userType;
}


