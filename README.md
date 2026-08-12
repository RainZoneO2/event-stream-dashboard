# Event Stream Dashboard

![CI](https://github.com/RainZoneO2/event-stream-dashboard/actions/workflows/ci.yml/badge.svg)

A small full-stack app demonstrating an event-driven, pub/sub pattern:
a Spring Boot backend publishes and stores events, and a React frontend shows
them updating live.

Built as a hands-on way to work with the stack and patterns used in modern
event-driven systems, Java/Spring Boot, React, REST APIs, and containerized
deployment.

## What it does

- Publish an event (a type + payload) via a simple form
- Events are persisted and served via a REST API
- The dashboard polls for new events every few seconds, so the feed updates
  live without a manual refresh

## Architecture

- **Backend**: Spring Boot (Java 25), layered as Controller → Service →
  Repository → H2 (in-memory database)
- **Frontend**: React + TypeScript (Vite), polling the backend's REST API
- **Deployment**: both sides are containerized; nginx serves the built
  frontend and reverse-proxies `/api` requests to the backend container
- **CI**: GitHub Actions builds and tests the backend, builds the frontend,
  and builds both Docker images on every push to `main`

## Running locally

**With Docker (recommended):**

```bash
docker compose up --build
```

Frontend: http://localhost:5173
Backend: http://localhost:8080/api/events

**Without Docker (for development):**

Backend:

```bash
cd backend
./mvnw spring-boot:run
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

The frontend dev server proxies `/api` requests to `localhost:8080`, so both
need to be running for the app to work fully.

## Design decisions

- **In-memory H2 database**: kept intentionally simple for a demo project;
  a production version would use a persistent database and likely a real
  message broker (Kafka, Solace, RabbitMQ) instead of a single service
  publishing directly to storage.
- **Polling instead of WebSockets**: simpler to implement correctly in the
  current scope; a production version would likely use WebSockets or
  Server-Sent Events for lower-latency updates.
- **Docker Compose over Kubernetes**: matches the deployment pattern I
  already run in production for other projects; Kubernetes would make more
  sense at a scale this project doesn't need.
