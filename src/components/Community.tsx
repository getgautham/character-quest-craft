import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Twitter, MessageCircle, Github, Users, Heart, Rocket } from 'lucide-react';

const Community = () => {
  const socialLinks = [
    { icon: Twitter, label: 'Twitter', followers: '125K', color: 'text-game-blue' },
    { icon: MessageCircle, label: 'Discord', members: '89K', color: 'text-game-purple' },
    { icon: Github, label: 'GitHub', stars: '12K', color: 'text-game-pink' },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-pixel text-3xl md:text-5xl gradient-text mb-4">
            JOIN THE ADVENTURE
          </h2>
          <p className="font-orbitron text-xl text-muted-foreground max-w-2xl mx-auto">
            Be part of the most epic gaming community in the metaverse
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {socialLinks.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <Card 
                key={index} 
                className="game-card group cursor-pointer hover:scale-105 transition-all duration-300"
              >
                <CardContent className="p-8 text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-card/50 mb-4 ${social.color}`}>
                    <IconComponent size={32} />
                  </div>
                  <h3 className="font-pixel text-xl mb-2 text-foreground">
                    {social.label}
                  </h3>
                  <div className="font-pixel text-2xl text-game-pink mb-2">
                    {social.followers || social.members || social.stars}
                  </div>
                  <p className="font-orbitron text-sm text-muted-foreground">
                    {social.followers ? 'Followers' : social.members ? 'Members' : 'Stars'}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Community Stats */}
        <div className="game-card p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-game-pink/20 mx-auto mb-3">
                <Users className="text-game-pink" />
              </div>
              <div className="font-pixel text-2xl text-game-pink mb-1">250K+</div>
              <div className="font-orbitron text-sm text-muted-foreground">Active Players</div>
            </div>
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-game-blue/20 mx-auto mb-3">
                <Heart className="text-game-blue" />
              </div>
              <div className="font-pixel text-2xl text-game-blue mb-1">98%</div>
              <div className="font-orbitron text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-game-purple/20 mx-auto mb-3">
                <Rocket className="text-game-purple" />
              </div>
              <div className="font-pixel text-2xl text-game-purple mb-1">50+</div>
              <div className="font-orbitron text-sm text-muted-foreground">Game Modes</div>
            </div>
            <div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-game-yellow/20 mx-auto mb-3">
                <Users className="text-game-yellow" />
              </div>
              <div className="font-pixel text-2xl text-game-yellow mb-1">1M+</div>
              <div className="font-orbitron text-sm text-muted-foreground">Guild Members</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="font-pixel text-2xl mb-6 text-glow">READY TO PLAY?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gaming" size="lg" className="font-pixel text-lg px-12 py-6">
              START PLAYING NOW
            </Button>
            <Button variant="gaming-secondary" size="lg" className="font-pixel text-lg px-12 py-6">
              JOIN DISCORD
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;