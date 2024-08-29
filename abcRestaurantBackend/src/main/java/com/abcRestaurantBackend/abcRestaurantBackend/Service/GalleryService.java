package com.abcRestaurantBackend.abcRestaurantBackend.Service;

import com.abcRestaurantBackend.abcRestaurantBackend.Exception.ResourceNotFoundException;
import com.abcRestaurantBackend.abcRestaurantBackend.Model.Gallery;
import com.abcRestaurantBackend.abcRestaurantBackend.Repository.GalleryRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GalleryService {
    @Autowired
    private GalleryRepository galleryRepository;

    // Get all galleries
    public List<Gallery> allGallery() {
        return galleryRepository.findAll();
    }

    // Get a single gallery by id
    public Optional<Gallery> singleGallery(ObjectId id) {
        return galleryRepository.findById(id);
    }

    // Add a new gallery
    public Gallery addGallery(Gallery gallery) {
        gallery.setGalleryId(generateGalleryId());
        return galleryRepository.save(gallery);
    }

    // Generate a new gallery ID
    private String generateGalleryId() {
        long count = galleryRepository.count();
        return String.format("G-%03d", count + 1);
    }

    // Update an existing gallery by id
    public Gallery updateGallery(ObjectId id, Gallery gallery) {
        if (!galleryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Gallery not found with id " + id);
        }
        gallery.setId(id);
        return galleryRepository.save(gallery);
    }

    // Delete a gallery by id
    public void deleteGallery(ObjectId id) {
        if (!galleryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Gallery not found with id " + id);
        }
        galleryRepository.deleteById(id);
    }
}
