package dev.alghaith.event_stream_dashboard.model;


import jakarta.persistence.*;
import java.time.Instant;

@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type; // e.g "order.created"
    private String payload; // event data
    private Instant timestamp;

    protected Event() {

    }

    public Event(String type, String payload) {
        this.type = type;
        this.payload = payload;
        this.timestamp = Instant.now();
    }

    // Getters
    public Long getId() { return id; }
    public String getType() {return type; }
    public String getPayload() { return payload; }
    public Instant getTimestamp() {return timestamp; }

}
