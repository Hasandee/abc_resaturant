package com.abcRestaurantBackend.abcRestaurantBackend.Service;

import com.abcRestaurantBackend.abcRestaurantBackend.Exception.ResourceNotFoundException;
import com.abcRestaurantBackend.abcRestaurantBackend.Model.Product;
import com.abcRestaurantBackend.abcRestaurantBackend.Repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // Get all products
    public List<Product> getAllProducts() {
        try {
            return productRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving products", e);
        }
    }

    // Get product by ID
    public Product getProductById(String id) {
        try {
            Optional<Product> product = productRepository.findById(id);
            return product.orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving product with id: " + id, e);
        }
    }

    // Save a new product
    public Product saveProduct(Product product) {
        try {
            return productRepository.save(product);
        } catch (Exception e) {
            throw new RuntimeException("Error saving product", e);
        }
    }

    // Update an existing product
    public Product updateProduct(String id, Product updatedProduct) {
        try {
            Optional<Product> existingProduct = productRepository.findById(id);

            if (existingProduct.isPresent()) {
                Product product = existingProduct.get();
                product.setName(updatedProduct.getName());
                product.setDescription(updatedProduct.getDescription());
                product.setPrice(updatedProduct.getPrice());
                product.setImageUrl(updatedProduct.getImageUrl());
                product.setCategory(updatedProduct.getCategory());
                return productRepository.save(product);
            } else {
                throw new ResourceNotFoundException("Product not found with id: " + id);
            }
        } catch (Exception e) {
            throw new RuntimeException("Error updating product with id: " + id, e);
        }
    }

    // Delete a product
    public void deleteProduct(String id) {
        try {
            productRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting product with id: " + id, e);
        }
    }
}
