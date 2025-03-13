"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  rotation: number
  rotationSpeed: number
}

export default function HoliParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])

  const colors = [
    "#FF1493", // Pink
    "#9370DB", // Purple
    "#FF69B4", // Hot Pink
    "#00CED1", // Turquoise
    "#FF4500", // Orange Red
    "#9932CC", // Dark Orchid
    "#FF8C00", // Dark Orange
    "#1E90FF", // Dodger Blue
    "#32CD32", // Lime Green
  ]

  useEffect(() => {
    if (typeof window === "undefined") return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // **Move initParticles above its first usage**
    const initParticles = () => {
      const particleCount = Math.min(Math.max(window.innerWidth, window.innerHeight) / 10, 100)
      particlesRef.current = []

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 8 + 2,
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 - 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 2 - 1,
        })
      }
    }

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles() // ✅ Now, initParticles is defined before being called
    }

    window.addEventListener("resize", updateCanvasSize)
    updateCanvasSize()

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        particle.x += particle.speedX
        particle.y += particle.speedY
        particle.rotation += particle.rotationSpeed

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1

        ctx.save()
        ctx.translate(particle.x, particle.y)
        ctx.rotate((particle.rotation * Math.PI) / 180)

        if (Math.random() > 0.5) {
          ctx.fillStyle = particle.color
          ctx.globalAlpha = 0.6
          ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
        } else {
          ctx.beginPath()
          ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2)
          ctx.fillStyle = particle.color
          ctx.globalAlpha = 0.6
          ctx.fill()
        }

        ctx.restore()
      })

      requestAnimationFrame(animate)
    }

    initParticles()
    animate()

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />
}