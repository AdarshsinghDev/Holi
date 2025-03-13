"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ColorSplash from "@/components/color-splash"
import LoveMessage from "@/components/love-message"
import VirtualHoli from "@/components/virtual-holi"
import AudioGreeting from "@/components/audio-greeting"
import HoliParticles from "@/components/holi-particles"
import { Heart } from "lucide-react"

export default function HoliCelebration() {
  const [showMessage, setShowMessage] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)
  const [loaded, setLoaded] = useState(false)

  // Partner's name - customize this
  const partnerName = "Priya"

  useEffect(() => {
    // Show initial animation then reveal message
    const timer = setTimeout(() => {
      setShowMessage(true)
    }, 3000)

    setLoaded(true)

    return () => clearTimeout(timer)
  }, [])

  const sections = ["message", "virtual-holi", "greeting"]

  const navigateToSection = (index: number) => {
    setCurrentSection(index)
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-pink-800 to-indigo-900">
      {/* Background particles */}
      <HoliParticles />

      {/* Header with heart icon */}
      <header className="relative z-10 flex justify-center items-center p-4 md:p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full"
        >
          <Heart className="text-pink-300 h-6 w-6" />
          <h1 className="text-xl md:text-2xl font-bold text-white">Happy Holi, {partnerName}!</h1>
          <Heart className="text-pink-300 h-6 w-6" />
        </motion.div>
      </header>

      {/* Initial color splash animation */}
      <AnimatePresence>
        {!showMessage && (
          <motion.div className="absolute inset-0 flex items-center justify-center z-20" exit={{ opacity: 0 }}>
            <ColorSplash onComplete={() => setShowMessage(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence mode="wait">
        {showMessage && (
          <motion.div
            key={sections[currentSection]}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto px-4 py-8 relative z-10"
          >
            {currentSection === 0 && <LoveMessage partnerName={partnerName} />}
            {currentSection === 1 && <VirtualHoli partnerName={partnerName} />}
            {currentSection === 2 && <AudioGreeting partnerName={partnerName} />}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation dots */}
      {showMessage && (
        <div className="fixed bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => navigateToSection(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSection === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to section ${index + 1}`}
            />
          ))}
        </div>
      )}
    </main>
  )
}

