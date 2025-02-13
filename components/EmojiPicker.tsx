"use client"

import { useState, useEffect } from "react"
import { Search, Heart, Clock, Smile, Image, ThumbsUp, ThumbsDown } from "lucide-react"
import { useTranslation } from "react-i18next"
import React from "react" // Import React

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void
  onClose: () => void
}

const EMOJI_CATEGORIES = {
  recent: ["😀", "😂", "❤️", "👍", "🎉", "🔥", "✨", "🎈"],
  smileys: [
    ["😀", "😃", "😄", "😁", "😅", "😂", "🤣", "😊"],
    ["😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘"],
    ["😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪"],
    ["🤨", "🧐", "🤓", "😎", "🤩", "🥳", "😏", "😒"],
  ],
  people: [
    ["👶", "👧", "🧒", "👦", "👩", "🧑", "👨", "👩‍🦱"],
    ["🧑‍🦱", "👨‍🦱", "👩‍🦰", "🧑‍🦰", "👨‍🦰", "👱‍♀️", "👱", "👱‍♂️"],
    ["👩‍🦳", "🧑‍🦳", "👨‍🦳", "👩‍🦲", "🧑‍🦲", "👨‍🦲", "🧔", "🧔‍♀️"],
  ],
  reactions: ["❤️", "👍", "👎", "😂", "😮", "😢", "😡", "🎉"],
}

export default function EmojiPicker({ onEmojiSelect, onClose }: EmojiPickerProps) {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState<"emoji" | "stickers" | "gifs">("emoji")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof EMOJI_CATEGORIES>("smileys")
  const [recentEmojis, setRecentEmojis] = useState<string[]>(EMOJI_CATEGORIES.recent)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest(".emoji-picker")) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  const handleEmojiSelect = (emoji: string) => {
    setRecentEmojis((prev) => {
      const newRecent = [emoji, ...prev.filter((e) => e !== emoji)].slice(0, 8)
      return newRecent
    })
    onEmojiSelect(emoji)
  }

  const filteredEmojis = searchQuery
    ? Object.values(EMOJI_CATEGORIES)
        .flat(2)
        .filter((emoji) => emoji.includes(searchQuery))
    : EMOJI_CATEGORIES[selectedCategory]

  return (
    <div className="emoji-picker fixed right-4 bottom-20 w-[350px] bg-[#17212b] border border-[#2b5278] rounded-lg shadow-lg z-50">
      <div className="p-2 border-b border-[#2b5278]">
        <div className="flex space-x-4 mb-2">
          <button
            className={`text-sm font-medium ${activeTab === "emoji" ? "text-[#4eab6c]" : "text-gray-400"}`}
            onClick={() => setActiveTab("emoji")}
          >
            {t("Emoji")}
          </button>
          <button
            className={`text-sm font-medium ${activeTab === "stickers" ? "text-[#4eab6c]" : "text-gray-400"}`}
            onClick={() => setActiveTab("stickers")}
          >
            {t("Stickers")}
          </button>
          <button
            className={`text-sm font-medium ${activeTab === "gifs" ? "text-[#4eab6c]" : "text-gray-400"}`}
            onClick={() => setActiveTab("gifs")}
          >
            {t("GIFs")}
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder={t("Search emoji")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#242f3d] text-white placeholder-gray-500 rounded px-8 py-1.5 text-sm focus:outline-none"
          />
          <Search className="absolute left-2 top-2 h-4 w-4 text-gray-500" />
        </div>
      </div>

      <div className="flex h-[350px]">
        <div className="w-12 border-r border-[#2b5278]">
          {Object.keys(EMOJI_CATEGORIES).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category as keyof typeof EMOJI_CATEGORIES)}
              className={`w-full p-2 hover:bg-[#2b5278] ${selectedCategory === category ? "bg-[#2b5278]" : ""}`}
            >
              {category === "recent" && <Clock className="w-5 h-5 text-gray-400" />}
              {category === "smileys" && <Smile className="w-5 h-5 text-gray-400" />}
              {category === "people" && <Image className="w-5 h-5 text-gray-400" />}
              {category === "reactions" && <Heart className="w-5 h-5 text-gray-400" />}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          <div className="grid grid-cols-8 gap-1">
            {Array.isArray(filteredEmojis[0])
              ? (filteredEmojis as string[][]).map((row, i) => (
                  <React.Fragment key={i}>
                    {row.map((emoji, j) => (
                      <button
                        key={`${i}-${j}`}
                        onClick={() => handleEmojiSelect(emoji)}
                        className="p-1 hover:bg-[#2b5278] rounded text-xl"
                      >
                        {emoji}
                      </button>
                    ))}
                  </React.Fragment>
                ))
              : (filteredEmojis as string[]).map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => handleEmojiSelect(emoji)}
                    className="p-1 hover:bg-[#2b5278] rounded text-xl"
                  >
                    {emoji}
                  </button>
                ))}
          </div>
        </div>
      </div>

      <div className="p-2 border-t border-[#2b5278] flex justify-between">
        <div className="flex space-x-2">
          <button className="p-1 hover:bg-[#2b5278] rounded">
            <ThumbsUp className="h-4 w-4 text-gray-400" />
          </button>
          <button className="p-1 hover:bg-[#2b5278] rounded">
            <ThumbsDown className="h-4 w-4 text-gray-400" />
          </button>
          <button className="p-1 hover:bg-[#2b5278] rounded">
            <Heart className="h-4 w-4 text-gray-400" />
          </button>
        </div>
        <div className="text-xs text-gray-400">
          {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
        </div>
      </div>
    </div>
  )
}

