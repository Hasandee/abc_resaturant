package com.abcRestaurantBackend.abcRestaurantBackend.Service;

import com.abcRestaurantBackend.abcRestaurantBackend.Exception.ResourceNotFoundException;
import com.abcRestaurantBackend.abcRestaurantBackend.Model.Category;
import com.abcRestaurantBackend.abcRestaurantBackend.Repository.CategoryRepository;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class CategoryServiceTest {

    @InjectMocks
    private CategoryService categoryService;

    @Mock
    private CategoryRepository categoryRepository;

    private Category category;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        category = new Category(new ObjectId(), "C-001", "Food", "Delicious food");
    }

    @Test
    public void testAllCategory() {
        when(categoryRepository.findAll()).thenReturn(Arrays.asList(category));
        assertEquals(1, categoryService.allCategory().size());
    }

    @Test
    public void testSingleCategory() {
        when(categoryRepository.findById(any(ObjectId.class))).thenReturn(Optional.of(category));
        Optional<Category> foundCategory = categoryService.singleCategory(category.getId());
        assertTrue(foundCategory.isPresent());
        assertEquals(category.getCategoryId(), foundCategory.get().getCategoryId());
    }

    @Test
    public void testAddCategory() {
        when(categoryRepository.save(any(Category.class))).thenReturn(category);
        Category newCategory = categoryService.addCategory(category);
        assertNotNull(newCategory);
        assertEquals("C-001", newCategory.getCategoryId());
    }

    @Test
    public void testUpdateCategory() {
        when(categoryRepository.existsById(any(ObjectId.class))).thenReturn(true);
        when(categoryRepository.save(any(Category.class))).thenReturn(category);
        Category updatedCategory = categoryService.updateCategory(category.getId(), category);
        assertEquals(category.getCategoryId(), updatedCategory.getCategoryId());
    }

    @Test
    public void testUpdateCategoryNotFound() {
        when(categoryRepository.existsById(any(ObjectId.class))).thenReturn(false);
        assertThrows(ResourceNotFoundException.class, () -> categoryService.updateCategory(new ObjectId(), category));
    }

    @Test
    public void testDeleteCategory() {
        when(categoryRepository.existsById(any(ObjectId.class))).thenReturn(true);
        categoryService.deleteCategory(category.getId());
        verify(categoryRepository, times(1)).deleteById(category.getId());
    }

    @Test
    public void testDeleteCategoryNotFound() {
        when(categoryRepository.existsById(any(ObjectId.class))).thenReturn(false);
        assertThrows(ResourceNotFoundException.class, () -> categoryService.deleteCategory(new ObjectId()));
    }
}
