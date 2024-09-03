package com.abcRestaurantBackend.abcRestaurantBackend.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Facility")
public class Facility {
    @Id
    private String id;
    private String heading;
    private String description;
    private byte[] image; // Ensure this is defined as byte[]

    public Facility() {
        // Default constructor
    }

    public Facility(String id, String heading, String description, byte[] image) {
        this.id = id;
        this.heading = heading;
        this.description = description;
        this.image = image;
    }

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getHeading() {
        return heading;
    }

    public void setHeading(String heading) {
        this.heading = heading;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}
