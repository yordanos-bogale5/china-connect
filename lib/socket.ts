import { io } from "socket.io-client"

export const socket = io(
  process.env.NEXT_PUBLIC_WS_URL || "wss://v0-telegram-clone-chat-software-5eb3qn.vercel.app/socket",
  {
    autoConnect: false,
  },
)

export const connectSocket = (userId: string) => {
  socket.auth = { userId }
  socket.connect()
}

export const disconnectSocket = () => {
  socket.disconnect()
}

export const subscribeToMessages = (callback: (message: any) => void) => {
  socket.on("message", callback)
  return () => {
    socket.off("message", callback)
  }
}

export const sendMessage = (message: any) => {
  socket.emit("message", message)
}

