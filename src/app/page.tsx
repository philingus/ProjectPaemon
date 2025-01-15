'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
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
        <div className="space-y-6">
          <div className="relative w-64 h-64 md:w-96 md:h-96 mx-auto drop-shadow-2xl">
            <Image
              src="/Screenshot__1046_-removebg-preview (2).png"
              alt="Project Paemon Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#E0757C] tracking-tight text-shadow">
            Project Paemon
          </h1>
          <div className="h-1 w-32 bg-[#E0757C] mx-auto rounded-full"></div>
        </div>

        {/* Welcome Message */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl text-white font-medium max-w-2xl mx-auto px-4">
            Welcome to Project Paemon, are you ready to start your journey as a trainer?
          </h2>
          <p className="text-lg text-white/80 italic max-w-2xl mx-auto px-4">
            Each trainer gets one unique Paemon that embodies their qualities. Your choices will define your destiny as a trainer.
          </p>
        </div>

        {/* Animation and Button */}
        <div className="gba-screen max-w-md mx-auto p-8 space-y-8">
          <div className="relative w-48 h-48 mx-auto">
            <Image
              src="/uia-unscreen.gif"
              alt="Paemon Logo"
              fill
              className="object-contain pixelated"
              priority
              unoptimized
            />
          </div>
          
          <Link 
            href="/trainer-name" 
            className="gba-button inline-block text-xl animate-hover"
          >
            Start
          </Link>
        </div>
      </div>
    </main>
  )
}
