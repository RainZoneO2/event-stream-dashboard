package dev.alghaith.event_stream_dashboard.repository;

import dev.alghaith.event_stream_dashboard.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}
