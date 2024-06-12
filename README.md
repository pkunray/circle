[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/8YUwBV4X)

## What is Circle

Circle is a public social network designed with the best elements of popular platforms. Its user interface and core idea take inspiration from Twitter and Threads. In Circle, you'll experience a clean, ad-free environment with no inappropriate recommendations. It's a dedicated space where you, your friends and like-minded people can connect, share, and strengthen your relationships.

## Build and run docker images

First, go to the root folder of this repository, replace the configuration in `.env.sample` with your own, and save it as `.env`.
After that, head to the folder of `circle-backend`, replace the configration in `.env.sample` with your own, and save it as `.env`.

Then run the command:

```
docker compose up -d

```

This will build two images, which are the frontend and the backend of the application, and pull two images from Docker Hub, which are `mongo` and `mongo-express`, then run them all. The expected result contains four running containers, like:

```
CONTAINER ID   IMAGE                                         COMMAND                  CREATED         STATUS         PORTS                      NAMES
d7e8d277e974   sad-01-24-teamspringrollsauerkraut-frontend   "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes   0.0.0.0:3000->3000/tcp     sad-01-24-teamspringrollsauerkraut-frontend-1
6ee02df03f14   sad-01-24-teamspringrollsauerkraut-backend    "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes   0.0.0.0:9000->9000/tcp     sad-01-24-teamspringrollsauerkraut-backend-1
37572cdc5008   mongo-express:latest                          "/sbin/tini -- /dock…"   2 minutes ago   Up 2 minutes   0.0.0.0:8081->8081/tcp     sad-01-24-teamspringrollsauerkraut-mongo-express-1
066893f04dc2   mongo:latest                                  "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes   0.0.0.0:27017->27017/tcp   sad-01-24-teamspringrollsauerkraut-mongo-1

```

As and alternative, you can also download the source code, and run them on your local machine:

## Start the frontend

```
cd circle-frontend

npm run dev

```

## Start the backend

```
cd circle-backend

npm start

```

## API Document

After running circle-backend, visit http://localhost:9000/api-docs/

## Tech stack

### Frontend

- React
- Chakra UI
- Custom CSS
- Recoil

### Backend

- Node.js
- Express.js

### Database

- MongoDB

### Authentication

- JWT

### Communication

- HTTP RESTful APIs
- Socket.IO

### API Documentation

- Swagger

### Unit Test

- Jest
- Enzyme
- Babel

### DevOps

- Github Actions
- Docker & Docker Compose

## Team Coding Standards

- [Semantic Commit Messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)
- Code formatting with **Prettier**
