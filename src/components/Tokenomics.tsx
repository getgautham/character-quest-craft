import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Shield, Zap, DollarSign } from 'lucide-react';

const Tokenomics = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-pixel text-3xl md:text-5xl gradient-text mb-4">
            $ZOOP TOKENOMICS
          </h2>
          <p className="font-orbitron text-xl text-muted-foreground max-w-2xl mx-auto">
            Sustainable gaming economy powered by community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Token Stats */}
          <div className="space-y-6">
            <Card className="game-card">
              <CardHeader>
                <CardTitle className="font-pixel text-xl flex items-center gap-3">
                  <DollarSign className="text-game-yellow" />
                  TOKEN SUPPLY
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-pixel text-game-pink mb-2">1,000,000,000</div>
                <div className="font-orbitron text-muted-foreground">Total $ZOOP Supply</div>
              </CardContent>
            </Card>

            <Card className="game-card">
              <CardHeader>
                <CardTitle className="font-pixel text-xl flex items-center gap-3">
                  <TrendingUp className="text-game-green" />
                  LIQUIDITY
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-pixel text-game-blue mb-2">95%</div>
                <div className="font-orbitron text-muted-foreground">Locked Forever</div>
              </CardContent>
            </Card>

            <Card className="game-card">
              <CardHeader>
                <CardTitle className="font-pixel text-xl flex items-center gap-3">
                  <Shield className="text-game-purple" />
                  TEAM TOKENS
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-pixel text-game-yellow mb-2">0%</div>
                <div className="font-orbitron text-muted-foreground">No Team Allocation</div>
              </CardContent>
            </Card>
          </div>

          {/* Distribution Chart */}
          <div className="game-card p-8">
            <h3 className="font-pixel text-2xl text-center mb-8 gradient-text">DISTRIBUTION</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-orbitron text-muted-foreground">Gaming Rewards</span>
                <span className="font-pixel text-game-pink">40%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-gradient-to-r from-game-pink to-game-purple h-3 rounded-full" style={{ width: '40%' }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-orbitron text-muted-foreground">Community</span>
                <span className="font-pixel text-game-blue">30%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-gradient-to-r from-game-blue to-game-purple h-3 rounded-full" style={{ width: '30%' }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-orbitron text-muted-foreground">Liquidity Pool</span>
                <span className="font-pixel text-game-yellow">20%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-gradient-to-r from-game-yellow to-game-pink h-3 rounded-full" style={{ width: '20%' }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-orbitron text-muted-foreground">Development</span>
                <span className="font-pixel text-game-green">10%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div className="bg-gradient-to-r from-game-green to-game-blue h-3 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button variant="gaming" size="lg" className="font-pixel">
                <Zap className="mr-2" />
                BUY $ZOOP
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;