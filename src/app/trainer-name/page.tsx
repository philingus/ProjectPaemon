'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function TrainerNamePage() {
  const [trainerName, setTrainerName] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (trainerName.trim()) {
      localStorage.setItem('trainerName', trainerName.trim())
      router.push('/questionnaire')
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 relative">
      {/* Background GIF */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/mnslf2y8hxab1 (1).gif"
          alt="Background Animation"
          fill
          className="object-cover opacity-30"
          priority
          unoptimized
        />
      </div>

      <div className="max-w-4xl w-full mx-auto text-center space-y-12 relative z-10">
        {/* Logo and Title */}
        <div className="space-y-4">
          <div className="relative w-64 h-64 mx-auto">
            <Image
              src="/Screenshot__1046_-removebg-preview (2).png"
              alt="Project Paemon Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#E0757C] tracking-tight">
            Project Paemon
          </h1>
          <div className="h-1 w-32 bg-[#E0757C] mx-auto rounded-full"></div>
        </div>

        {/* Trainer Name Form */}
        <div className="gba-screen max-w-md mx-auto p-8 space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4 max-w-2xl mx-auto px-4">
              <label htmlFor="trainerName" className="block text-2xl text-white font-bold text-center">
                Enter Your Trainer Name
              </label>
              <input
                type="text"
                id="trainerName"
                value={trainerName}
                onChange={(e) => setTrainerName(e.target.value)}
                className="gba-input w-full text-2xl p-4 h-16"
                placeholder="Your name..."
                maxLength={20}
                required
              />
            </div>
            <button 
              type="submit"
              className="gba-button text-xl w-full animate-hover"
              disabled={!trainerName.trim()}
            >
              Start Journey
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
