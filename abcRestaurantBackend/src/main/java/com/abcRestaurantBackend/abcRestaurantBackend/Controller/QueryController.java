package com.abcRestaurantBackend.abcRestaurantBackend.Controller;

import com.abcRestaurantBackend.abcRestaurantBackend.Model.Query;
import com.abcRestaurantBackend.abcRestaurantBackend.Service.QueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/query")
public class QueryController {

    @Autowired
    private QueryService queryService;

    @GetMapping
    public ResponseEntity<List<Query>> getAllQueries() {
        return new ResponseEntity<>(queryService.allQuery(), HttpStatus.OK);
    }

    @GetMapping("/{queryId}")
    public ResponseEntity<Optional<Query>> getSingleQuery(@PathVariable String queryId) {  // Change ObjectId to String
        return new ResponseEntity<>(queryService.singleQuery(queryId), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Query> addQuery(@RequestBody Query query) {
        Query newQuery = queryService.addQuery(query);
        return new ResponseEntity<>(newQuery, HttpStatus.CREATED);
    }

    @PutMapping("/{queryId}")
    public ResponseEntity<Query> updateQuery(@PathVariable("queryId") String queryId, @RequestBody Query query) {  // Change ObjectId to String
        Query updateQuery = queryService.updateQuery(queryId, query);
        return ResponseEntity.ok(updateQuery);
    }

    @DeleteMapping("/{queryId}")
    public ResponseEntity<Void> deleteQuery(@PathVariable("queryId") String queryId) {  // Change ObjectId to String
        queryService.deleteQuery(queryId);
        return ResponseEntity.noContent().build();
    }
}
