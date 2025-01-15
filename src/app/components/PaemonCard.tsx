'use client'

interface Move {
  name: string;
  description: string;
  attack?: number;
}

interface PaemonCardProps {
  name: string;
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  type: string;
  moves: Move[];
  weakness: string;
  flavorText: string;
  imageUrl: string;
}

export default function PaemonCard({
  name,
  hp,
  attack,
  defense,
  speed,
  type,
  moves,
  weakness,
  flavorText,
  imageUrl,
}: PaemonCardProps) {
  return (
    <div className="gba-screen scrollable-card">
      <div className="bg-[#E0757C] p-4 rounded-t-lg sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white text-shadow">{name}</h2>
          <span className="text-2xl font-bold text-white text-shadow">{hp} HP</span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-4">
          <div className="bg-[#2D1B2E] rounded-lg p-2 text-center">
            <div className="text-white text-shadow text-sm">ATK</div>
            <div className="text-[#E0757C] font-bold text-lg">{attack}</div>
          </div>
          <div className="bg-[#2D1B2E] rounded-lg p-2 text-center">
            <div className="text-white text-shadow text-sm">DEF</div>
            <div className="text-[#E0757C] font-bold text-lg">{defense}</div>
          </div>
          <div className="bg-[#2D1B2E] rounded-lg p-2 text-center">
            <div className="text-white text-shadow text-sm">SPD</div>
            <div className="text-[#E0757C] font-bold text-lg">{speed}</div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="bg-[#7BA1A8] p-4">
        <div className="relative w-full h-64 border-4 border-[#5A8087] rounded-lg overflow-hidden shadow-lg">
          <img
            src={imageUrl}
            alt={name}
            className="object-contain w-full h-full pixelated"
          />
        </div>
      </div>

      {/* Type and Weakness */}
      <div className="bg-[#7BA1A8] p-4 flex justify-between items-center border-t-2 border-[#5A8087]">
        <div className="flex items-center gap-2">
          <span className="text-[#2D1B2E] font-bold text-shadow">Type:</span>
          <span className="inline-block bg-[#2D1B2E] text-[#E0757C] px-3 py-1 rounded-full text-sm font-bold hover:bg-[#3D2F45] transition-colors duration-200 cursor-default">{type}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#2D1B2E] font-bold text-shadow">Weakness:</span>
          <span className="inline-block bg-[#2D1B2E] text-[#E0757C] px-3 py-1 rounded-full text-sm font-bold hover:bg-[#3D2F45] transition-colors duration-200 cursor-default">{weakness}</span>
        </div>
      </div>

      {/* Moves */}
      <div className="bg-[#7BA1A8] p-4 border-t-2 border-[#5A8087]">
        <h3 className="text-[#2D1B2E] font-bold mb-2 text-shadow">Moves:</h3>
        <div className="space-y-3">
          {moves.map((move, index) => (
            <div 
              key={move.name}
              className="bg-[#5A8087] p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-white text-shadow">{move.name}</span>
                {move.attack && (
                  <span className="text-white text-shadow">×{move.attack}</span>
                )}
              </div>
              <p className="text-sm text-white/90">{move.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Flavor Text */}
      <div className="bg-[#7BA1A8] p-4 border-t-2 border-[#5A8087] rounded-b-lg">
        <p className="text-sm text-[#2D1B2E] italic text-shadow">{flavorText}</p>
      </div>
    </div>
  );
}
