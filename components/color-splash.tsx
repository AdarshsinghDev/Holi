"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ColorSplashProps {
  onComplete: () => void
}

export default function ColorSplash({ onComplete }: ColorSplashProps) {
  const [splashes, setSplashes] = useState<
    Array<{
      color: string
      size: number
      left: string
      top: string
    }>
  >([])

  const colors = [
    "#FF1493", // Pink
    "#9370DB", // Purple
    "#FF69B4", // Hot Pink
    "#FF6347", // Tomato
    "#00CED1", // Turquoise
    "#FF4500", // Orange Red
    "#9932CC", // Dark Orchid
    "#FF8C00", // Dark Orange
    "#1E90FF", // Dodger Blue
    "#32CD32", // Lime Green
  ]

  // Generate splashes only on the client side
  useEffect(() => {
    const generatedSplashes = colors.map((color) => ({
      color,
      size: Math.random() * 150 + 100,
      left: `${Math.random() * 80 + 10}%`,
      top: `${Math.random() * 80 + 10}%`,
    }))

    setSplashes(generatedSplashes)

    // Set timeout for completion
    const timer = setTimeout(() => {
      onComplete()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onComplete])

  const splashVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i: number) => ({
      scale: 1,
      opacity: [0, 0.8, 0],
      transition: {
        delay: i * 0.2,
        duration: 1.5,
        ease: "easeOut",
      },
    }),
    exit: { opacity: 0 },
  }

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center z-10"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">Happy Holi!</h1>
        <p className="text-xl md:text-2xl text-pink-200 font-medium">A celebration of our love...</p>
      </motion.div>

      {splashes.map((splash, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={splashVariants}
          initial="initial"
          animate="animate"
          className="absolute rounded-full"
          style={{
            backgroundColor: splash.color,
            width: splash.size,
            height: splash.size,
            left: splash.left,
            top: splash.top,
            filter: "blur(20px)",
            zIndex: 1,
          }}
          onAnimationComplete={i === colors.length - 1 ? onComplete : undefined}
        />
      ))}
    </div>
  )
}

