"use client"

import { useState, useEffect } from "react"
import TelegramLoginButton from "@/components/TelegramLoginButton"
import { handleTelegramAuth } from "@/lib/telegram"
import MainMenu from "@/components/MainMenu"
import ChatList from "@/components/ChatList"
import ChatWindow from "@/components/ChatWindow"
import UserProfile from "@/components/UserProfile"
import VerticalNav from "@/components/VerticalNav"
import TopMenuBar from "@/components/TopMenuBar"
import { mockChats } from "@/mocks/data"
import { connectSocket, socket } from "@/lib/socket"

export default function Home() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [showUserProfile, setShowUserProfile] = useState(false)
  const [showMainMenu, setShowMainMenu] = useState(false)
  const [activeSection, setActiveSection] = useState("all-chats")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("telegramUser")
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
      setIsLoggedIn(true)
      connectSocket(parsedUser.id)
    }
  }, [])

  const unreadCount = mockChats.reduce((acc, chat) => acc + chat.unread, 0)
  const botCount = mockChats.filter((chat) => chat.type === "bot").length

  const filteredChats = mockChats.filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleLogin = async (telegramUser: any) => {
    try {
      const user = await handleTelegramAuth(telegramUser)
      setIsLoggedIn(true)
      setUser(user)
      localStorage.setItem("telegramUser", JSON.stringify(user))
      connectSocket(user.id)
    } catch (error) {
      console.error("Login failed:", error)
      alert("Authentication failed. Please try again.")
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0e1621]">
        <div className="bg-[#17212b] p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-medium text-white mb-6">Welcome to China Connect</h1>
          <TelegramLoginButton onAuth={handleLogin} />
        </div>
      </div>
    )
  }

  return (
    <main className="flex h-screen bg-[#0e1621] text-white">
      <TopMenuBar onMenuClick={() => setShowMainMenu(true)} onSearch={setSearchQuery} />
      <MainMenu
        onNavigate={setActiveSection}
        activeItem={activeSection}
        isOpen={showMainMenu}
        onClose={() => setShowMainMenu(false)}
      />
      <div className="flex flex-1 pt-14">
        <VerticalNav
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          unreadCount={unreadCount}
          botCount={botCount}
        />
        <div className="flex flex-1">
          <div className="w-1/3 border-r border-[#202b36] overflow-y-auto">
            <ChatList chats={filteredChats} onSelectChat={setSelectedChat} selectedChat={selectedChat} />
          </div>
          <div className="w-2/3">
            <ChatWindow
              selectedChat={selectedChat}
              onBack={() => setSelectedChat(null)}
              onShowProfile={() => setShowUserProfile(true)}
              ws={socket}
              currentUser={user}
              startCall={(chatId, type) => console.log(`Starting ${type} call with ${chatId}`)}
            />
          </div>
        </div>
      </div>
      {showUserProfile && <UserProfile user={user} onClose={() => setShowUserProfile(false)} />}
    </main>
  )
}

