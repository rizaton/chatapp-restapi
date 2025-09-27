# chatapp-restapi

A simple backend for chat application testing.  
Built with **Express.js**, **Socket.IO**, **MongoDB**, and **Redis**.  
Supports Docker with `compose.yaml`.  

---

| **Prompt (Command / Step)** | **Documentation / Result** |
|------------------------------|-----------------------------|
| `git clone https://github.com/rizaton/chatapp-restapi.git` | Clone the repository to your local machine |
| `cd chatapp-restapi` | Move into the project directory |
| `docker compose up -d` | Start all services (backend, MongoDB, Redis) in detached mode |
| `docker compose ps` | Check running containers |
| Backend entrypoint → `server.js` | Express server and Socket.IO gateway start here |
| API available at → `http://localhost:8000` | REST API base URL |
| WebSocket available at → `ws://localhost:8000` | Socket.IO connection endpoint |

---

## Features
- 🔑 Authentication with Redis session keys  
- 💬 Real-time messaging via Socket.IO  
- 📦 REST API for user and chat data  
- 🗄️ MongoDB for message storage  
- 🐳 Dockerized environment for easy setup  

---

## Requirements
- Docker & Docker Compose installed  
- Ports `8000`, `27017`, and `6379` free  

---

Made using Express.js & Socket.IO
