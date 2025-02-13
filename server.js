import app from "./src/app.js";
import connectDB from "./src/config/db.js";

import http from "http";
import initSocket from "./src/socket.js";

connectDB();

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);
const io = initSocket(server);

server.listen(PORT, HOST, () =>
  console.log(`[/] Server running on: ${HOST}:${PORT}`)
);
