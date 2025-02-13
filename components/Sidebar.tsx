"use client"

import type React from "react"
import { useState } from "react"
import { MessageCircle, Users, Settings, Phone, Bookmark } from "lucide-react"
import { useTranslation } from "react-i18next"
import type { Socket } from "socket.io-client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Chat {
  id: string
  name: string
  type: "private" | "group"
  lastMessage: string
  unread: number
}

interface SidebarProps {
  chats: Chat[]
  onSelectChat: (chatId: string) => void
  ws: Socket | null
}

const Sidebar: React.FC<SidebarProps> = ({ chats, onSelectChat, ws }) => {
  const { t } = useTranslation()
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false)
  const [groupName, setGroupName] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeNavItem, setActiveNavItem] = useState("chats")

  const handleCreateGroup = () => {
    if (ws && groupName.trim()) {
      ws.emit("createGroup", { name: groupName.trim() })
      setGroupName("")
      setIsGroupModalOpen(false)
    }
  }

  const filteredChats = chats.filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const renderContent = () => {
    switch (activeNavItem) {
      case "chats":
        return (
          <div className="overflow-y-auto h-[calc(100vh-8rem)]">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                className="flex items-center p-4 hover:bg-[#202b36] cursor-pointer"
                onClick={() => onSelectChat(chat.id)}
              >
                <div className="w-12 h-12 bg-[#2b5278] rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {chat.type === "group" ? <Users className="h-6 w-6" /> : chat.name[0]}
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold">{chat.name}</h3>
                  <p className="text-sm text-gray-400">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <div className="bg-[#4eab6c] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    {chat.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      case "calls":
        return <div className="p-4 text-center text-gray-400">Calls feature coming soon</div>
      case "bookmarks":
        return <div className="p-4 text-center text-gray-400">Bookmarks feature coming soon</div>
      case "settings":
        return <div className="p-4 text-center text-gray-400">Settings feature coming soon</div>
      default:
        return null
    }
  }

  return (
    <div className="w-full md:w-80 bg-[#17212b] text-white flex flex-col">
      {/* Removed Menu button */}
      {renderContent()}
      <div className="mt-auto p-4 flex justify-around border-t border-[#202b36]">
        <button
          onClick={() => setActiveNavItem("chats")}
          className={`p-2 rounded-full ${activeNavItem === "chats" ? "bg-[#2b5278]" : "hover:bg-[#202b36]"}`}
        >
          <MessageCircle className="h-6 w-6" />
        </button>
        <button
          onClick={() => setActiveNavItem("calls")}
          className={`p-2 rounded-full ${activeNavItem === "calls" ? "bg-[#2b5278]" : "hover:bg-[#202b36]"}`}
        >
          <Phone className="h-6 w-6" />
        </button>
        <button
          onClick={() => setActiveNavItem("bookmarks")}
          className={`p-2 rounded-full ${activeNavItem === "bookmarks" ? "bg-[#2b5278]" : "hover:bg-[#202b36]"}`}
        >
          <Bookmark className="h-6 w-6" />
        </button>
        <button
          onClick={() => setActiveNavItem("settings")}
          className={`p-2 rounded-full ${activeNavItem === "settings" ? "bg-[#2b5278]" : "hover:bg-[#202b36]"}`}
        >
          <Settings className="h-6 w-6" />
        </button>
      </div>
      <div className="p-4 flex justify-end">
        <button
          onClick={() => setIsGroupModalOpen(true)}
          className="bg-[#4eab6c] hover:bg-[#45a065] text-white rounded-full p-4 shadow-lg"
        >
          <Users className="h-6 w-6" />
        </button>
      </div>
      <Dialog open={isGroupModalOpen} onOpenChange={setIsGroupModalOpen}>
        <DialogContent className="bg-[#17212b] text-white">
          <DialogHeader>
            <DialogTitle>{t("Create New Group")}</DialogTitle>
          </DialogHeader>
          <Input
            placeholder={t("Enter group name")}
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="bg-[#242f3d] text-white border-none"
          />
          <DialogFooter>
            <Button onClick={handleCreateGroup} className="bg-[#4eab6c] hover:bg-[#45a065]">
              {t("Create Group")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Sidebar

