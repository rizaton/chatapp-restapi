import server from "../src/app.js";
import connectDB from "../src/config/db.js";

connectDB();

const PORT = process.env.PORT || 3000;

server.listen(3000, () => console.log(`[/] Server running on port ${PORT}`));

module.exports = server;