import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Telegram Clone",
  description: "A Telegram-like chat application for Chinese users",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body className={`${inter.className} h-full`}>
        {children}
        <Script src="https://telegram.org/js/telegram-widget.js?21" strategy="lazyOnload" />
      </body>
    </html>
  )
}



import './globals.css'