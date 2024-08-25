package com.abcRestaurantBackend.abcRestaurantBackend.Controller;

import com.abcRestaurantBackend.abcRestaurantBackend.Model.Offer;
import com.abcRestaurantBackend.abcRestaurantBackend.Service.OfferService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/offer")
public class OfferController {

    @Autowired
    private OfferService offerService;

    @GetMapping
    public ResponseEntity<List<Offer>> getAllOffers() {
        return new ResponseEntity<>(offerService.allOffer(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Offer>> getSingleOffer(@PathVariable ObjectId id) {
        return new ResponseEntity<>(offerService.singleOffer(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Offer> addOffer(@RequestBody Offer offer) {
        Offer newOffer = offerService.addOffer(offer);
        return new ResponseEntity<>(newOffer, HttpStatus.CREATED);
    }

    // Update an existing offer by id
    @PutMapping("/{id}")
    public ResponseEntity<Offer> updateOffer(@PathVariable("id") ObjectId id, @RequestBody Offer offer) {
        Offer updatedOffer = offerService.updateOffer(id, offer);
        return ResponseEntity.ok(updatedOffer);
    }

    // Delete an offer by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOffer(@PathVariable("id") ObjectId id) {
        offerService.deleteOffer(id);
        return ResponseEntity.noContent().build();
    }
}
