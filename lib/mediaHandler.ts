export const supportedMediaTypes = {
  image: ["image/jpeg", "image/png", "image/gif"],
  video: ["video/mp4", "video/webm"],
  audio: ["audio/mp3", "audio/wav", "audio/ogg"],
  document: ["application/pdf", "application/msword", "text/plain"],
}

export const processMediaUpload = async (file: File) => {
  const formData = new FormData()
  formData.append("file", file)

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error("Upload failed")
  }

  const data = await response.json()
  return data.url
}

export const recordVoiceMessage = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mediaRecorder = new MediaRecorder(stream)
    const audioChunks: BlobPart[] = []

    return new Promise<Blob>((resolve, reject) => {
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/ogg; codecs=opus" })
        resolve(audioBlob)
      }

      mediaRecorder.onerror = (event) => {
        reject(event.error)
      }

      mediaRecorder.start()
      setTimeout(() => mediaRecorder.stop(), 60000) // Max 1 minute
    })
  } catch (error) {
    console.error("Error recording voice message:", error)
    throw error
  }
}

