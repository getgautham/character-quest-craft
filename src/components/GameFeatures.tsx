import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Gamepad2, Coins, Users, Trophy, Zap, Star } from 'lucide-react';

const features = [
  {
    icon: Gamepad2,
    title: 'Epic Adventures',
    description: 'Embark on thrilling quests with Ziggy & Zoop through mystical gaming realms',
    color: 'text-game-pink',
    glow: 'glow-pink'
  },
  {
    icon: Coins,
    title: 'Earn $ZOOP',
    description: 'Play-to-earn mechanics that reward skilled players with valuable tokens',
    color: 'text-game-yellow',
    glow: 'glow-yellow'
  },
  {
    icon: Users,
    title: 'Guild System',
    description: 'Team up with friends and dominate leaderboards together',
    color: 'text-game-blue',
    glow: 'glow-blue'
  },
  {
    icon: Trophy,
    title: 'Tournaments',
    description: 'Compete in seasonal events for exclusive rewards and glory',
    color: 'text-game-purple',
    glow: 'glow-purple'
  },
  {
    icon: Zap,
    title: 'Power-Ups',
    description: 'Collect rare items and boost your characters to legendary status',
    color: 'text-game-green',
    glow: 'glow-green'
  },
  {
    icon: Star,
    title: 'NFT Collectibles',
    description: 'Own unique character skins, weapons, and accessories',
    color: 'text-game-pink',
    glow: 'glow-pink'
  }
];

const GameFeatures = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-pixel text-3xl md:text-5xl gradient-text mb-4">
            GAME FEATURES
          </h2>
          <p className="font-orbitron text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the amazing features that make our gaming universe unique
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index} 
                className="game-card group cursor-pointer hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-card/50 mb-4 ${feature.color} group-hover:${feature.glow} transition-all duration-300`}>
                    <IconComponent size={32} />
                  </div>
                  <h3 className="font-pixel text-lg mb-3 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="font-orbitron text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GameFeatures;