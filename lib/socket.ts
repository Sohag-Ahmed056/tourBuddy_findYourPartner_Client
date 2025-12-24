// src/lib/socket.ts
import { io, Socket } from "socket.io-client";

export const socket: Socket = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000", {
  autoConnect: false,
});