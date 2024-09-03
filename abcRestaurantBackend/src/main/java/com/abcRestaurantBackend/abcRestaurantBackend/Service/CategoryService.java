package com.abcRestaurantBackend.abcRestaurantBackend.Service;

import com.abcRestaurantBackend.abcRestaurantBackend.Exception.ResourceNotFoundException;
import com.abcRestaurantBackend.abcRestaurantBackend.Model.Category;
import com.abcRestaurantBackend.abcRestaurantBackend.Repository.CategoryRepository;
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
        return categoryRepository.findAll();
    }

    // Get a single category by categoryId
    public Optional<Category> singleCategory(String categoryId) {
        return categoryRepository.findById(categoryId);
    }

    // Add a new category
    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }

    // Update an existing category by categoryId
    public Category updateCategory(String categoryId, Category category) {
        if (!categoryRepository.existsById(categoryId)) {
            throw new ResourceNotFoundException("Category not found with id " + categoryId);
        }
        category.setCategoryId(categoryId);
        return categoryRepository.save(category);
    }

    // Delete a category by categoryId
    public void deleteCategory(String categoryId) {
        if (!categoryRepository.existsById(categoryId)) {
            throw new ResourceNotFoundException("Category not found with id " + categoryId);
        }
        categoryRepository.deleteById(categoryId);
    }
}
