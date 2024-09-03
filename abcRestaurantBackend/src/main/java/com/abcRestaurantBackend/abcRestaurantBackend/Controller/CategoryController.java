package com.abcRestaurantBackend.abcRestaurantBackend.Controller;

import com.abcRestaurantBackend.abcRestaurantBackend.Exception.ResourceNotFoundException;
import com.abcRestaurantBackend.abcRestaurantBackend.Model.Category;
import com.abcRestaurantBackend.abcRestaurantBackend.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    // Get all categories
    @GetMapping
    public ResponseEntity<List<Category>> getAllCategory() {
        List<Category> categories = categoryService.allCategory();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    // Get a single category by categoryId
    @GetMapping("/{categoryId}")
    public ResponseEntity<Optional<Category>> getSingleCategory(@PathVariable String categoryId) {
        Optional<Category> category = categoryService.singleCategory(categoryId);
        if (category.isPresent()) {
            return new ResponseEntity<>(category, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Add a new category
    @PostMapping
    public ResponseEntity<Category> addCategory(@RequestBody Category category) {
        Category newCategory = categoryService.addCategory(category);
        return new ResponseEntity<>(newCategory, HttpStatus.CREATED);
    }

    // Update an existing category by categoryId
    @PutMapping("/{categoryId}")
    public ResponseEntity<Category> updateCategory(@PathVariable String categoryId, @RequestBody Category category) {
        try {
            Category updatedCategory = categoryService.updateCategory(categoryId, category);
            return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a category by categoryId
    @DeleteMapping("/{categoryId}")
    public ResponseEntity<Void> deleteCategory(@PathVariable String categoryId) {
        try {
            categoryService.deleteCategory(categoryId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch ( ResourceNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
