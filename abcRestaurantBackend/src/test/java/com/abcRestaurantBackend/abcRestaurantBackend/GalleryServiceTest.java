package com.abcRestaurantBackend.abcRestaurantBackend;

import com.abcRestaurantBackend.abcRestaurantBackend.Model.Gallery;
import com.abcRestaurantBackend.abcRestaurantBackend.Repository.GalleryRepository;
import com.abcRestaurantBackend.abcRestaurantBackend.Service.GalleryService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class GalleryServiceTest {

    @Mock
    private GalleryRepository galleryRepository;

    @InjectMocks
    private GalleryService galleryService;

    private Gallery gallery;
    private Gallery.Item item;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);

        // Initialize Gallery and Item objects for testing
        item = new Gallery.Item("item1", "imageData1");
        List<Gallery.Item> items = new ArrayList<>();
        items.add(item);

        gallery = new Gallery("gallery1", "Gallery 1", items);
    }

    @Test
    void testGetGalleryByName() {
        when(galleryRepository.findByName("Gallery 1")).thenReturn(Optional.of(gallery));

        Optional<Gallery> foundGallery = galleryService.getGalleryByName("Gallery 1");

        assertTrue(foundGallery.isPresent());
        assertEquals("Gallery 1", foundGallery.get().getName());
    }

    @Test
    void testGetAllGalleries() {
        List<Gallery> galleryList = new ArrayList<>();
        galleryList.add(gallery);

        when(galleryRepository.findAll()).thenReturn(galleryList);

        List<Gallery> galleries = galleryService.getAllGalleries();

        assertFalse(galleries.isEmpty());
        assertEquals(1, galleries.size());
    }

    @Test
    void testGetGalleryById() {
        when(galleryRepository.findById("gallery1")).thenReturn(Optional.of(gallery));

        Optional<Gallery> foundGallery = galleryService.getGalleryById("gallery1");

        assertTrue(foundGallery.isPresent());
        assertEquals("gallery1", foundGallery.get().getId());
    }

    @Test
    void testAddGallery() {
        when(galleryRepository.save(any(Gallery.class))).thenReturn(gallery);

        Gallery savedGallery = galleryService.addGallery(gallery);

        assertNotNull(savedGallery);
        assertEquals("Gallery 1", savedGallery.getName());
    }

    @Test
    void testUpdateGallery() {
        when(galleryRepository.existsById("gallery1")).thenReturn(true);
        when(galleryRepository.save(any(Gallery.class))).thenReturn(gallery);

        Gallery updatedGallery = galleryService.updateGallery("gallery1", gallery);

        assertNotNull(updatedGallery);
        assertEquals("gallery1", updatedGallery.getId());
    }

    @Test
    void testUpdateGalleryNotFound() {
        when(galleryRepository.existsById("gallery1")).thenReturn(false);

        Gallery updatedGallery = galleryService.updateGallery("gallery1", gallery);

        assertNull(updatedGallery);
    }

    @Test
    void testDeleteGallery() {
        doNothing().when(galleryRepository).deleteById("gallery1");

        galleryService.deleteGallery("gallery1");

        verify(galleryRepository, times(1)).deleteById("gallery1");
    }

    @Test
    void testAddItemToGallery() {
        when(galleryRepository.findById("gallery1")).thenReturn(Optional.of(gallery));
        when(galleryRepository.save(any(Gallery.class))).thenReturn(gallery);

        Gallery updatedGallery = galleryService.addItemToGallery("gallery1", new Gallery.Item("item2", "imageData2"));

        assertNotNull(updatedGallery);
        assertEquals(2, updatedGallery.getImages().size());
    }

    @Test
    void testUpdateItemInGallery() {
        when(galleryRepository.findById("gallery1")).thenReturn(Optional.of(gallery));
        when(galleryRepository.save(any(Gallery.class))).thenReturn(gallery);

        Gallery.Item updatedItem = new Gallery.Item("item1", "newImageData");

        Gallery updatedGallery = galleryService.updateItemInGallery("gallery1", "item1", updatedItem);

        assertNotNull(updatedGallery);
        assertEquals("newImageData", updatedGallery.getImages().get(0).getImageData());
    }

    @Test
    void testDeleteItemFromGallery() {
        when(galleryRepository.findById("gallery1")).thenReturn(Optional.of(gallery));
        when(galleryRepository.save(any(Gallery.class))).thenReturn(gallery);

        Gallery updatedGallery = galleryService.deleteItemFromGallery("gallery1", "item1");

        assertNotNull(updatedGallery);
        assertTrue(updatedGallery.getImages().isEmpty());
    }
}
