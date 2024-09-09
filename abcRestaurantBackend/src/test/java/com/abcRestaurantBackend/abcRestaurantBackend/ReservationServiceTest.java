package com.abcRestaurantBackend.abcRestaurantBackend;

import com.abcRestaurantBackend.abcRestaurantBackend.Exception.ResourceNotFoundException;
import com.abcRestaurantBackend.abcRestaurantBackend.Model.Reservation;
import com.abcRestaurantBackend.abcRestaurantBackend.Repository.ReservationRepository;
import com.abcRestaurantBackend.abcRestaurantBackend.Service.ReservationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ReservationServiceTest {

    @InjectMocks
    private ReservationService reservationService;

    @Mock
    private ReservationRepository reservationRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void allReservation_ShouldReturnAllReservations() {
        List<Reservation> mockReservations = Arrays.asList(new Reservation(), new Reservation());
        when(reservationRepository.findAll()).thenReturn(mockReservations);

        List<Reservation> reservations = reservationService.allReservation();

        assertEquals(2, reservations.size());
        verify(reservationRepository, times(1)).findAll();
    }

    @Test
    void singleReservation_ShouldReturnReservation_WhenFound() {
        Reservation mockReservation = new Reservation();
        when(reservationRepository.findByReservationId("R-001")).thenReturn(mockReservation);

        Reservation reservation = reservationService.singleReservation("R-001");

        assertNotNull(reservation);
        verify(reservationRepository, times(1)).findByReservationId("R-001");
    }

    @Test
    void singleReservation_ShouldThrowException_WhenNotFound() {
        when(reservationRepository.findByReservationId("R-999")).thenReturn(null);

        Reservation reservation = reservationService.singleReservation("R-999");

        assertNull(reservation);
        verify(reservationRepository, times(1)).findByReservationId("R-999");
    }

    @Test
    void addReservation_ShouldSaveReservation() {
        Reservation mockReservation = new Reservation();
        when(reservationRepository.save(mockReservation)).thenReturn(mockReservation);

        Reservation savedReservation = reservationService.addReservation(mockReservation);

        assertNotNull(savedReservation);
        verify(reservationRepository, times(1)).save(mockReservation);
    }

    @Test
    void updateReservation_ShouldUpdateReservation_WhenFound() {
        Reservation mockReservation = new Reservation();
        mockReservation.setReservationId("R-001");
        when(reservationRepository.existsByReservationId("R-001")).thenReturn(true);
        when(reservationRepository.save(mockReservation)).thenReturn(mockReservation);

        Reservation updatedReservation = reservationService.updateReservation("R-001", mockReservation);

        assertEquals("R-001", updatedReservation.getReservationId());
        verify(reservationRepository, times(1)).existsByReservationId("R-001");
        verify(reservationRepository, times(1)).save(mockReservation);
    }

    @Test
    void updateReservation_ShouldThrowException_WhenNotFound() {
        when(reservationRepository.existsByReservationId("R-999")).thenReturn(false);

        assertThrows(ResourceNotFoundException.class, () -> {
            reservationService.updateReservation("R-999", new Reservation());
        });

        verify(reservationRepository, times(1)).existsByReservationId("R-999");
        verify(reservationRepository, never()).save(any(Reservation.class));
    }

    @Test
    void deleteReservation_ShouldDeleteReservation_WhenFound() {
        Reservation mockReservation = new Reservation();
        when(reservationRepository.findByReservationId("R-001")).thenReturn(mockReservation);

        reservationService.deleteReservation("R-001");

        verify(reservationRepository, times(1)).delete(mockReservation);
    }

    @Test
    void deleteReservation_ShouldThrowException_WhenNotFound() {
        when(reservationRepository.findByReservationId("R-999")).thenReturn(null);

        assertThrows(ResourceNotFoundException.class, () -> {
            reservationService.deleteReservation("R-999");
        });

        verify(reservationRepository, never()).delete(any(Reservation.class));
    }
}
