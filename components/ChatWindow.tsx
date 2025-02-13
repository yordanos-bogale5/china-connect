"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import {
  ArrowLeft,
  Paperclip,
  Mic,
  Send,
  Video,
  Phone,
  Smile,
  FileText,
  Check,
  CheckCheck,
  MoreVertical,
} from "lucide-react"
import { useTranslation } from "react-i18next"
import { encrypt, decrypt } from "../utils/encryption"
import type { Socket } from "socket.io-client"
import EmojiPicker from "./EmojiPicker"

interface ChatWindowProps {
  selectedChat: string | null
  onBack: () => void
  ws: Socket | null
  currentUser: { id: string }
  startCall: (chatId: string | null, callType: "voice" | "video") => void
}

interface Message {
  id: string
  chatId: string
  senderId: string
  senderName: string
  text: string
  timestamp: string
  type: "text" | "image" | "video" | "audio" | "file"
  file?: string
  fileName?: string
  status: "sent" | "delivered" | "read"
  reaction?: string
}

const mockMessages: Message[] = [
  {
    id: "1",
    chatId: "1",
    senderId: "user1",
    senderName: "张小明",
    text: "你好！今天过得怎么样？",
    timestamp: "2023-05-10T10:00:00Z",
    type: "text",
    status: "read",
  },
  {
    id: "2",
    chatId: "1",
    senderId: "currentUser",
    senderName: "You",
    text: "嗨！我很好，谢谢。你呢？",
    timestamp: "2023-05-10T10:05:00Z",
    type: "text",
    status: "read",
  },
  {
    id: "3",
    chatId: "1",
    senderId: "user1",
    senderName: "张小明",
    text: "我也不错。你周末有什么计划吗？",
    timestamp: "2023-05-10T10:10:00Z",
    type: "text",
    status: "delivered",
  },
]

