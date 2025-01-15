'use client'

import { useEffect, useState } from 'react'

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    const audio = document.getElementById('background-music') as HTMLAudioElement
    if (audio) {
      audio.volume = 0.5 // Set initial volume to 50%
      audio.play().catch(() => {
        // Browser might block autoplay, in which case we'll set isPlaying to false
        setIsPlaying(false)
      })
    }
  }, [])

  const togglePlay = () => {
    const audio = document.getElementById('background-music') as HTMLAudioElement
    if (audio) {
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={togglePlay}
        className="gba-button text-xl px-8 py-4 min-w-[200px] shadow-xl hover:shadow-2xl transition-all duration-300"
        aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
      >
        <span className="text-2xl mr-2">{isPlaying ? '🔊' : '🔈'}</span>
        {isPlaying ? 'Pause Music' : 'Play Music'}
      </button>
    </div>
  )
}
