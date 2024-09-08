package com.abcRestaurantBackend.abcRestaurantBackend.Service;

import com.abcRestaurantBackend.abcRestaurantBackend.Exception.ResourceNotFoundException;
import com.abcRestaurantBackend.abcRestaurantBackend.Model.Category;
import com.abcRestaurantBackend.abcRestaurantBackend.Repository.CategoryRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    // Get all categories
    public List<Category> allCategory() {
        try {
            return categoryRepository.findAll();
        } catch (Exception e) {
            // Log the exception (you can use a logging framework here)
            System.err.println("Error fetching categories: " + e.getMessage());
            return List.of(); // Return an empty list in case of an error
        }
    }

    // Get a single category by id
    public Optional<Category> singleCategory(ObjectId id) {
        try {
            return categoryRepository.findById(id);
        } catch (Exception e) {
            // Log the exception
            System.err.println("Error fetching category with id " + id + ": " + e.getMessage());
            return Optional.empty(); // Return empty if an error occurs
        }
    }

    // Add a new category
    public Category addCategory(Category category) {
        try {
            category.setCategoryId(generateCategoryId());
            return categoryRepository.save(category);
        } catch (Exception e) {
            // Log the exception
            System.err.println("Error adding category: " + e.getMessage());
            throw new RuntimeException("Could not add category"); // Rethrow a generic exception
        }
    }

    // Generate a new category ID
    private String generateCategoryId() {
        long count = categoryRepository.count();
        return String.format("C-%03d", count + 1);
    }

    // Update an existing category by id
    public Category updateCategory(ObjectId id, Category category) {
        try {
            if (!categoryRepository.existsById(id)) {
                throw new ResourceNotFoundException("Category not found with id " + id);
            }
            // Ensure the ID in the request body matches the ID in the URL
            category.setId(id);
            return categoryRepository.save(category);
        } catch (ResourceNotFoundException e) {
            throw e; // Rethrow the resource not found exception
        } catch (Exception e) {
            // Log the exception
            System.err.println("Error updating category with id " + id + ": " + e.getMessage());
            throw new RuntimeException("Could not update category"); // Rethrow a generic exception
        }
    }

    // Delete a category by id
    public void deleteCategory(ObjectId id) {
        try {
            if (!categoryRepository.existsById(id)) {
                throw new ResourceNotFoundException("Category not found with id " + id);
            }
            categoryRepository.deleteById(id);
        } catch (ResourceNotFoundException e) {
            throw e; // Rethrow the resource not found exception
        } catch (Exception e) {
            // Log the exception
            System.err.println("Error deleting category with id " + id + ": " + e.getMessage());
            throw new RuntimeException("Could not delete category"); // Rethrow a generic exception
        }
    }
}
