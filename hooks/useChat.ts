"use client"

import { useState, useEffect } from "react"
import { socket } from "@/lib/socket"
import { encryptMessage, decryptMessage } from "@/lib/encryption"
import type { Message } from "@/types/chat"

export const useChat = (chatId: string) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const handleNewMessage = (message: Message) => {
      if (message.content) {
        const decryptedContent = decryptMessage(message.content)
        setMessages((prev) => [...prev, { ...message, content: decryptedContent }])
      }
    }

    const handleTyping = (data: { chatId: string; isTyping: boolean }) => {
      if (data.chatId === chatId) {
        setIsTyping(data.isTyping)
      }
    }

    socket.on(`chat:${chatId}:message`, handleNewMessage)
    socket.on(`chat:${chatId}:typing`, handleTyping)

    return () => {
      socket.off(`chat:${chatId}:message`, handleNewMessage)
      socket.off(`chat:${chatId}:typing`, handleTyping)
    }
  }, [chatId])

  const sendMessage = async (content: string, type: Message["type"] = "text") => {
    try {
      const encryptedContent = encryptMessage(content)
      const message: Partial<Message> = {
        chatId,
        content: encryptedContent,
        type,
        timestamp: new Date(),
        status: "sent",
      }

      socket.emit("message", message)
    } catch (err) {
      setError(err as Error)
    }
  }

  const sendTypingStatus = (isTyping: boolean) => {
    socket.emit("typing", { chatId, isTyping })
  }

  return {
    messages,
    isTyping,
    error,
    sendMessage,
    sendTypingStatus,
  }
}

