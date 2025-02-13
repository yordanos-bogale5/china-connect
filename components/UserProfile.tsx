"use client"

import { Phone, Mail, AtSign, Link2, Bell, ImageIcon, FileText, Mic, Share2, Edit } from "lucide-react"
import { useTranslation } from "react-i18next"

interface UserProfileProps {
  user: {
    name: string
    phone: string
    bio: string
    username: string
    notifications: boolean
    media: {
      photos: number
      files: number
      voice: number
      links: number
    }
  }
  onClose: () => void
}

export default function UserProfile({ user, onClose }: UserProfileProps) {
  const { t } = useTranslation()

  return (
    <div className="w-[350px] bg-[#0e1621] border-l border-[#17212b] flex flex-col h-full">
      <div className="p-4 border-b border-[#17212b] flex justify-between items-center">
        <h2 className="text-white font-medium">{t("User Info")}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="w-20 h-20 rounded-full bg-[#2b5278] mx-auto mb-4 flex items-center justify-center text-white text-2xl font-medium">
            {user.name[0]}
          </div>
          <h3 className="text-white text-xl font-medium text-center mb-1">{user.name}</h3>
          <p className="text-gray-400 text-center text-sm">{t("online")}</p>
        </div>

        <div className="px-4 py-2">
          <div className="flex items-center space-x-3 py-2">
            <Phone className="w-5 h-5 text-gray-400" />
            <div>
              <div className="text-white">{user.phone}</div>
              <div className="text-sm text-gray-400">{t("Mobile")}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 py-2">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <div className="text-white">{user.bio}</div>
              <div className="text-sm text-gray-400">{t("Bio")}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 py-2">
            <AtSign className="w-5 h-5 text-gray-400" />
            <div>
              <div className="text-white">{user.username}</div>
              <div className="text-sm text-gray-400">{t("Username")}</div>
            </div>
          </div>
        </div>

        <div className="px-4 py-2 border-t border-[#17212b]">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="text-white">{t("Notifications")}</span>
            </div>
            <button
              className={`w-11 h-6 rounded-full transition-colors ${
                user.notifications ? "bg-[#2b5278]" : "bg-gray-600"
              } relative`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                  user.notifications ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="px-4 py-2 border-t border-[#17212b]">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <ImageIcon className="w-5 h-5 text-gray-400" />
              <span className="text-white">
                {user.media.photos} {t("photos")}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <FileText className="w-5 h-5 text-gray-400" />
              <span className="text-white">
                {user.media.files} {t("files")}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <Mic className="w-5 h-5 text-gray-400" />
              <span className="text-white">
                {user.media.voice} {t("voice messages")}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-3">
              <Link2 className="w-5 h-5 text-gray-400" />
              <span className="text-white">
                {user.media.links} {t("shared links")}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 flex space-x-2">
          <button className="flex-1 bg-[#2b5278] text-white py-2 rounded-lg flex items-center justify-center space-x-2">
            <Share2 className="w-5 h-5" />
            <span>{t("Share")}</span>
          </button>
          <button className="flex-1 bg-[#2b5278] text-white py-2 rounded-lg flex items-center justify-center space-x-2">
            <Edit className="w-5 h-5" />
            <span>{t("Edit")}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

