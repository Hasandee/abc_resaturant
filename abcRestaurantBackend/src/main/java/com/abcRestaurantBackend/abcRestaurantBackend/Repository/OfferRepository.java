package com.abcRestaurantBackend.abcRestaurantBackend.Repository;

import com.abcRestaurantBackend.abcRestaurantBackend.Model.Offer;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface OfferRepository extends MongoRepository<Offer, String> {
    Optional<Offer> findByOfferId(String offerId);
}
