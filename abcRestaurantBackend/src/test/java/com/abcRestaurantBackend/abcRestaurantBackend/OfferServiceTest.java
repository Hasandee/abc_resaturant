package com.abcRestaurantBackend.abcRestaurantBackend;

import com.abcRestaurantBackend.abcRestaurantBackend.Exception.ResourceNotFoundException;
import com.abcRestaurantBackend.abcRestaurantBackend.Model.Offer;
import com.abcRestaurantBackend.abcRestaurantBackend.Repository.OfferRepository;
import com.abcRestaurantBackend.abcRestaurantBackend.Service.OfferService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class OfferServiceTest {

    @Mock
    private OfferRepository offerRepository;

    @InjectMocks
    private OfferService offerService;

    private Offer offer;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        offer = new Offer("F-001", "SUMMER21", "Summer discount", 20.0);
    }

    @Test
    void testAllOffer() {
        when(offerRepository.findAll()).thenReturn(Arrays.asList(offer));

        List<Offer> offers = offerService.allOffer();

        assertEquals(1, offers.size());
        assertEquals(offer.getOfferId(), offers.get(0).getOfferId());
        verify(offerRepository, times(1)).findAll();
    }

    @Test
    void testSingleOffer() {
        when(offerRepository.findByOfferId("F-001")).thenReturn(Optional.of(offer));

        Optional<Offer> foundOffer = offerService.singleOffer("F-001");

        assertTrue(foundOffer.isPresent());
        assertEquals(offer.getOfferId(), foundOffer.get().getOfferId());
        verify(offerRepository, times(1)).findByOfferId("F-001");
    }

    @Test
    void testAddOffer() {
        when(offerRepository.save(any(Offer.class))).thenReturn(offer);

        Offer newOffer = offerService.addOffer(offer);

        assertNotNull(newOffer);
        assertEquals(offer.getOfferId(), newOffer.getOfferId());
        verify(offerRepository, times(1)).save(any(Offer.class));
    }

    @Test
    void testUpdateOffer() {
        when(offerRepository.findByOfferId("F-001")).thenReturn(Optional.of(offer));
        when(offerRepository.save(any(Offer.class))).thenReturn(offer);

        Offer updatedOffer = offerService.updateOffer("F-001", offer);

        assertNotNull(updatedOffer);
        assertEquals(offer.getOfferId(), updatedOffer.getOfferId());
        verify(offerRepository, times(1)).save(any(Offer.class));
    }

    @Test
    void testUpdateOfferNotFound() {
        when(offerRepository.findByOfferId("F-001")).thenReturn(Optional.empty());

        Exception exception = assertThrows(ResourceNotFoundException.class, () -> {
            offerService.updateOffer("F-001", offer);
        });

        assertEquals("Offer not found with id F-001", exception.getMessage());
        verify(offerRepository, times(0)).save(any(Offer.class));
    }

    @Test
    void testDeleteOffer() {
        when(offerRepository.findByOfferId("F-001")).thenReturn(Optional.of(offer));

        offerService.deleteOffer("F-001");

        verify(offerRepository, times(1)).delete(offer);
    }

    @Test
    void testDeleteOfferNotFound() {
        when(offerRepository.findByOfferId("F-001")).thenReturn(Optional.empty());

        Exception exception = assertThrows(ResourceNotFoundException.class, () -> {
            offerService.deleteOffer("F-001");
        });

        assertEquals("Offer not found with id F-001", exception.getMessage());
        verify(offerRepository, times(0)).delete(any(Offer.class));
    }
}
