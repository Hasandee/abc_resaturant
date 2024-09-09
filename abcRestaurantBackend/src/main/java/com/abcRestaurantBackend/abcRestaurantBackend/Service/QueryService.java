package com.abcRestaurantBackend.abcRestaurantBackend.Service;

import com.abcRestaurantBackend.abcRestaurantBackend.Exception.ResourceNotFoundException;
import com.abcRestaurantBackend.abcRestaurantBackend.Model.Query;
import com.abcRestaurantBackend.abcRestaurantBackend.Repository.QueryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QueryService {
    @Autowired
    private QueryRepository queryRepository;

    public List<Query> allQuery() {
        try {
            return queryRepository.findAll();
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving queries", e);
        }
    }

    public Optional<Query> singleQuery(String queryId) {
        try {
            return queryRepository.findById(queryId);
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving query with ID: " + queryId, e);
        }
    }

    public Query addQuery(Query query) {
        try {
            if (query.getQueryId() == null || query.getQueryId().isEmpty()) {
                query.setQueryId(generateQueryrId());  // Ensure queryId is set
            }
            return queryRepository.save(query);
        } catch (Exception e) {
            throw new RuntimeException("Error adding new query", e);
        }
    }

    private String generateQueryrId() {
        try {
            long count = queryRepository.count();
            return String.format("Q-%03d", count + 1);
        } catch (Exception e) {
            throw new RuntimeException("Error generating query ID", e);
        }
    }

    public Query updateQuery(String queryId, Query query) {
        try {
            if (!queryRepository.existsById(queryId)) {
                throw new ResourceNotFoundException("Query not found with queryId " + queryId);
            }
            Query existingQuery = queryRepository.findById(queryId).orElseThrow(() ->
                    new ResourceNotFoundException("Query not found with queryId " + queryId));
            existingQuery.setAdminReply(query.getAdminReply());  // Set the admin reply
            return queryRepository.save(existingQuery);
        } catch (ResourceNotFoundException e) {
            throw e;  // Let custom exceptions propagate
        } catch (Exception e) {
            throw new RuntimeException("Error updating query with ID: " + queryId, e);
        }
    }

    public void deleteQuery(String queryId) {
        try {
            if (!queryRepository.existsById(queryId)) {
                throw new ResourceNotFoundException("Query not found with queryId " + queryId);
            }
            queryRepository.deleteById(queryId);
        } catch (ResourceNotFoundException e) {
            throw e;  // Let custom exceptions propagate
        } catch (Exception e) {
            throw new RuntimeException("Error deleting query with ID: " + queryId, e);
        }
    }
}
