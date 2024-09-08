package com.abcRestaurantBackend.abcRestaurantBackend;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.abcRestaurantBackend.abcRestaurantBackend.Exception.ResourceNotFoundException;
import com.abcRestaurantBackend.abcRestaurantBackend.Model.Branch;
import com.abcRestaurantBackend.abcRestaurantBackend.Repository.BranchRepository;
import com.abcRestaurantBackend.abcRestaurantBackend.Service.BranchService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

public class BranchServiceTest {

    @Mock
    private BranchRepository branchRepository;

    @InjectMocks
    private BranchService branchService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // Test for successful retrieval of a branch by ID
    @Test
    public void testGetBranchById_Success() {
        // Arrange
        Branch branch = new Branch("B-001", "Downtown", "9 AM - 9 PM", "123 Main St", "1234567890", "downtown@abc.com");
        when(branchRepository.findById("B-001")).thenReturn(Optional.of(branch));

        // Act
        Optional<Branch> result = branchService.getBranchById("B-001");

        // Assert
        assertTrue(result.isPresent());
        assertEquals(branch, result.get());
    }

    // Test for branch not found scenario
    @Test
    public void testGetBranchById_NotFound() {
        // Arrange
        when(branchRepository.findById("B-999")).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> branchService.getBranchById("B-999"));
    }

    // Test for successful branch creation
    @Test
    public void testCreateBranch_Success() {
        // Arrange
        Branch branch = new Branch(null, "Midtown", "10 AM - 8 PM", "456 Elm St", "0987654321", "midtown@abc.com");
        Branch savedBranch = new Branch("B-001", "Midtown", "10 AM - 8 PM", "456 Elm St", "0987654321", "midtown@abc.com");

        when(branchRepository.count()).thenReturn(0L);
        when(branchRepository.save(any(Branch.class))).thenReturn(savedBranch);

        // Act
        Branch result = branchService.createBranch(branch);

        // Assert
        assertNotNull(result.getBranchId());
        assertEquals(savedBranch.getBranchId(), result.getBranchId());
        assertEquals(savedBranch.getBranchName(), result.getBranchName());
    }

    // Test for branch update success
    @Test
    public void testUpdateBranch_Success() {
        // Arrange
        Branch branch = new Branch("B-001", "Midtown", "10 AM - 8 PM", "456 Elm St", "0987654321", "midtown@abc.com");
        when(branchRepository.existsById("B-001")).thenReturn(true);
        when(branchRepository.save(any(Branch.class))).thenReturn(branch);

        // Act
        Branch result = branchService.updateBranch("B-001", branch);

        // Assert
        assertEquals(branch, result);
    }

    // Test for branch update not found scenario
    @Test
    public void testUpdateBranch_NotFound() {
        // Arrange
        Branch branch = new Branch("B-999", "Suburb", "10 AM - 8 PM", "789 Oak St", "1231231234", "suburb@abc.com");
        when(branchRepository.existsById("B-999")).thenReturn(false);

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> branchService.updateBranch("B-999", branch));
    }

    // Test for successful branch deletion
    @Test
    public void testDeleteBranch_Success() {
        // Arrange
        when(branchRepository.existsById("B-001")).thenReturn(true);

        // Act
        branchService.deleteBranch("B-001");

        // Assert
        verify(branchRepository, times(1)).deleteById("B-001");
    }

    // Test for branch deletion not found scenario
    @Test
    public void testDeleteBranch_NotFound() {
        // Arrange
        when(branchRepository.existsById("B-999")).thenReturn(false);

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> branchService.deleteBranch("B-999"));
    }
}
