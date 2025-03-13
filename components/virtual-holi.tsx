"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

interface VirtualHoliProps {
  partnerName: string
}

export default function VirtualHoli({ partnerName }: VirtualHoliProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [colorIndex, setColorIndex] = useState(0)
  const [isDrawing, setIsDrawing] = useState(false)
  const [message, setMessage] = useState(`Click or touch to throw colors at ${partnerName}!`)

  const colors = [
    { name: "Pink", value: "#FF69B4" },
    { name: "Purple", value: "#9370DB" },
    { name: "Blue", value: "#1E90FF" },
    { name: "Yellow", value: "#FFD700" },
    { name: "Green", value: "#32CD32" },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || typeof window === "undefined") return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateCanvasSize = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      }
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // Draw background image (optional)
    const img = new Image()
    img.src = "/myimg.jpg"; // Replace with your image
    img.crossOrigin = "anonymous"
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
    }
  }, [])

  const handleColorChange = () => {
    setColorIndex((prevIndex) => (prevIndex + 1) % colors.length)
  }

  const throwColor = (x: number, y: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const currentColor = colors[colorIndex].value

    // Create a color splash effect
    const particleCount = 50 + Math.floor(Math.random() * 50)
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 80 + 20
      const pX = x + Math.cos(angle) * radius
      const pY = y + Math.sin(angle) * radius
      const size = Math.random() * 15 + 5

      ctx.beginPath()
      ctx.arc(pX, pY, size, 0, Math.PI * 2)
      ctx.fillStyle = currentColor
      ctx.globalAlpha = Math.random() * 0.7 + 0.3
      ctx.fill()
    }

    // Add some smaller particles
    for (let i = 0; i < particleCount * 2; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 120 + 40
      const pX = x + Math.cos(angle) * radius
      const pY = y + Math.sin(angle) * radius
      const size = Math.random() * 5 + 1

      ctx.beginPath()
      ctx.arc(pX, pY, size, 0, Math.PI * 2)
      ctx.fillStyle = currentColor
      ctx.globalAlpha = Math.random() * 0.5 + 0.1
      ctx.fill()
    }

    // Reset alpha
    ctx.globalAlpha = 1

    // Update message
    setMessage(`Beautiful ${colors[colorIndex].name} for ${partnerName}!`)

    // Change color for next throw
    handleColorChange()
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    throwColor(x, y)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    throwColor(x, y)
  }

  const handlePointerUp = () => {
    setIsDrawing(false)
  }

  const handleClearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setMessage(`Click or touch to throw colors at ${partnerName}!`)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-6 shadow-xl border border-purple-500/20"
      >
        <div className="text-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Virtual Holi Celebration</h2>
          <p className="text-pink-200">{message}</p>
        </div>

        <div className="relative aspect-video bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-lg overflow-hidden">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-pointer"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {colors.map((color, index) => (
            <button
              key={index}
              onClick={() => setColorIndex(index)}
              className={`px-4 py-2 rounded-full transition-all ${
                colorIndex === index
                  ? "ring-2 ring-white ring-offset-2 ring-offset-purple-900 scale-110"
                  : "opacity-80 hover:opacity-100"
              }`}
              style={{ backgroundColor: color.value }}
              aria-label={`Select ${color.name} color`}
            >
              <span className="text-xs font-bold text-white drop-shadow-md">{color.name}</span>
            </button>
          ))}

          <button
            onClick={handleClearCanvas}
            className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-xs font-bold text-white flex items-center gap-1"
          >
            <Sparkles className="h-3 w-3" />
            Clear
          </button>
        </div>
      </motion.div>
    </div>
  )
}

