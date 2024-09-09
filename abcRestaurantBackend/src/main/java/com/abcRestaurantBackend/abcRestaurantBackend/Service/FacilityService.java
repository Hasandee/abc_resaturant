package com.abcRestaurantBackend.abcRestaurantBackend.Service;

import com.abcRestaurantBackend.abcRestaurantBackend.Model.Facility;
import com.abcRestaurantBackend.abcRestaurantBackend.Repository.FacilityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FacilityService {

    @Autowired
    private FacilityRepository facilityRepository;

    public List<Facility> getAllFacilities() {
        try {
            return facilityRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error fetching facilities", e);
        }
    }

    public Optional<Facility> getFacilityById(String id) {
        try {
            return facilityRepository.findById(id);
        } catch (Exception e) {
            throw new RuntimeException("Error fetching facility by ID: " + id, e);
        }
    }

    public Facility addFacility(Facility facility) {
        try {
            return facilityRepository.save(facility);
        } catch (Exception e) {
            throw new RuntimeException("Error adding facility", e);
        }
    }

    public Facility updateFacility(String id, Facility facilityDetails) {
        try {
            Facility facility = facilityRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid facility Id: " + id));
            facility.setHeading(facilityDetails.getHeading());
            facility.setDescription(facilityDetails.getDescription());
            facility.setImage(facilityDetails.getImage());
            return facilityRepository.save(facility);
        } catch (IllegalArgumentException e) {
            throw e; // This will be caught in the controller
        } catch (Exception e) {
            throw new RuntimeException("Error updating facility", e);
        }
    }

    public void deleteFacility(String id) {
        try {
            facilityRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting facility with ID: " + id, e);
        }
    }
}