const ChatWindow: React.FC<ChatWindowProps> = ({ selectedChat, onBack, ws, currentUser, startCall }) => {
  const { t } = useTranslation()
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ws) {
      ws.on("newMessage", (data: Message) => {
        if (data.chatId === selectedChat) {
          const decryptedMessage = { ...data, text: decrypt(data.text) }
          setMessages((prevMessages) => [...prevMessages, decryptedMessage])
        }
      })

      ws.on("messageStatus", ({ messageId, status }: { messageId: string; status: "delivered" | "read" }) => {
        setMessages((prevMessages) => prevMessages.map((msg) => (msg.id === messageId ? { ...msg, status } : msg)))
      })
    }

    return () => {
      if (ws) {
        ws.off("newMessage")
        ws.off("messageStatus")
      }
    }
  }, [ws, selectedChat])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messagesEndRef]) //Corrected dependency here

  const handleSendMessage = () => {
    if (message.trim() && selectedChat) {
      const newMessage: Message = {
        id: Date.now().toString(),
        chatId: selectedChat,
        senderId: currentUser.id,
        senderName: "You",
        text: message,
        timestamp: new Date().toISOString(),
        type: "text",
        status: "sent",
      }
      setMessages((prevMessages) => [...prevMessages, newMessage])
      setMessage("")
      if (ws) {
        const encryptedMessage = encrypt(message)
        ws.emit("message", { ...newMessage, text: encryptedMessage })
      }
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && selectedChat) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const fileType = file.type.startsWith("image/")
            ? "image"
            : file.type.startsWith("video/")
              ? "video"
              : file.type.startsWith("audio/")
                ? "audio"
                : "file"
          const newMessage: Message = {
            id: Date.now().toString(),
            chatId: selectedChat,
            senderId: currentUser.id,
            senderName: "You",
            text: file.name,
            timestamp: new Date().toISOString(),
            type: fileType,
            file: e.target?.result as string,
            fileName: file.name,
            status: "sent",
          }
          setMessages((prevMessages) => [...prevMessages, newMessage])
          if (ws) {
            ws.emit("file", newMessage)
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleEmojiSelect = (emoji: string) => {
    setMessage((prevMessage) => prevMessage + emoji)
    setShowEmojiPicker(false)
  }

  const handleReaction = (messageId: string, reaction: string) => {
    setMessages((prevMessages) => prevMessages.map((msg) => (msg.id === messageId ? { ...msg, reaction } : msg)))
    if (ws) {
      ws.emit("reaction", { messageId, reaction })
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  const renderMessage = (msg: Message) => {
    switch (msg.type) {
      case "text":
        return <p>{msg.text}</p>
      case "image":
        return <img src={msg.file || "/placeholder.svg"} alt="Shared image" className="max-w-xs rounded" />
      case "video":
        return <video src={msg.file} controls className="max-w-xs rounded" />
      case "audio":
        return <audio src={msg.file} controls />
      case "file":
        return (
          <div className="flex items-center">
            <FileText className="mr-2" />
            <a href={msg.file} download={msg.fileName} className="text-blue-500 hover:underline">
              {msg.fileName}
            </a>
          </div>
        )
      default:
        return null
    }
  }

  if (!selectedChat) {
    return (
      <div className="flex-grow bg-[#0e1621] flex items-center justify-center text-gray-500">
        {t("Select a chat to start")}
      </div>
    )
  }

  return (
    <div className="flex-grow flex flex-col bg-[#0e1621] text-white h-full">
      <div className="p-4 bg-[#17212b] border-b border-[#202b36] flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={onBack} className="md:hidden mr-4 text-gray-400">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div className="w-10 h-10 bg-[#2b5278] rounded-full flex items-center justify-center text-white font-bold mr-4">
            {selectedChat[0].toUpperCase()}
          </div>
          <div>
            <h2 className="font-semibold">张小明</h2>
            <p className="text-sm text-gray-400">{t("Online")}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => startCall(selectedChat, "voice")} className="text-gray-400">
            <Phone className="h-5 w-5" />
          </button>
          <button onClick={() => startCall(selectedChat, "video")} className="text-gray-400">
            <Video className="h-5 w-5" />
          </button>
          <button className="text-gray-400">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`mb-4 ${msg.senderId === currentUser.id ? "text-right" : "text-left"}`}>
            <div
              className={`inline-block p-2 rounded-lg ${
                msg.senderId === currentUser.id ? "bg-[#2b5278] text-white" : "bg-[#182533] text-white"
              }`}
            >
              <p className="font-bold">{msg.senderName}</p>
              {renderMessage(msg)}
              <div className="flex items-center text-xs text-gray-400">
                {new Date(msg.timestamp).toLocaleString()}
                {msg.senderId === currentUser.id && (
                  <span className="ml-2">
                    {msg.status === "sent" && <Check className="inline h-4 w-4" />}
                    {msg.status === "delivered" && <CheckCheck className="inline h-4 w-4" />}
                    {msg.status === "read" && <CheckCheck className="inline h-4 w-4 text-[#4C9CE7]" />}
                  </span>
                )}
              </div>
              {msg.reaction && <span className="ml-2">{msg.reaction}</span>}
              <div className="mt-1">
                <button onClick={() => handleReaction(msg.id, "👍")} className="mr-1">
                  👍
                </button>
                <button onClick={() => handleReaction(msg.id, "❤️")} className="mr-1">
                  ❤️
                </button>
                <button onClick={() => handleReaction(msg.id, "😂")} className="mr-1">
                  😂
                </button>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-[#17212b] border-t border-[#202b36]">
        <div className="flex items-center bg-[#242f3d] rounded-full">
          <input
            type="file"
            id="file-upload"
            className="hidden"
            onChange={handleFileUpload}
            multiple
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx"
            ref={fileInputRef}
          />
          <label htmlFor="file-upload" className="p-2 text-gray-400 cursor-pointer">
            <Paperclip className="h-6 w-6" />
          </label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage()
              }
            }}
            placeholder={t("Write a message...")}
            className="flex-grow bg-transparent px-4 py-2 focus:outline-none text-white placeholder-gray-500"
          />
          <button className="p-2 text-gray-400" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            <Smile className="h-6 w-6" />
          </button>
          {message ? (
            <button className="p-2 text-[#4eab6c]" onClick={handleSendMessage}>
              <Send className="h-6 w-6" />
            </button>
          ) : (
            <button className="p-2 text-gray-400" onClick={toggleRecording}>
              <Mic className={`h-6 w-6 ${isRecording ? "text-red-500" : ""}`} />
            </button>
          )}
        </div>
        {showEmojiPicker && <EmojiPicker onEmojiSelect={handleEmojiSelect} onClose={() => setShowEmojiPicker(false)} />}
      </div>
    </div>
  )
}

export default ChatWindow

