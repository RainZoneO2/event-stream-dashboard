package dev.alghaith.event_stream_dashboard.service;

import dev.alghaith.event_stream_dashboard.model.Event;
import dev.alghaith.event_stream_dashboard.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public Event publish(String type, String payload) {
        Event event = new Event(type, payload);
        return eventRepository.save(event);
    }

    public List<Event> getRecentEvents() {
        return eventRepository.findAll();
    }
}
