"use client"

import { useEffect } from "react"

interface TelegramLoginButtonProps {
  onAuth: (user: TelegramUser) => void
}

interface TelegramUser {
  id: number
  first_name: string
  last_name?: string
  username?: string
  photo_url?: string
  auth_date: number
  hash: string
}

declare global {
  interface Window {
    Telegram: {
      Login: {
        auth: (options: any, callback: (user: TelegramUser) => void) => void
      }
    }
  }
}

export default function TelegramLoginButton({ onAuth }: TelegramLoginButtonProps) {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://telegram.org/js/telegram-widget.js?22"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleLogin = () => {
    if (window.Telegram && window.Telegram.Login) {
      window.Telegram.Login.auth(
        {
          bot_id: process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN?.split(":")[0],
          request_access: "write",
          lang: "en",
          origin: "https://v0-telegram-clone-chat-software-4a4bpy.vercel.app",
        },
        (user) => {
          if (user) {
            onAuth(user)
          }
        },
      )
    }
  }

  return (
    <button
      onClick={handleLogin}
      className="inline-flex items-center justify-center px-6 py-2.5 bg-[#54a9eb] hover:bg-[#4a96d0] text-white text-sm font-medium rounded-md transition-colors duration-200 gap-2"
    >
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
      </svg>
      Log in with Telegram
    </button>
  )
}

