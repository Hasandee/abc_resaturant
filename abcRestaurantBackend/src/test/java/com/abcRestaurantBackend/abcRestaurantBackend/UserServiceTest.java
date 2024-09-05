package com.abcRestaurantBackend.abcRestaurantBackend;

import com.abcRestaurantBackend.abcRestaurantBackend.Model.User;
import com.abcRestaurantBackend.abcRestaurantBackend.Repository.UserRepository;
import com.abcRestaurantBackend.abcRestaurantBackend.Service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddUser() {
        User user = new User(null, "u-001", "testuser", "password", "test@example.com", "customer");

        when(userRepository.save(any(User.class))).thenReturn(user);

        User savedUser = userService.addUser(user);

        assertNotNull(savedUser);
        assertEquals("u-001", savedUser.getUserId());
    }

    @Test
    void testGetSingleUser() {
        User user = new User(null, "u-001", "testuser", "password", "test@example.com", "customer");

        when(userRepository.findById("u-001")).thenReturn(Optional.of(user));

        Optional<User> fetchedUser = userService.singleUser("u-001");

        assertTrue(fetchedUser.isPresent());
        assertEquals("testuser", fetchedUser.get().getUsername());
    }

    @Test
    void testDeleteUser() {
        when(userRepository.existsById("u-001")).thenReturn(true);
        doNothing().when(userRepository).deleteById("u-001");

        assertDoesNotThrow(() -> userService.deleteUser("u-001"));

        verify(userRepository, times(1)).deleteById("u-001");
    }
}
