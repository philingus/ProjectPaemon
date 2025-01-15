'use client'

import Image from 'next/image'

interface Developer {
  name: string;
  linkedIn: string;
}

const developers: Developer[] = [
  { name: 'Hannah', linkedIn: 'https://www.linkedin.com/in/hannaherauch/' },
  { name: 'Chan', linkedIn: 'https://www.linkedin.com/in/chan-dinh/' },
  { name: 'Phil', linkedIn: 'https://www.linkedin.com/in/philhocombatir/' },
  { name: 'Sama', linkedIn: 'https://www.linkedin.com/in/noorul-sama-sahel-975586246/' },
]

export default function DeveloperInfo() {
  return (
    <div className="gba-screen mt-8">
      <h3 className="text-[#2D1B2E] font-bold mb-4 text-shadow text-center">Development Team</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {developers.map((dev) => (
          <div key={dev.name} className="gba-container p-4 text-center">
            <h4 className="font-bold text-white mb-1">{dev.name}</h4>
            <p className="text-[#E0757C] text-sm mb-2">Developer</p>
            <a
              href={dev.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <Image
                src="/linkedin.png"
                alt="LinkedIn"
                width={24}
                height={24}
                className="mx-auto"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
