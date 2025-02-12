import app from "./src/app.js";
import connectDB from "./src/config/db.js";

connectDB();

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 8000;

app.listen(PORT, HOST, () =>
  console.log(`[/] Server running on: ${HOST}:${PORT}`)
);
