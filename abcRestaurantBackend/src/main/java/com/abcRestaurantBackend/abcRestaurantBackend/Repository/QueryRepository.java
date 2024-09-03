package com.abcRestaurantBackend.abcRestaurantBackend.Repository;

import com.abcRestaurantBackend.abcRestaurantBackend.Model.Query;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QueryRepository extends MongoRepository<Query, String> {
    // No changes needed here since MongoRepository now works with userId as a String
}
