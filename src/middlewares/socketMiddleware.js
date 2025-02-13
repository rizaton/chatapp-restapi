import { verifyAccessToken } from "../utils/jwt.js";

const socketAuthMiddleware = (socket, next) => {
  const token = socket.handshake.auth?.token || socket.handshake.query?.token;

  if (!token) {
    return next(new Error("Authentication error: Token required"));
  }

  try {
    const decoded = verifyAccessToken(token);
    socket.user = decoded;
    next();
  } catch (error) {
    return next(new Error("Authentication error: Invalid token"));
  }
};

export default socketAuthMiddleware;
