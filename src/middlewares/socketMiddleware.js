import { verifyAccessToken } from "../utils/jwt.js";

const socketAuthMiddleware = (socket, next) => {
  const authToken =
    socket.handshake.auth?.token || socket.handshake.headers?.token;

  if (!authToken) {
    return next(new Error("Authentication error: Token required"));
  }

  try {
    const decoded = verifyAccessToken(authToken);
    socket.user = decoded;
    next();
  } catch (error) {
    return next(new Error("Authentication error: Invalid token"));
  }
};

export default socketAuthMiddleware;
