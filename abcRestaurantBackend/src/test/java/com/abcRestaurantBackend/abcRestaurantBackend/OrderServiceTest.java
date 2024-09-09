package com.abcRestaurantBackend.abcRestaurantBackend;

import com.abcRestaurantBackend.abcRestaurantBackend.Exception.ResourceNotFoundException;
import com.abcRestaurantBackend.abcRestaurantBackend.Model.Order;
import com.abcRestaurantBackend.abcRestaurantBackend.Repository.OrderRepository;
import com.abcRestaurantBackend.abcRestaurantBackend.Service.OrderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @InjectMocks
    private OrderService orderService;

    private Order order;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        order = new Order("O-001", "U-001", Arrays.asList("P-001", "P-002"), "2023-09-08", 100.0, "Pending", "123 Street", "Card");
    }

    @Test
    void testGetAllOrders() {
        when(orderRepository.findAll()).thenReturn(Arrays.asList(order));

        List<Order> orders = orderService.allOrder();

        assertNotNull(orders);
        assertEquals(1, orders.size());
        verify(orderRepository, times(1)).findAll();
    }

    @Test
    void testGetSingleOrder() {
        when(orderRepository.findById("O-001")).thenReturn(Optional.of(order));

        Optional<Order> foundOrder = orderService.singleOrder("O-001");

        assertTrue(foundOrder.isPresent());
        assertEquals("O-001", foundOrder.get().getOrderId());
        verify(orderRepository, times(1)).findById("O-001");
    }

    @Test
    void testAddOrder() {
        when(orderRepository.save(order)).thenReturn(order);

        Order newOrder = orderService.addOrder(order);

        assertNotNull(newOrder);
        assertEquals("O-001", newOrder.getOrderId());
        verify(orderRepository, times(1)).save(order);
    }

    @Test
    void testUpdateOrder() {
        when(orderRepository.existsById("O-001")).thenReturn(true);
        when(orderRepository.save(order)).thenReturn(order);

        Order updatedOrder = orderService.updateOrder("O-001", order);

        assertNotNull(updatedOrder);
        assertEquals("O-001", updatedOrder.getOrderId());
        verify(orderRepository, times(1)).save(order);
    }

    @Test
    void testUpdateOrderThrowsResourceNotFoundException() {
        when(orderRepository.existsById("O-002")).thenReturn(false);

        assertThrows(ResourceNotFoundException.class, () -> {
            orderService.updateOrder("O-002", order);
        });

        verify(orderRepository, never()).save(any(Order.class));
    }

    @Test
    void testDeleteOrder() {
        when(orderRepository.existsById("O-001")).thenReturn(true);

        orderService.deleteOrder("O-001");

        verify(orderRepository, times(1)).deleteById("O-001");
    }

    @Test
    void testDeleteOrderThrowsResourceNotFoundException() {
        when(orderRepository.existsById("O-002")).thenReturn(false);

        assertThrows(ResourceNotFoundException.class, () -> {
            orderService.deleteOrder("O-002");
        });

        verify(orderRepository, never()).deleteById(anyString());
    }
}
