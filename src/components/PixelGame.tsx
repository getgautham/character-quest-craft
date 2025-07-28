import React, { useState } from 'react';
import PixelBackground from '@/components/PixelBackground';
import GameMenu from '@/components/GameMenu';
import CharacterSelect from '@/components/CharacterSelect';
import GameHUD from '@/components/GameHUD';

type GameState = 'menu' | 'character-select' | 'playing' | 'instagram' | 'settings';

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

const PixelGame = () => {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | undefined>();

  const handleStartGame = () => {
    if (selectedCharacter) {
      setGameState('playing');
    } else {
      setGameState('character-select');
    }
  };

  const handleSelectCharacter = () => {
    setGameState('character-select');
  };

  const handleCharacterSelected = (character: Character) => {
    setSelectedCharacter(character);
    // Auto-start game after character selection
    setTimeout(() => {
      setGameState('playing');
    }, 1000);
  };

  const handleViewInstagram = () => {
    window.open('https://instagram.com/ziggyandzoop', '_blank');
  };

  const handleSettings = () => {
    setGameState('settings');
  };

  const handleBackToMenu = () => {
    setGameState('menu');
  };

  const renderCurrentScreen = () => {
    switch (gameState) {
      case 'menu':
        return (
          <GameMenu
            onStartGame={handleStartGame}
            onSelectCharacter={handleSelectCharacter}
          onViewLeaderboard={handleViewInstagram}
          onViewInstagram={handleViewInstagram}
          />
        );
      
      case 'character-select':
        return (
          <div>
            <button 
              onClick={handleBackToMenu}
              className="absolute top-4 left-4 z-10 pixel-button px-4 py-2 text-xs"
            >
              ← BACK
            </button>
            <CharacterSelect
              onSelectCharacter={handleCharacterSelected}
              selectedCharacter={selectedCharacter}
            />
          </div>
        );
      
      case 'playing':
        return (
          <div>
            <button 
              onClick={handleBackToMenu}
              className="absolute top-4 left-4 z-10 pixel-button px-4 py-2 text-xs"
            >
              ← MENU
            </button>
            <GameHUD />
          </div>
        );
      
      case 'instagram':
        return (
          <div className="text-center text-white p-8">
            <h2 className="text-2xl pixel-text-glow mb-4">Follow us on Instagram!</h2>
            <p className="mb-4">@ziggyandzoop</p>
            <button 
              onClick={handleBackToMenu}
              className="pixel-button px-6 py-2"
            >
              BACK TO MENU
            </button>
          </div>
        );
      
      case 'settings':
        return (
          <div className="game-screen p-8 crt-effect min-h-screen flex flex-col justify-center">
            <button 
              onClick={handleBackToMenu}
              className="absolute top-4 left-4 z-10 pixel-button px-4 py-2 text-xs"
            >
              ← BACK
            </button>
            <div className="text-center">
              <h2 className="text-4xl pixel-text-glow mb-8">SETTINGS</h2>
              <div className="max-w-md mx-auto space-y-4">
                <div className="border-2 border-white p-4 bg-background">
                  <div className="flex justify-between items-center mb-2">
                    <span className="pixel-text-outline">SOUND</span>
                    <span className="text-game-green">ON</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="pixel-text-outline">MUSIC</span>
                    <span className="text-game-green">ON</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="pixel-text-outline">DIFFICULTY</span>
                    <span className="text-game-yellow">NORMAL</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="pixel-text-outline">CONTROLS</span>
                    <span className="text-game-blue">WASD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen overflow-hidden relative">
      <PixelBackground />
      {renderCurrentScreen()}
      
      {/* Debug info */}
      <div className="absolute bottom-4 right-4 text-xs text-gray-500 pixel-text-outline">
        <div>STATE: {gameState.toUpperCase()}</div>
        {selectedCharacter && <div>CHARACTER: {selectedCharacter.name}</div>}
      </div>
    </div>
  );
};

export default PixelGame;