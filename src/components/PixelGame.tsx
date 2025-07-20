import React, { useState } from 'react';
import PixelBackground from '@/components/PixelBackground';
import GameMenu from '@/components/GameMenu';
import CharacterSelect from '@/components/CharacterSelect';
import GameHUD from '@/components/GameHUD';

type GameState = 'menu' | 'character-select' | 'playing' | 'leaderboard' | 'settings';

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

  const handleViewLeaderboard = () => {
    setGameState('leaderboard');
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
            onViewLeaderboard={handleViewLeaderboard}
            onSettings={handleSettings}
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
      
      case 'leaderboard':
        return (
          <div className="game-screen p-8 crt-effect min-h-screen flex flex-col justify-center">
            <button 
              onClick={handleBackToMenu}
              className="absolute top-4 left-4 z-10 pixel-button px-4 py-2 text-xs"
            >
              ← BACK
            </button>
            <div className="text-center">
              <h2 className="text-4xl pixel-text-glow mb-8">LEADERBOARD</h2>
              <div className="max-w-md mx-auto space-y-4">
                {[
                  { rank: 1, name: "ZIGGY_MASTER", score: 99999, character: "🐱" },
                  { rank: 2, name: "ZOOP_HERO", score: 89999, character: "🐰" },
                  { rank: 3, name: "PIXEL_KING", score: 79999, character: "🦄" },
                  { rank: 4, name: "RETRO_ACE", score: 69999, character: "🐱" },
                  { rank: 5, name: "GAME_LORD", score: 59999, character: "🐰" }
                ].map(player => (
                  <div key={player.rank} className="flex items-center justify-between border-2 border-white p-3 bg-background">
                    <div className="flex items-center gap-3">
                      <span className="text-game-yellow pixel-text-outline">#{player.rank}</span>
                      <span className="text-xl">{player.character}</span>
                      <span className="pixel-text-outline">{player.name}</span>
                    </div>
                    <span className="text-game-pink font-bold">{player.score.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
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