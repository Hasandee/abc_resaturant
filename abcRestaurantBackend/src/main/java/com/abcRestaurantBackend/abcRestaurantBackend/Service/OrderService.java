package com.abcRestaurantBackend.abcRestaurantBackend.Service;
import com.abcRestaurantBackend.abcRestaurantBackend.Exception.ResourceNotFoundException;
import com.abcRestaurantBackend.abcRestaurantBackend.Model.Order;
import com.abcRestaurantBackend.abcRestaurantBackend.Repository.OrderRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    // Get all orders
    public List<Order> allOrder() {
        return orderRepository.findAll();
    }

    // Get a single order by id
    public Optional<Order> singleOrder(ObjectId id) {
        return orderRepository.findById(id);
    }

    // Add a new order
    public Order addOrder(Order order) {
        order.setOrderId(generateOrderId());
        return orderRepository.save(order);
    }

    // Generate a new order ID
    private String generateOrderId() {
        long count = orderRepository.count();
        return String.format("O-%03d", count + 1);
    }

    // Update an existing order by id
    public Order updateOrder(ObjectId id, Order order) {
        if (!orderRepository.existsById(id)) {
            throw new ResourceNotFoundException("Order not found with id " + id);
        }
        // Ensure the ID in the request body matches the ID in the URL
        order.setId(id);
        return orderRepository.save(order);
    }

    // Delete an order by id
    public void deleteOrder(ObjectId id) {
        if (!orderRepository.existsById(id)) {
            throw new ResourceNotFoundException("Order not found with id " + id);
        }
        orderRepository.deleteById(id);
    }
}