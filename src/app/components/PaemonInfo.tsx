'use client'

interface PaemonInfoProps {
  name: string;
  background: string;
  personality: string;
  specialAbilities: string[];
}

export default function PaemonInfo({
  name,
  background,
  personality,
  specialAbilities,
}: PaemonInfoProps) {
  return (
    <div className="gba-screen bg-[#9BBC0F]/20 scrollable-card">
      <h3 className="text-xl font-bold text-[#2D1B2E] mb-4 text-shadow sticky top-0 bg-[#7BA1A8] p-4 rounded-t-lg">
        About {name}
      </h3>
      
      <div className="space-y-4 p-4">
        <div className="bg-[#5A8087] p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h4 className="font-bold text-white mb-2 text-shadow">Background</h4>
          <p className="text-white/90">{background}</p>
        </div>
        
        <div className="bg-[#5A8087] p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h4 className="font-bold text-white mb-2 text-shadow">Personality</h4>
          <p className="text-white/90">{personality}</p>
        </div>

        <div className="bg-[#5A8087] p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h4 className="font-bold text-white mb-2 text-shadow">Special Abilities</h4>
          <ul className="list-disc list-inside space-y-1">
            {specialAbilities.map((ability) => (
              <li key={ability} className="text-white/90">{ability}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
