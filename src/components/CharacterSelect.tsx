import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import characterBlue from '@/assets/character-blue.png';
import characterPink from '@/assets/character-pink.png';
import characterYellow from '@/assets/character-yellow.png';

interface Character {
  id: string;
  name: string;
  sprite: string;
  image: string;
  stats: {
    attack: number;
    defense: number;
    speed: number;
    magic: number;
  };
  special: string;
  unlocked: boolean;
}

const characters: Character[] = [
  {
    id: 'ziggy',
    name: 'ZIGGY',
    sprite: '🐱',
    image: characterBlue,
    stats: { attack: 8, defense: 6, speed: 9, magic: 7 },
    special: 'LIGHTNING DASH',
    unlocked: true
  },
  {
    id: 'zoop',
    name: 'ZOOP',
    sprite: '🐰',
    image: characterYellow,
    stats: { attack: 7, defense: 8, speed: 6, magic: 9 },
    special: 'MEGA BOUNCE',
    unlocked: true
  },
  {
    id: 'pinky',
    name: 'PINKY',
    sprite: '🦄',
    image: characterPink,
    stats: { attack: 9, defense: 5, speed: 8, magic: 8 },
    special: 'STAR BURST',
    unlocked: false
  }
];

interface CharacterSelectProps {
  onSelectCharacter: (character: Character) => void;
  selectedCharacter?: Character;
}

const CharacterSelect: React.FC<CharacterSelectProps> = ({ 
  onSelectCharacter, 
  selectedCharacter 
}) => {
  const [hoveredCharacter, setHoveredCharacter] = useState<string | null>(null);

  const StatBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
    <div className="mb-2">
      <div className="flex justify-between text-xs mb-1">
        <span className="pixel-text-outline">{label}</span>
        <span className="text-game-yellow">{value}/10</span>
      </div>
      <div className="health-bar">
        <div 
          className="health-bar-fill"
          style={{ 
            width: `${value * 10}%`,
            backgroundColor: `hsl(var(--${color}))`
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="game-screen p-6 crt-effect">
      <div className="text-center mb-8">
        <h2 className="text-3xl pixel-text-glow mb-2">CHARACTER SELECT</h2>
        <div className="text-sm pixel-text-outline blink">CHOOSE YOUR FIGHTER</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {characters.map((character) => (
          <Card 
            key={character.id}
            className={`
              border-4 cursor-pointer transition-all duration-200 relative
              ${selectedCharacter?.id === character.id ? 'border-game-pink pixel-flash' : 'border-white'}
              ${character.unlocked ? 'hover:scale-105' : 'opacity-50 cursor-not-allowed'}
              ${hoveredCharacter === character.id ? 'pixel-shake' : ''}
            `}
            onClick={() => character.unlocked && onSelectCharacter(character)}
            onMouseEnter={() => setHoveredCharacter(character.id)}
            onMouseLeave={() => setHoveredCharacter(null)}
          >
            {!character.unlocked && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
                <div className="text-center">
                  <div className="text-2xl mb-2">🔒</div>
                  <div className="text-xs pixel-text-outline">LOCKED</div>
                </div>
              </div>
            )}

            <CardHeader className="text-center pb-2">
              <CardTitle className="text-lg pixel-text-outline">{character.name}</CardTitle>
              <div className="text-2xl pixel-bounce">{character.sprite}</div>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Character Image */}
              <div className="flex justify-center">
                <img 
                  src={character.image} 
                  alt={character.name}
                  className="w-24 h-24 pixel-character"
                />
              </div>

              {/* Stats */}
              <div className="space-y-1">
                <StatBar label="ATK" value={character.stats.attack} color="health-bar" />
                <StatBar label="DEF" value={character.stats.defense} color="game-blue" />
                <StatBar label="SPD" value={character.stats.speed} color="game-yellow" />
                <StatBar label="MAG" value={character.stats.magic} color="game-purple" />
              </div>

              {/* Special Attack */}
              <div className="text-center">
                <div className="text-xs text-game-purple pixel-text-outline mb-1">SPECIAL</div>
                <div className="text-xs text-game-pink font-bold">{character.special}</div>
              </div>

              {/* Selection indicator */}
              {selectedCharacter?.id === character.id && (
                <div className="text-center">
                  <div className="text-sm text-game-green pixel-text-glow blink">SELECTED</div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Character Details */}
      {selectedCharacter && (
        <Card className="border-4 border-game-pink bg-background">
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl pixel-text-glow mb-3">{selectedCharacter.name} PROFILE</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="pixel-text-outline">CLASS:</span>
                    <span className="text-game-yellow">WARRIOR</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="pixel-text-outline">ELEMENT:</span>
                    <span className="text-game-blue">LIGHTNING</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="pixel-text-outline">RARITY:</span>
                    <span className="text-game-purple">LEGENDARY</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg pixel-text-outline mb-3">ABILITIES</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-game-pink">⚡</span>
                    <span>{selectedCharacter.special}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-game-blue">🛡️</span>
                    <span>MEGA SHIELD</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-game-yellow">✨</span>
                    <span>POWER BOOST</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button 
          className="pixel-button-primary px-8 py-3 text-sm"
          disabled={!selectedCharacter}
        >
          CONFIRM SELECTION
        </button>
        <button className="pixel-button px-8 py-3 text-sm">
          RANDOM SELECT
        </button>
      </div>

      {/* Unlock Progress */}
      <div className="mt-6 text-center">
        <div className="text-xs pixel-text-outline mb-2">CHARACTERS UNLOCKED</div>
        <div className="text-lg text-game-green">
          {characters.filter(c => c.unlocked).length} / {characters.length}
        </div>
      </div>
    </div>
  );
};

export default CharacterSelect;