# Simple Blog App Using Microservices Architecture

This project demonstrates a simple, yet robust, blog application designed to showcase the power of microservices architecture. The application is composed of several loosely-coupled, independently deployable services that work together to provide a seamless user experience. Each service is built with a specific purpose and can scale or evolve independently, enabling greater flexibility and resilience.

**Business Logic:**

1. Users create posts and add comments to each post.
2. Comments undergo a moderation process to ensure content quality and compliance
3. Users see the status of their comments—whether they are under review, approved, or rejected.

## Key Features:

- **Microservices Architecture**: Several backend services built with Express.js handle different business logic, such as creating posts, adding comments, moderating content, and aggregating data.
- **Event-Driven Communication**: An event bus service facilitates asynchronous communication between microservices, enabling decoupled and scalable interactions.
- **Containerization with Docker**: Each service runs in its own Docker container, ensuring consistent environments across development, testing, and production.
- **Orchestration with Kubernetes**: A Kubernetes cluster manages the deployment, scaling, and availability of all services, providing a robust and fault-tolerant infrastructure.
- **React Frontend**: Provides a dynamic and responsive user interface for creating posts and viewing moderated comments.

By leveraging this microservices architecture, this project demonstrates the benefits of building scalable, maintainable, and highly available applications.

## Services

### Client

The client folder contains a React application that serves as the frontend for the project. It interacts with various backend services to display data and handle user actions.

### Posts

The posts service is an Express server that manages CRUD operations related to posts.

### Comments

The comments service is an Express server responsible for handling CRUD operations related to comments on posts.

### Moderation

The moderation service is an Express server that handles moderation logic for comments. It listens for events from the event-bus and performs the necessary actions.

### Query

The query service is an Express server that consolidates data from various services to serve as a single endpoint for the client.

### Event Bus

The event-bus service is an Express server that handles asynchronous communication between the various microservices. It helps in decoupling services and allows them to communicate via events.

### Infrastructure

The infra/k8s folder contains Kubernetes YAML manifests that define deployments and services for each microservice:

```
*-depl.yaml: Deployment files for different services.

*-srv.yaml: Service files for different services.

ingress-srv.yaml: Ingress configuration for routing traffic to the appropriate services.
```
