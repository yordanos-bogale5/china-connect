"use client"

import { useEffect, useRef } from "react"
import { Phone, Video, Mic, MicOff, VideoOff, X } from "lucide-react"
import { useTranslation } from "react-i18next"
import type { VoiceCallState, VideoCallState } from "@/types/chat"

interface CallInterfaceProps {
  type: "voice" | "video"
  callState: VoiceCallState | VideoCallState
  onEnd: () => void
  onToggleMute: () => void
  onToggleVideo?: () => void
}

export default function CallInterface({ type, callState, onEnd, onToggleMute, onToggleVideo }: CallInterfaceProps) {
  const { t } = useTranslation()
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (type === "video" && localVideoRef.current) {
      const videoState = callState as VideoCallState
      if (videoState.localStream) {
        localVideoRef.current.srcObject = videoState.localStream
      }
      if (videoState.remoteStream && remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = videoState.remoteStream
      }
    }
  }, [type, callState])

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      {type === "video" && (
        <div className="relative w-full h-full">
          <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-full object-cover" />
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className="absolute top-4 right-4 w-48 h-32 object-cover rounded-lg"
          />
        </div>
      )}

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <button onClick={onToggleMute} className="p-4 rounded-full bg-gray-800 hover:bg-gray-700">
          {callState.isMuted ? <MicOff className="h-6 w-6 text-red-500" /> : <Mic className="h-6 w-6 text-white" />}
        </button>

        {type === "video" && onToggleVideo && (
          <button onClick={onToggleVideo} className="p-4 rounded-full bg-gray-800 hover:bg-gray-700">
            {(callState as VideoCallState).isVideoOff ? (
              <VideoOff className="h-6 w-6 text-red-500" />
            ) : (
              <Video className="h-6 w-6 text-white" />
            )}
          </button>
        )}

        <button onClick={onEnd} className="p-4 rounded-full bg-red-600 hover:bg-red-700">
          <Phone className="h-6 w-6 text-white rotate-[135deg]" />
        </button>
      </div>

      <div className="absolute top-4 left-4 text-white">
        <p className="text-lg font-medium">{callState.status === "connecting" ? t("Connecting...") : t("Connected")}</p>
      </div>

      <button onClick={onEnd} className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 hover:bg-gray-700">
        <X className="h-6 w-6 text-white" />
      </button>
    </div>
  )
}

