package com.abcRestaurantBackend.abcRestaurantBackend;

import com.abcRestaurantBackend.abcRestaurantBackend.Exception.ResourceNotFoundException;
import com.abcRestaurantBackend.abcRestaurantBackend.Model.Query;
import com.abcRestaurantBackend.abcRestaurantBackend.Repository.QueryRepository;
import com.abcRestaurantBackend.abcRestaurantBackend.Service.QueryService;
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

class QueryServiceTest {

    @InjectMocks
    private QueryService queryService;

    @Mock
    private QueryRepository queryRepository;

    private Query query1;
    private Query query2;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        query1 = new Query("Q-001", "user1", "2024-09-01", "Query about reservation", null);
        query2 = new Query("Q-002", "user2", "2024-09-02", "Query about menu", null);
    }

    @Test
    void shouldReturnAllQueries() {
        // Arrange
        when(queryRepository.findAll()).thenReturn(Arrays.asList(query1, query2));

        // Act
        List<Query> queries = queryService.allQuery();

        // Assert
        assertNotNull(queries);
        assertEquals(2, queries.size());
        verify(queryRepository, times(1)).findAll();
    }

    @Test
    void shouldReturnSingleQueryById() {
        // Arrange
        when(queryRepository.findById("Q-001")).thenReturn(Optional.of(query1));

        // Act
        Optional<Query> query = queryService.singleQuery("Q-001");

        // Assert
        assertTrue(query.isPresent());
        assertEquals("Q-001", query.get().getQueryId());
        verify(queryRepository, times(1)).findById("Q-001");
    }

    @Test
    void shouldThrowExceptionWhenQueryNotFound() {
        // Arrange
        when(queryRepository.existsById("Q-003")).thenReturn(false);

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () -> queryService.updateQuery("Q-003", query1));
        verify(queryRepository, times(1)).existsById("Q-003");
    }

    @Test
    void shouldSaveNewQuery() {
        // Arrange
        Query newQuery = new Query(null, "user3", "2024-09-03", "New query", null);
        when(queryRepository.save(any(Query.class))).thenReturn(query1);

        // Act
        Query savedQuery = queryService.addQuery(newQuery);

        // Assert
        assertNotNull(savedQuery);
        assertEquals("Q-001", savedQuery.getQueryId());
        verify(queryRepository, times(1)).save(any(Query.class));
    }

    @Test
    void shouldUpdateQueryWithAdminReply() {
        // Arrange
        query1.setAdminReply("This is a reply.");
        when(queryRepository.existsById("Q-001")).thenReturn(true);
        when(queryRepository.findById("Q-001")).thenReturn(Optional.of(query1));
        when(queryRepository.save(query1)).thenReturn(query1);

        // Act
        Query updatedQuery = queryService.updateQuery("Q-001", query1);

        // Assert
        assertEquals("This is a reply.", updatedQuery.getAdminReply());
        verify(queryRepository, times(1)).save(query1);
    }

    @Test
    void shouldDeleteQuery() {
        // Arrange
        when(queryRepository.existsById("Q-001")).thenReturn(true);

        // Act
        queryService.deleteQuery("Q-001");

        // Assert
        verify(queryRepository, times(1)).deleteById("Q-001");
    }
}
