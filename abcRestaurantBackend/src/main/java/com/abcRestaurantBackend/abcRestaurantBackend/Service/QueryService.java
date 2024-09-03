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
        return queryRepository.findAll();
    }

    public Optional<Query> singleQuery(String queryId) {  // Change ObjectId to String
        return queryRepository.findById(queryId);
    }

    public Query addQuery(Query query) {
        if (query.getQueryId() == null || query.getQueryId()   .isEmpty()) {
            query.setQueryId(generateQueryrId());  // Ensure userId is set
        }
        return queryRepository.save(query);
    }

    private String generateQueryrId() {
        long count = queryRepository.count();
        return String.format("Q-%03d", count + 1);
    }

    public Query updateQuery(String queryId, Query query) {
        if (!queryRepository.existsById(queryId)) {
            throw new ResourceNotFoundException("Query not found with queryId " + queryId);
        }
        Query existingQuery = queryRepository.findById(queryId).orElseThrow(() ->
                new ResourceNotFoundException("Query not found with queryId " + queryId));
        existingQuery.setAdminReply(query.getAdminReply());  // Set the admin reply
        return queryRepository.save(existingQuery);
    }


    public void deleteQuery(String queryId) {  // Change ObjectId to String
        if (!queryRepository.existsById(queryId)) {
            throw new ResourceNotFoundException("Query not found with queryId " + queryId);
        }
        queryRepository.deleteById(queryId);
    }
}
