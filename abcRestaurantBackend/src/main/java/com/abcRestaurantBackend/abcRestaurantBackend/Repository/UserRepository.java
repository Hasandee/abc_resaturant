package com.abcRestaurantBackend.abcRestaurantBackend.Repository;

import com.abcRestaurantBackend.abcRestaurantBackend.Model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, ObjectId> {
}

