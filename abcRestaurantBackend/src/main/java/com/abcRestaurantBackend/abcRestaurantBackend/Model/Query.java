package com.abcRestaurantBackend.abcRestaurantBackend.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "Query")
@NoArgsConstructor
@AllArgsConstructor
public class Query {
    @Id
    private String queryId;
    private String userId;
    private String queryDate;
    private String query;
    private String adminReply;  // New field for admin reply
}
