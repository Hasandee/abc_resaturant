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
        return branchRepository.findAll();
    }

    // Get a single branch by branchId
    public Optional<Branch> getBranchById(String branchId) {
        return branchRepository.findById(branchId);
    }

    // Add a new branch
    public Branch createBranch(Branch branch) {
        branch.setBranchId(generateBranchId());
        return branchRepository.save(branch);
    }

    // Generate a new branch ID
    private String generateBranchId() {
        long count = branchRepository.count();
        return String.format("B-%03d", count + 1);
    }

    // Update an existing branch by branchId
    public Branch updateBranch(String branchId, Branch branch) {
        if (!branchRepository.existsById(branchId)) {
            throw new ResourceNotFoundException("Branch not found with id " + branchId);
        }
        branch.setBranchId(branchId);
        return branchRepository.save(branch);
    }

    // Delete a branch by branchId
    public void deleteBranch(String branchId) {
        if (!branchRepository.existsById(branchId)) {
            throw new ResourceNotFoundException("Branch not found with id " + branchId);
        }
        branchRepository.deleteById(branchId);
    }
}
