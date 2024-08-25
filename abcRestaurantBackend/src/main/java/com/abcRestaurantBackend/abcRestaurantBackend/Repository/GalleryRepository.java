package com.abcRestaurantBackend.abcRestaurantBackend.Repository;

import com.abcRestaurantBackend.abcRestaurantBackend.Model.Gallery;
import com.abcRestaurantBackend.abcRestaurantBackend.Model.Gallery;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GalleryRepository extends MongoRepository<Gallery, ObjectId> {
}
