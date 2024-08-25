package com.abcRestaurantBackend.abcRestaurantBackend.Service;

import com.abcRestaurantBackend.abcRestaurantBackend.Exception.ResourceNotFoundException;
import com.abcRestaurantBackend.abcRestaurantBackend.Model.Product;
import com.abcRestaurantBackend.abcRestaurantBackend.Model.Product;
import com.abcRestaurantBackend.abcRestaurantBackend.Repository.ProductRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private  ProductRepository  productRepository;

    // Get all product
    public List<Product> allProduct() {
        return productRepository.findAll();
    }

    // Get a single product by id
    public Optional<Product> singleProduct(ObjectId id) {
        return productRepository.findById(id);
    }

    // Add a new product
    public Product addProduct(Product product) {
        product.setProductId(generateProductId());
        return productRepository.save(product);
    }

    // Generate a new product ID
    private String generateProductId() {
        long count = productRepository.count();
        return String.format("P-%03d", count + 1);
    }

    // Update an existing product by id
    public Product updateProduct(ObjectId id, Product product) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found with id " + id);
        }
        // Ensure the ID in the request body matches the ID in the URL
        product.setId(id);
        return productRepository.save(product);
    }

    // Delete a product by id
    public void deleteProduct(ObjectId id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found with id " + id);
        }
        productRepository.deleteById(id);
    }
}