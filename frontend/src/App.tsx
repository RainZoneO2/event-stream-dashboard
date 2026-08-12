import { useEffect, useState } from "react";

type Event = {
  id: number;
  type: string;
  payload: string;
  timestamp: string;
};

function App() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <div>
      <h1>Event Stream</h1>
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
