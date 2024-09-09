package com.abcRestaurantBackend.abcRestaurantBackend;

import com.abcRestaurantBackend.abcRestaurantBackend.Model.Facility;
import com.abcRestaurantBackend.abcRestaurantBackend.Repository.FacilityRepository;
import com.abcRestaurantBackend.abcRestaurantBackend.Service.FacilityService;
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

public class FacilityServiceTest {

    @InjectMocks
    private FacilityService facilityService;

    @Mock
    private FacilityRepository facilityRepository;

    private Facility facility1;
    private Facility facility2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        facility1 = new Facility("1", "Gym", "Fully equipped gym", null);
        facility2 = new Facility("2", "Pool", "Indoor heated pool", null);
    }

    @Test
    public void testGetAllFacilities() {
        when(facilityRepository.findAll()).thenReturn(Arrays.asList(facility1, facility2));

        List<Facility> facilities = facilityService.getAllFacilities();
        assertEquals(2, facilities.size());
        verify(facilityRepository, times(1)).findAll();
    }

    @Test
    public void testGetFacilityById() {
        when(facilityRepository.findById("1")).thenReturn(Optional.of(facility1));

        Optional<Facility> facility = facilityService.getFacilityById("1");
        assertTrue(facility.isPresent());
        assertEquals(facility1, facility.get());
        verify(facilityRepository, times(1)).findById("1");
    }

    @Test
    public void testAddFacility() {
        when(facilityRepository.save(facility1)).thenReturn(facility1);

        Facility savedFacility = facilityService.addFacility(facility1);
        assertNotNull(savedFacility);
        assertEquals("Gym", savedFacility.getHeading());
        verify(facilityRepository, times(1)).save(facility1);
    }

    @Test
    public void testUpdateFacility() {
        when(facilityRepository.findById("1")).thenReturn(Optional.of(facility1));
        when(facilityRepository.save(facility1)).thenReturn(facility1);

        Facility updatedFacility = facilityService.updateFacility("1", facility1);
        assertNotNull(updatedFacility);
        assertEquals("Gym", updatedFacility.getHeading());
        verify(facilityRepository, times(1)).findById("1");
        verify(facilityRepository, times(1)).save(facility1);
    }

    @Test
    public void testDeleteFacility() {
        doNothing().when(facilityRepository).deleteById("1");

        facilityService.deleteFacility("1");
        verify(facilityRepository, times(1)).deleteById("1");
    }
}
