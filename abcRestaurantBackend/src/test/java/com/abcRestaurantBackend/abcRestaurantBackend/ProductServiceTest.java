package com.abcRestaurantBackend.abcRestaurantBackend;

import com.abcRestaurantBackend.abcRestaurantBackend.Exception.ResourceNotFoundException;
import com.abcRestaurantBackend.abcRestaurantBackend.Model.Product;
import com.abcRestaurantBackend.abcRestaurantBackend.Repository.ProductRepository;
import com.abcRestaurantBackend.abcRestaurantBackend.Service.ProductService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;
import java.util.List;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    public ProductServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllProducts() {
        // Given
        List<Product> productList = new ArrayList<>();
        productList.add(new Product("1", "Product 1", "Description 1", 100.0, "image1.jpg", "Category 1"));
        when(productRepository.findAll()).thenReturn(productList);

        // When
        List<Product> result = productService.getAllProducts();

        // Then
        assertEquals(1, result.size());
        assertEquals("Product 1", result.get(0).getName());
    }

    @Test
    void testGetProductById() {
        // Given
        Product product = new Product("1", "Product 1", "Description 1", 100.0, "image1.jpg", "Category 1");
        when(productRepository.findById("1")).thenReturn(Optional.of(product));

        // When
        Product result = productService.getProductById("1");

        // Then
        assertNotNull(result);
        assertEquals("Product 1", result.getName());
    }

    @Test
    void testSaveProduct() {
        // Given
        Product product = new Product("1", "Product 1", "Description 1", 100.0, "image1.jpg", "Category 1");
        when(productRepository.save(product)).thenReturn(product);

        // When
        Product result = productService.saveProduct(product);

        // Then
        assertNotNull(result);
        assertEquals("Product 1", result.getName());
    }

    @Test
    void testUpdateProduct() {
        // Given
        Product existingProduct = new Product("1", "Product 1", "Description 1", 100.0, "image1.jpg", "Category 1");
        Product updatedProduct = new Product("1", "Updated Product", "Updated Description", 150.0, "image2.jpg", "Category 2");
        when(productRepository.findById("1")).thenReturn(Optional.of(existingProduct));
        when(productRepository.save(existingProduct)).thenReturn(existingProduct);

        // When
        Product result = productService.updateProduct("1", updatedProduct);

        // Then
        assertNotNull(result);
        assertEquals("Updated Product", result.getName());
        assertEquals(150.0, result.getPrice());
    }

    @Test
    void testDeleteProduct() {
        // Given
        doNothing().when(productRepository).deleteById("1");

        // When
        productService.deleteProduct("1");

        // Then
        verify(productRepository, times(1)).deleteById("1");
    }
}
