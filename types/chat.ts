export interface User {
  id: string
  name: string
  avatar?: string
  isOnline: boolean
  lastSeen?: Date
}

export interface Message {
  id: string
  senderId: string
  content: string
  timestamp: Date
  type: "text" | "image" | "video" | "audio" | "file"
  status: "sent" | "delivered" | "read"
  mediaUrl?: string
  replyTo?: string
  forwardedFrom?: string
}

export interface Chat {
  id: string
  type: "private" | "group" | "channel"
  participants: User[]
  messages: Message[]
  unreadCount: number
  lastMessage?: Message
  name?: string
  avatar?: string
  isArchived?: boolean
}

export interface VoiceCallState {
  isActive: boolean
  peerId?: string
  stream?: MediaStream
  status: "connecting" | "connected" | "disconnected"
}

export interface VideoCallState extends VoiceCallState {
  localStream?: MediaStream
  remoteStream?: MediaStream
}

