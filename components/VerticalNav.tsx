import { MessageCircle, Users, Bookmark, Bot, Bell } from "lucide-react"
import { useTranslation } from "react-i18next"

interface VerticalNavProps {
  activeSection: string
  onSectionChange: (section: string) => void
  unreadCount: number
  botCount: number
}

export default function VerticalNav({ activeSection, onSectionChange, unreadCount, botCount }: VerticalNavProps) {
  const { t } = useTranslation()

  const navItems = [
    {
      id: "all-chats",
      icon: MessageCircle,
      label: t("All Chats"),
      count: unreadCount,
    },
    {
      id: "unread",
      icon: Bell,
      label: t("Unread"),
      count: unreadCount,
    },
    {
      id: "personal",
      icon: Users,
      label: t("Personal"),
    },
    {
      id: "bots",
      icon: Bot,
      label: t("Bots"),
      count: botCount,
    },
    {
      id: "saved",
      icon: Bookmark,
      label: t("Saved"),
    },
  ]

  return (
    <div className="w-[72px] bg-[#0e1621] border-r border-[#232e3c] flex flex-col fixed left-0 top-14 bottom-0 z-40">
      <nav className="flex-1 py-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`w-full px-3 py-3 flex flex-col items-center gap-1 relative group
              ${activeSection === item.id ? "bg-[#2b5278]/10" : "hover:bg-[#2b5278]/10"}`}
          >
            <item.icon className="w-5 h-5 text-gray-400" />
            <span className="text-[10px] text-gray-400">{item.label}</span>
            {item.count && item.count > 0 && (
              <div className="absolute top-1 right-2 bg-[#2b5278] text-white text-[10px] rounded-full px-1.5 min-w-[18px] text-center">
                {item.count}
              </div>
            )}
          </button>
        ))}
      </nav>
    </div>
  )
}

