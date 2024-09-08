package com.abcRestaurantBackend.abcRestaurantBackend.Service;

import com.abcRestaurantBackend.abcRestaurantBackend.Exception.ResourceNotFoundException;
import com.abcRestaurantBackend.abcRestaurantBackend.Model.Branch;
import com.abcRestaurantBackend.abcRestaurantBackend.Repository.BranchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BranchService {

    @Autowired
    private BranchRepository branchRepository;

    // Get all branches
    public List<Branch> getAllBranches() {
        try {
            return branchRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving branches", e);
        }
    }

    // Get a single branch by branchId
    public Optional<Branch> getBranchById(String branchId) {
        try {
            return Optional.ofNullable(branchRepository.findById(branchId)
                    .orElseThrow(() -> new ResourceNotFoundException("Branch not found with id " + branchId)));
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving branch with id " + branchId, e);
        }
    }

    // Add a new branch
    public Branch createBranch(Branch branch) {
        try {
            branch.setBranchId(generateBranchId());
            return branchRepository.save(branch);
        } catch (Exception e) {
            throw new RuntimeException("Error creating branch", e);
        }
    }

    // Generate a new branch ID
    private String generateBranchId() {
        try {
            long count = branchRepository.count();
            return String.format("B-%03d", count + 1);
        } catch (Exception e) {
            throw new RuntimeException("Error generating branch ID", e);
        }
    }

    // Update an existing branch by branchId
    public Branch updateBranch(String branchId, Branch branch) {
        try {
            if (!branchRepository.existsById(branchId)) {
                throw new ResourceNotFoundException("Branch not found with id " + branchId);
            }
            branch.setBranchId(branchId);
            return branchRepository.save(branch);
        } catch (Exception e) {
            throw new RuntimeException("Error updating branch with id " + branchId, e);
        }
    }

    // Delete a branch by branchId
    public void deleteBranch(String branchId) {
        try {
            if (!branchRepository.existsById(branchId)) {
                throw new ResourceNotFoundException("Branch not found with id " + branchId);
            }
            branchRepository.deleteById(branchId);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting branch with id " + branchId, e);
        }
    }
}
