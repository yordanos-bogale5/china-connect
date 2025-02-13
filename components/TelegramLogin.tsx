"use client"

import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"

interface TelegramLoginProps {
  onLogin: (user: any) => void
  botName: string
}

declare global {
  interface Window {
    TelegramLoginWidget: {
      dataOnauth: (user: any) => void
    }
  }
}

export default function TelegramLogin({ onLogin, botName }: TelegramLoginProps) {
  const { t } = useTranslation()
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (buttonRef.current) {
      const script = document.createElement("script")
      script.src = "https://telegram.org/js/telegram-widget.js?22"
      script.setAttribute("data-telegram-login", botName)
      script.setAttribute("data-size", "large")
      script.setAttribute("data-radius", "8")
      script.setAttribute("data-request-access", "write")
      script.setAttribute("data-userpic", "false")
      script.setAttribute("data-lang", "en")
      script.setAttribute("data-auth-url", `${window.location.origin}/api/auth/telegram`)
      script.async = true

      buttonRef.current.appendChild(script)
    }

    window.TelegramLoginWidget = {
      dataOnauth: (user: any) => onLogin(user),
    }

    return () => {
      if (buttonRef.current) {
        const script = buttonRef.current.querySelector("script")
        if (script) {
          buttonRef.current.removeChild(script)
        }
      }
    }
  }, [onLogin, botName])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#17212b]">
      <div className="bg-[#242f3d] p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-white mb-6">{t("Login with Telegram")}</h1>
        <div ref={buttonRef}></div>
        <p className="mt-4 text-sm text-gray-400">{t("Click the button above to log in with your Telegram account")}</p>
      </div>
    </div>
  )
}

