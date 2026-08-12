import { useEffect, useState } from "react";

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
    loadEvents();
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
      <h1>Event Stream</h1>
      <div>
        <input
          placeholder="event type, e.g. order.created"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />
        <input
          placeholder="payload"
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
        />
        <button onClick={handlePublish}>Publish Event</button>
      </div>

      <ul>
        {events.map((event) => (
          <li key={event.id}>
            [{event.timestamp}] {event.type} - {event.payload}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
