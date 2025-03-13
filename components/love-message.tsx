"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"

interface LoveMessageProps {
  partnerName: string
}

export default function LoveMessage({ partnerName }: LoveMessageProps) {
  const [typedText, setTypedText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  // Customize this message for your partner
  const fullMessage = `${partnerName},

Iss Holi, sirf rang nhi, meri mohabbat bhi tum par chhayi rahe. Tum meri zindagi ka sabse khoobsurat rang ho, jo har din ko pyara bana deta hai. Agar tum paas hoti, toh har rang sirf tumse hi shuru hota aur tum par hi khatam. Tum meri gulabi khushi, neeli shanti, aur laal deewangi ho!
Dur hoke bhi, tum mere dil ke itne kareeb ho ki har rang mujhe sirf tumhari yaad dilata hai. Is Holi ka pehla rang sirf tumhare naam! Happy Holi, meri jaan! 💖"`

  useEffect(() => {
    if (currentIndex < fullMessage.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullMessage.substring(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, 30) // Typing speed

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, fullMessage])

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/10 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-xl border border-pink-500/20"
      >
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Heart className="text-pink-500 h-12 w-12 fill-pink-500" />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              className="absolute inset-0 bg-pink-500 rounded-full blur-xl opacity-50 -z-10"
            />
          </div>
        </div>

        <div className="prose prose-lg prose-pink max-w-none">
          <p className="text-white/90 whitespace-pre-line font-medium leading-relaxed">
            {typedText}
            <span className="inline-block w-0.5 h-5 bg-pink-400 ml-0.5 animate-blink">
              {currentIndex >= fullMessage.length ? "" : "|"}
            </span>
          </p>
        </div>

        {currentIndex >= fullMessage.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 flex justify-center"
          >
            <div className="flex items-center gap-2 text-pink-300 font-bold">
              <Heart className="h-5 w-5 fill-pink-300" />
              <span>Adarsh</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

