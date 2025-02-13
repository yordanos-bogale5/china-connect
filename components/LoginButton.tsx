"use client"

import type React from "react"
import { useTranslation } from "react-i18next"

interface LoginButtonProps {
  onLogin: () => void
}

const LoginButton: React.FC<LoginButtonProps> = ({ onLogin }) => {
  const { t } = useTranslation()

  const handleLogin = () => {
    // Here we would typically integrate with Telegram's API for authentication
    console.log("Logging in with Telegram")
    onLogin()
  }

  return (
    <button
      onClick={handleLogin}
      className="bg-[#4eab6c] hover:bg-[#45a065] text-white font-bold py-2 px-4 rounded flex items-center"
    >
      <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm-3.5 6.5l10 5-10 5v-3.5L13 12l-4.5-2.5v-1z" />
      </svg>
      {t("Login with Telegram")}
    </button>
  )
}

export default LoginButton

