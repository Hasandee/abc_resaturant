package com.abcRestaurantBackend.abcRestaurantBackend.Repository;

import com.abcRestaurantBackend.abcRestaurantBackend.Model.Branch;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BranchRepository extends MongoRepository<Branch, ObjectId> {
}
