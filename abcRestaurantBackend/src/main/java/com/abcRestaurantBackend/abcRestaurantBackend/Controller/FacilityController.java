package com.abcRestaurantBackend.abcRestaurantBackend.Controller;

import com.abcRestaurantBackend.abcRestaurantBackend.Model.Facility;
import com.abcRestaurantBackend.abcRestaurantBackend.Service.FacilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/facility")
public class FacilityController {

    @Autowired
    private FacilityService facilityService;

    @GetMapping
    public List<Facility> getAllFacilities() {
        return facilityService.getAllFacilities();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Facility> getFacilityById(@PathVariable String id) {
        return facilityService.getFacilityById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Facility> addFacility(
            @RequestParam String heading,
            @RequestParam String description,
            @RequestParam(required = false) MultipartFile image) {

        Facility facility = new Facility();
        facility.setHeading(heading);
        facility.setDescription(description);

        if (image != null && !image.isEmpty()) {
            try {
                facility.setImage(image.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(null);
            }
        }

        return ResponseEntity.ok(facilityService.addFacility(facility));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Facility> updateFacility(
            @PathVariable String id,
            @RequestParam String heading,
            @RequestParam String description,
            @RequestParam(required = false) MultipartFile image) {

        Facility facility = facilityService.getFacilityById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid facility Id: " + id));
        facility.setHeading(heading);
        facility.setDescription(description);

        if (image != null && !image.isEmpty()) {
            try {
                facility.setImage(image.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(null);
            }
        }

        return ResponseEntity.ok(facilityService.updateFacility(id, facility));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFacility(@PathVariable String id) {
        try {
            facilityService.deleteFacility(id);
            return ResponseEntity.ok().body("Facility deleted successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid Facility format");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting facility: " +
                    e.getMessage());
        }
    }
}
