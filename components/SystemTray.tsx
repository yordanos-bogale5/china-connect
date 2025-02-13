"use client"

import { useState } from "react"
import { Menu, Search, Phone, Folder, Settings, Moon, MessageCircle } from "lucide-react"
import { useTranslation } from "react-i18next"

interface SystemTrayProps {
  onMenuClick: () => void
  onThemeToggle: () => void
  isDark: boolean
}

export default function SystemTray({ onMenuClick, onThemeToggle, isDark }: SystemTrayProps) {
  const { t } = useTranslation()
  const [showMenu, setShowMenu] = useState(false)
  const [weather] = useState({ temp: "19°C", condition: "Sunny" })
  const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  const date = new Date().toLocaleDateString([], { month: "2-digit", day: "2-digit", year: "numeric" })

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#17212b] border-t border-[#2b5278] p-2 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <button onClick={onMenuClick} className="p-2 hover:bg-[#2b5278] rounded">
          <Menu className="h-5 w-5 text-gray-400" />
        </button>
        <button className="p-2 hover:bg-[#2b5278] rounded">
          <Search className="h-5 w-5 text-gray-400" />
        </button>
        <button className="p-2 hover:bg-[#2b5278] rounded">
          <Phone className="h-5 w-5 text-gray-400" />
        </button>
        <button className="p-2 hover:bg-[#2b5278] rounded">
          <Folder className="h-5 w-5 text-gray-400" />
        </button>
        <button className="p-2 hover:bg-[#2b5278] rounded">
          <MessageCircle className="h-5 w-5 text-gray-400" />
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-gray-400 text-sm">
          <span>{weather.temp}</span>
          <span>{weather.condition}</span>
        </div>
        <div className="text-gray-400 text-sm">
          <span>{time}</span>
          <span className="mx-1">|</span>
          <span>{date}</span>
        </div>
        <button onClick={onThemeToggle} className="p-2 hover:bg-[#2b5278] rounded">
          <Moon className="h-5 w-5 text-gray-400" />
        </button>
        <button className="p-2 hover:bg-[#2b5278] rounded">
          <Settings className="h-5 w-5 text-gray-400" />
        </button>
      </div>
    </div>
  )
}

