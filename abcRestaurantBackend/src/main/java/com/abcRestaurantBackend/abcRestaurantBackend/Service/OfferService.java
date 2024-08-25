package com.abcRestaurantBackend.abcRestaurantBackend.Service;

import com.abcRestaurantBackend.abcRestaurantBackend.Exception.ResourceNotFoundException;
import com.abcRestaurantBackend.abcRestaurantBackend.Model.Offer;
import com.abcRestaurantBackend.abcRestaurantBackend.Repository.OfferRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OfferService {
    @Autowired
    private OfferRepository offerRepository;

    // Get all offers
    public List<Offer> allOffer() {
        return offerRepository.findAll();
    }

    // Get a single offer by id
    public Optional<Offer> singleOffer(ObjectId id) {
        return offerRepository.findById(id);
    }

    // Add a new offer
    public Offer addOffer(Offer offer) {
        offer.setOfferId(generateOfferId());
        return offerRepository.save(offer);
    }

    // Generate a new offer ID
    private String generateOfferId() {
        long count = offerRepository.count();
        return String.format("F-%03d", count + 1);
    }

    // Update an existing offer by id
    public Offer updateOffer(ObjectId id, Offer offer) {
        if (!offerRepository.existsById(id)) {
            throw new ResourceNotFoundException("Offer not found with id " + id);
        }
        // Ensure the ID in the request body matches the ID in the URL
        offer.setId(id);
        return offerRepository.save(offer);
    }

    // Delete an offer by id
    public void deleteOffer(ObjectId id) {
        if (!offerRepository.existsById(id)) {
            throw new ResourceNotFoundException("Offer not found with id " + id);
        }
        offerRepository.deleteById(id);
    }
}