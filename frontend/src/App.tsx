import { useEffect, useState } from "react";

import "./App.css";

type Event = {
  id: number;
  type: string;
  payload: string;
  timestamp: string;
};

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [type, setType] = useState("");
  const [payload, setPayload] = useState("");

  const loadEvents = () => {
    fetch("http://localhost:8080/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  };

  useEffect(() => {
    const interval = setInterval(loadEvents, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePublish = async () => {
    await fetch("http://localhost:8080/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, payload }),
    });
    setType("");
    setPayload("");
    loadEvents();
  };

  return (
    <div>
      <div className="app-header">
        <h1>
          <span className="status-dot" />
          Event Stream
        </h1>
      </div>
      <div className="publish-form">
        <input
          placeholder="Event type (e.g. order.created)"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          placeholder="Payload"
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
        />
        <button onClick={handlePublish}>Publish Event</button>
      </div>

      <ul className="event-list">
        {events.map((event) => (
          <li key={event.id} className="event-item">
            <span className="event-time">
              {new Date(event.timestamp).toLocaleTimeString()}
            </span>
            <span className="event-type">{event.type}</span>
            <span className="event-payload">{event.payload}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
