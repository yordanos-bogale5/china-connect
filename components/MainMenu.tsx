"use client"

import { User, Users, Megaphone, Contact, Phone, Settings, ChevronDown } from "lucide-react"
import { useTranslation } from "react-i18next"

interface MainMenuProps {
  onNavigate: (item: string) => void
  activeItem: string
  isOpen: boolean
  onClose: () => void
}

export default function MainMenu({ onNavigate, activeItem, isOpen, onClose }: MainMenuProps) {
  const { t } = useTranslation()

  const menuItems = [
    { id: "profile", icon: User, label: t("My Profile") },
    { id: "newGroup", icon: Users, label: t("New Group") },
    { id: "newChannel", icon: Megaphone, label: t("New Channel") },
    { id: "contacts", icon: Contact, label: t("Contacts") },
    { id: "calls", icon: Phone, label: t("Calls") },
    { id: "settings", icon: Settings, label: t("Settings") },
  ]

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div
        className={`fixed left-0 top-0 h-full bg-[#17212b] dark:bg-[#0e1621] text-gray-300 transition-transform duration-300 ease-in-out z-50 w-full md:w-[280px] flex flex-col`}
      >
        {/* Profile Section */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-3">
              <div className="w-[42px] h-[42px] rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium">
                张
              </div>
              <div>
                <div className="font-medium text-white">张小明</div>
                <div className="text-sm text-[#6c7883]">Set Emoji Status</div>
              </div>
            </div>
            <button className="text-[#6c7883] hover:text-gray-400 p-1">
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id)
                onClose()
              }}
              className={`w-full flex items-center px-4 py-2.5 hover:bg-[#202b36] dark:hover:bg-[#0e1621]/80 transition-colors ${
                activeItem === item.id ? "bg-[#202b36] dark:bg-[#0e1621]/80" : ""
              }`}
            >
              <item.icon className="w-5 h-5 mr-6 text-[#6c7883]" />
              <span className="text-[#c4c9cc] text-[15px]">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

