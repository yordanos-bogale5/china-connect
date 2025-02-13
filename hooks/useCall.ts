"use client"

import { useState, useEffect } from "react"
import { socket } from "@/lib/socket"
import type { VoiceCallState, VideoCallState } from "@/types/chat"

export const useCall = (userId: string) => {
  const [voiceCallState, setVoiceCallState] = useState<VoiceCallState>({
    isActive: false,
    status: "disconnected",
  })

  const [videoCallState, setVideoCallState] = useState<VideoCallState>({
    isActive: false,
    status: "disconnected",
  })

  useEffect(() => {
    const handleIncomingCall = async (data: { callerId: string; type: "voice" | "video" }) => {
      if (data.type === "voice") {
        setVoiceCallState({
          isActive: true,
          peerId: data.callerId,
          status: "connecting",
        })
      } else {
        setVideoCallState({
          isActive: true,
          peerId: data.callerId,
          status: "connecting",
        })
      }
    }

    socket.on("call:incoming", handleIncomingCall)

    return () => {
      socket.off("call:incoming", handleIncomingCall)
    }
  }, [])

  const startCall = async (recipientId: string, type: "voice" | "video") => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: type === "video",
      })

      if (type === "voice") {
        setVoiceCallState({
          isActive: true,
          peerId: recipientId,
          stream,
          status: "connecting",
        })
      } else {
        setVideoCallState({
          isActive: true,
          peerId: recipientId,
          localStream: stream,
          status: "connecting",
        })
      }

      socket.emit("call:start", { recipientId, type })
    } catch (error) {
      console.error("Failed to start call:", error)
    }
  }

  const endCall = (type: "voice" | "video") => {
    if (type === "voice") {
      voiceCallState.stream?.getTracks().forEach((track) => track.stop())
      setVoiceCallState({
        isActive: false,
        status: "disconnected",
      })
    } else {
      videoCallState.localStream?.getTracks().forEach((track) => track.stop())
      videoCallState.remoteStream?.getTracks().forEach((track) => track.stop())
      setVideoCallState({
        isActive: false,
        status: "disconnected",
      })
    }
  }

  return {
    voiceCallState,
    videoCallState,
    startCall,
    endCall,
  }
}

