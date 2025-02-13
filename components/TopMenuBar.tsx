"use client"

import { Menu, Search } from "lucide-react"
import { useTranslation } from "react-i18next"

interface TopMenuBarProps {
  onMenuClick: () => void
  onSearch: (query: string) => void
}

export default function TopMenuBar({ onMenuClick, onSearch }: TopMenuBarProps) {
  const { t } = useTranslation()

  return (
    <div className="h-14 bg-[#17212b] border-b border-[#232e3c] flex items-center px-4 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-3 w-[260px]">
        <button onClick={onMenuClick} className="hover:bg-[#232e3c] p-2 rounded-lg transition-colors">
          <Menu className="h-5 w-5 text-gray-400" />
        </button>
        <div className="relative flex-1 ml-4">
          <input
            type="text"
            placeholder={t("Search")}
            onChange={(e) => onSearch(e.target.value)}
            className="bg-[#242F3D] text-white placeholder-gray-500 rounded-2xl py-2 pl-8 pr-4 w-[200px] min-w-[250px] focus:outline-none focus:ring-1 focus:ring-[#2b5278] h-[34px] text-sm"
          />
          <Search className="absolute left-2.5 top-[9px] h-4 w-4 text-gray-500" />
        </div>
      </div>
    </div>
  )
}

