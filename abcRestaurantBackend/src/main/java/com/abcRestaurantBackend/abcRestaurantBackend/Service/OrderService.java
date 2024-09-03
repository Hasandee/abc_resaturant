package com.abcRestaurantBackend.abcRestaurantBackend.Service;

import com.abcRestaurantBackend.abcRestaurantBackend.Exception.ResourceNotFoundException;
import com.abcRestaurantBackend.abcRestaurantBackend.Model.Order;
import com.abcRestaurantBackend.abcRestaurantBackend.Repository.OrderRepository;
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

    // Get a single order by orderId
    public Optional<Order> singleOrder(String orderId) {
        return orderRepository.findById(orderId);
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

    // Update an existing order by orderId
    public Order updateOrder(String orderId, Order order) {
        if (!orderRepository.existsById(orderId)) {
            throw new ResourceNotFoundException("Order not found with id " + orderId);
        }
        // Ensure the ID in the request body matches the ID in the URL
        order.setOrderId(orderId);
        return orderRepository.save(order);
    }

    // Delete an order by orderId
    public void deleteOrder(String orderId) {
        if (!orderRepository.existsById(orderId)) {
            throw new ResourceNotFoundException("Order not found with id " + orderId);
        }
        orderRepository.deleteById(orderId);
    }
}
