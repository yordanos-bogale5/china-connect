"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { io, type Socket } from "socket.io-client"
import Sidebar from "./Sidebar"
import ChatWindow from "./ChatWindow"
import LoginButton from "./LoginButton"
import { useTranslation } from "react-i18next"

interface Chat {
  id: string
  name: string
  type: "private" | "group"
  lastMessage: string
  unread: number
}

const ChatInterface: React.FC = () => {
  const { t } = useTranslation()
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [ws, setWs] = useState<Socket | null>(null)
  const [chats, setChats] = useState<Chat[]>([])
  const [activeNavItem, setActiveNavItem] = useState("chats")

  useEffect(() => {
    const socketInitializer = async () => {
      await fetch("/api/socket")
      const socket = io()
      setWs(socket)

      socket.on("connect", () => {
        console.log("WebSocket connection established")
      })

      socket.on("chats", (data: Chat[]) => {
        setChats(data)
      })

      socket.on("newMessage", (data) => {
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === data.chatId
              ? {
                  ...chat,
                  lastMessage: data.type === "text" ? data.text : `New ${data.type}`,
                  unread: chat.unread + 1,
                }
              : chat,
          ),
        )
      })

      socket.on("disconnect", () => {
        console.log("WebSocket connection closed")
      })
    }

    socketInitializer()

    return () => {
      if (ws) {
        ws.disconnect()
      }
    }
  }, [ws]) // Added ws to the dependency array

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleLogin = () => {
    if (ws) {
      ws.emit("auth")
      setIsLoggedIn(true)
    }
  }

  const handleSelectChat = (chatId: string) => {
    setSelectedChat(chatId)
    setChats((prevChats) => prevChats.map((chat) => (chat.id === chatId ? { ...chat, unread: 0 } : chat)))
  }

  if (!isLoggedIn) {
    return (
      <div className="flex h-full items-center justify-center bg-[#17212b]">
        <LoginButton onLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div className="flex h-full bg-[#17212b]">
      {(!isMobile || !selectedChat) && (
        <Sidebar
          chats={chats}
          onSelectChat={handleSelectChat}
          ws={ws}
          activeNavItem={activeNavItem}
          setActiveNavItem={setActiveNavItem}
        />
      )}
      {(!isMobile || selectedChat) && activeNavItem === "chats" && (
        <ChatWindow selectedChat={selectedChat} onBack={() => setSelectedChat(null)} ws={ws} />
      )}
      {activeNavItem !== "chats" && (
        <div className="flex-grow flex items-center justify-center text-white">
          <h2 className="text-2xl">{activeNavItem.charAt(0).toUpperCase() + activeNavItem.slice(1)} coming soon</h2>
        </div>
      )}
    </div>
  )
}

export default ChatInterface

