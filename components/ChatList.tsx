"use client"

import { Check, CheckCheck, Mic, Users } from "lucide-react"
import { useTranslation } from "react-i18next"
import Image from "next/image"

interface Chat {
  id: string
  name: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread: number
  status?: "sent" | "delivered" | "read"
  isOnline?: boolean
  hasMedia?: boolean
  mediaType?: "photo" | "voice" | "video" | "file"
  type?: "single" | "group"
  participants?: string[]
}

interface ChatListProps {
  chats: Chat[]
  onSelectChat: (chatId: string) => void
  selectedChat: string | null
}

export default function ChatList({ chats, onSelectChat, selectedChat }: ChatListProps) {
  const { t } = useTranslation()

  const renderMessagePrefix = (chat: Chat) => {
    if (chat.hasMedia) {
      switch (chat.mediaType) {
        case "photo":
          return <span className="text-[#4C9CE7] mr-1">📷</span>
        case "voice":
          return <Mic className="w-4 h-4 text-[#4C9CE7] mr-1" />
        case "video":
          return <span className="text-[#4C9CE7] mr-1">📹</span>
        case "file":
          return <span className="text-[#4C9CE7] mr-1">📎</span>
      }
    }
    return null
  }

  const renderAvatar = (chat: Chat) => {
    if (chat.type === "group") {
      return (
        <div className="relative w-[54px] h-[54px] bg-[#2b5278] rounded-full flex items-center justify-center">
          <Users className="w-6 h-6 text-white" />
          {chat.participants?.length > 0 && (
            <div className="absolute -bottom-1 -right-1 bg-[#4C9CE7] text-white text-xs rounded-full px-2">
              {chat.participants.length}
            </div>
          )}
        </div>
      )
    }
    return (
      <div className="w-full h-full rounded-full overflow-hidden bg-[#2b5278] flex items-center justify-center text-white font-medium">
        {chat.avatar ? (
          <Image
            src={chat.avatar || "/placeholder.svg"}
            alt={chat.name}
            width={54}
            height={54}
            className="object-cover"
          />
        ) : (
          <span className="text-2xl">{chat.name[0]}</span>
        )}
      </div>
    )
  }

  return (
    <div className="w-[350px] border-r border-[#232e3c] flex flex-col h-full bg-[#17212b]">
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`w-full flex items-center px-4 py-2.5 hover:bg-[#2b5278]/10 transition-colors ${
              selectedChat === chat.id ? "bg-[#2b5278]/10" : ""
            }`}
          >
            <div className="relative w-[54px] h-[54px] mr-4 flex-shrink-0">
              {renderAvatar(chat)}
              {chat.isOnline && (
                <div className="absolute bottom-0 right-0 w-[14px] h-[14px] bg-green-500 rounded-full border-2 border-[#17212b]" />
              )}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="flex justify-between items-start mb-1">
                <div className="font-medium text-[15px] text-gray-200 truncate pr-2">{chat.name}</div>
                <div className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0 mt-0.5">{chat.timestamp}</div>
              </div>
              <div className="flex justify-between items-start">
                <div className="text-[15px] text-gray-400 truncate pr-2 flex items-center max-w-[85%]">
                  {renderMessagePrefix(chat)}
                  {chat.status && (
                    <span className="mr-1 flex-shrink-0">
                      {chat.status === "sent" && <Check className="inline h-4 w-4" />}
                      {chat.status === "delivered" && <CheckCheck className="inline h-4 w-4" />}
                      {chat.status === "read" && <CheckCheck className="inline h-4 w-4 text-[#4C9CE7]" />}
                    </span>
                  )}
                  {chat.lastMessage}
                </div>
                {chat.unread > 0 && (
                  <div className="ml-2 bg-[#4C9CE7] text-white text-xs rounded-full px-[6px] py-[3px] min-w-[20px] text-center flex-shrink-0">
                    {chat.unread}
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

