package com.abcRestaurantBackend.abcRestaurantBackend.Controller;

import com.abcRestaurantBackend.abcRestaurantBackend.Model.Category;
import com.abcRestaurantBackend.abcRestaurantBackend.Service.CategoryService;
import org.bson.types.ObjectId;
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

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategory() {
        return new ResponseEntity<>(categoryService.allCategory(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Category>> getSingleCategory(@PathVariable ObjectId id) {
        return new ResponseEntity<>(categoryService.singleCategory(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Category> addCategory(@RequestBody Category category) {
        Category newCategory = categoryService.addCategory(category);
        return new ResponseEntity<>(newCategory, HttpStatus.CREATED);
    }

    // Update an existing category by id
    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable("id") ObjectId id, @RequestBody Category category) {
        Category updatedCategory = categoryService.updateCategory(id, category);
        return ResponseEntity.ok(updatedCategory);
    }

    // Delete a category by id
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable("id") ObjectId id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build();
    }
}
