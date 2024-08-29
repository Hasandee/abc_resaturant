package com.abcRestaurantBackend.abcRestaurantBackend.Controller;

import com.abcRestaurantBackend.abcRestaurantBackend.Model.Gallery;
import com.abcRestaurantBackend.abcRestaurantBackend.Service.GalleryService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/gallery")
public class GalleryController {

    @Autowired
    private GalleryService galleryService;

    @GetMapping
    public ResponseEntity<List<Gallery>> getAllGallery() {
        return new ResponseEntity<>(galleryService.allGallery(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Gallery>> getSingleGallery(@PathVariable ObjectId id) {
        return new ResponseEntity<>(galleryService.singleGallery(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Gallery> addGallery(@RequestBody Gallery gallery) {
        Gallery newGallery = galleryService.addGallery(gallery);
        return new ResponseEntity<>(newGallery, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Gallery> updateGallery(@PathVariable("id") ObjectId id, @RequestBody Gallery gallery) {
        Gallery updatedGallery = galleryService.updateGallery(id, gallery);
        return ResponseEntity.ok(updatedGallery);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGallery(@PathVariable("id") ObjectId id) {
        galleryService.deleteGallery(id);
        return ResponseEntity.noContent().build();
    }
}
