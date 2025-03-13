"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface AudioGreetingProps {
  partnerName: string
}

export default function AudioGreeting({ partnerName }: AudioGreetingProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Replace this with your actual audio file URL
  const audioUrl = "/placeholder-audio.mp3"

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    if (!audioRef.current) return

    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current) return

    const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100
    setProgress(currentProgress)

    if (audioRef.current.ended) {
      setIsPlaying(false)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return

    const progressBar = e.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const clickPosition = e.clientX - rect.left
    const percentage = (clickPosition / rect.width) * 100

    audioRef.current.currentTime = (percentage / 100) * audioRef.current.duration
    setProgress(percentage)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/10 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-xl border border-pink-500/20"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">A Special Message For You</h2>
          <p className="text-pink-200">Listen to my heartfelt Holi wishes for you, {partnerName}</p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 rounded-lg blur-xl" />

          <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 flex flex-col items-center">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg">
              <motion.div
                animate={{
                  scale: isPlaying ? [1, 1.05, 1] : 1,
                }}
                transition={{
                  duration: 1,
                  repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
                  repeatType: "reverse",
                }}
              >
                {isPlaying ? (
                  <Pause className="h-10 w-10 md:h-12 md:w-12 text-white" />
                ) : (
                  <Play className="h-10 w-10 md:h-12 md:w-12 text-white ml-1" />
                )}
              </motion.div>
            </div>

            <div className="w-full max-w-md">
              <div
                className="h-2 bg-white/20 rounded-full overflow-hidden cursor-pointer mb-2"
                onClick={handleProgressClick}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                  style={{ width: `${progress}%` }}
                  transition={{ type: "tween" }}
                />
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={toggleMute}
                  className="text-white/80 hover:text-white transition-colors"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>

                <button
                  onClick={togglePlay}
                  className="px-4 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
                >
                  {isPlaying ? "Pause" : "Play Message"}
                </button>
              </div>
            </div>

            <audio
              ref={audioRef}
              src={audioUrl}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              className="hidden"
            />
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/80 italic">
            "May our love be as vibrant as the colors of Holi, and may we always celebrate life together."
          </p>
        </div>
      </motion.div>
    </div>
  )
}

