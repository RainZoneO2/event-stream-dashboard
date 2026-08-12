package dev.alghaith.event_stream_dashboard.controller;

import dev.alghaith.event_stream_dashboard.model.Event;
import dev.alghaith.event_stream_dashboard.service.EventService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PostMapping
    public Event publishEvent(@RequestBody PublishRequest request) {
        return eventService.publish(request.type(), request.payload());
    }

    @GetMapping
    public List<Event> getEvents() {
        return eventService.getRecentEvents();
    }

    public record PublishRequest(String type, String payload) {}
}
