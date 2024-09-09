package com.abcRestaurantBackend.abcRestaurantBackend.Service;

import com.abcRestaurantBackend.abcRestaurantBackend.Exception.ResourceNotFoundException;
import com.abcRestaurantBackend.abcRestaurantBackend.Model.Offer;
import com.abcRestaurantBackend.abcRestaurantBackend.Repository.OfferRepository;
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
        try {
            return offerRepository.findAll();
        } catch (Exception e) {
            // Handle exception (log it, rethrow it, etc.)
            throw new RuntimeException("Error retrieving offers", e);
        }
    }

    // Get a single offer by offerId
    public Optional<Offer> singleOffer(String offerId) {
        try {
            return offerRepository.findByOfferId(offerId);
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving offer with id " + offerId, e);
        }
    }

    // Add a new offer
    public Offer addOffer(Offer offer) {
        try {
            offer.setOfferId(generateOfferId());
            return offerRepository.save(offer);
        } catch (Exception e) {
            throw new RuntimeException("Error saving offer", e);
        }
    }

    // Generate a new offer ID
    private String generateOfferId() {
        long count = offerRepository.count();
        return String.format("F-%03d", count + 1);
    }

    // Update an existing offer by offerId
    public Offer updateOffer(String offerId, Offer offer) {
        try {
            Optional<Offer> existingOffer = offerRepository.findByOfferId(offerId);
            if (!existingOffer.isPresent()) {
                throw new ResourceNotFoundException("Offer not found with id " + offerId);
            }
            offer.setOfferId(offerId);
            return offerRepository.save(offer);
        } catch (ResourceNotFoundException e) {
            throw e; // Rethrow the custom exception
        } catch (Exception e) {
            throw new RuntimeException("Error updating offer", e);
        }
    }

    // Delete an offer by offerId
    public void deleteOffer(String offerId) {
        try {
            Optional<Offer> existingOffer = offerRepository.findByOfferId(offerId);
            if (!existingOffer.isPresent()) {
                throw new ResourceNotFoundException("Offer not found with id " + offerId);
            }
            offerRepository.delete(existingOffer.get());
        } catch (ResourceNotFoundException e) {
            throw e; // Rethrow the custom exception
        } catch (Exception e) {
            throw new RuntimeException("Error deleting offer", e);
        }
    }
}
