import { Server } from "socket.io"
import type { Server as HTTPServer } from "http"
import { encryptMessage } from "@/lib/encryption"

export const initializeSocketServer = (server: HTTPServer) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.NEXT_PUBLIC_APP_URL,
      methods: ["GET", "POST"],
    },
  })

  io.on("connection", (socket) => {
    const userId = socket.handshake.auth.userId

    socket.join(userId)

    socket.on("message", async (data) => {
      const encryptedMessage = encryptMessage(JSON.stringify(data))

      // Store in database (implementation needed)

      // Broadcast to recipients
      data.recipients.forEach((recipientId: string) => {
        io.to(recipientId).emit("message", {
          ...data,
          content: encryptedMessage,
        })
      })
    })

    socket.on("call:start", (data) => {
      io.to(data.recipientId).emit("call:incoming", {
        callerId: userId,
        type: data.type,
      })
    })

    socket.on("call:accept", (data) => {
      io.to(data.callerId).emit("call:accepted", {
        recipientId: userId,
      })
    })

    socket.on("call:reject", (data) => {
      io.to(data.callerId).emit("call:rejected", {
        recipientId: userId,
      })
    })

    socket.on("call:end", (data) => {
      io.to(data.recipientId).emit("call:ended", {
        callerId: userId,
      })
    })

    socket.on("disconnect", () => {
      // Update user status (implementation needed)
    })
  })

  return io
}

