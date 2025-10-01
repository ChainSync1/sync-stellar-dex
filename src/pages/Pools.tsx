import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Plus, Minus, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Pools = () => {
  const [depositAmount, setDepositAmount] = useState("");
  const [stakeAmount, setStakeAmount] = useState("");

  const calculateIL = (amount: string) => {
    if (!amount || isNaN(parseFloat(amount))) return 0;
    return parseFloat(amount) * 0.03; // 3% estimated IL
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-28 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Title */}
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-heading font-bold text-primary">Liquidity Pools</h1>
              <p className="text-muted-foreground">Provide liquidity and earn fees</p>
            </div>

            {/* Main Pool Card */}
            <Card className="p-6 space-y-6 shadow-lg">
              {/* Pool Stats */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                  MAST/ETH Meta-Pool
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-secondary space-y-1">
                    <p className="text-sm text-muted-foreground">TVL</p>
                    <p className="text-2xl font-bold text-neon-green">$2.5M</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary space-y-1">
                    <p className="text-sm text-muted-foreground">24h Volume</p>
                    <p className="text-2xl font-bold text-primary">$100K</p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary space-y-1 col-span-2 md:col-span-1">
                    <p className="text-sm text-muted-foreground">Fees Earned</p>
                    <p className="text-2xl font-bold text-neon-purple">0.3%</p>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="liquidity" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-secondary">
                  <TabsTrigger value="liquidity">Liquidity</TabsTrigger>
                  <TabsTrigger value="stake">Stake LP</TabsTrigger>
                </TabsList>

                <TabsContent value="liquidity" className="space-y-4 mt-6">
                  {/* IL Calculator */}
                  <div className="p-4 rounded-lg bg-secondary/50 border border-border space-y-3">
                    <h3 className="font-semibold text-primary">Impermanent Loss Calculator</h3>
                    <Input
                      type="number"
                      placeholder="Deposit amount"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="bg-secondary"
                    />
                    {depositAmount && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Est. IL Risk:</span>
                        <span className="text-yellow-500">
                          ~${calculateIL(depositAmount).toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="neon" size="lg">
                      <Plus className="w-5 h-5" />
                      Add Liquidity
                    </Button>
                    <Button variant="wallet" size="lg">
                      <Minus className="w-5 h-5" />
                      Remove Liquidity
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="stake" className="space-y-4 mt-6">
                  {/* Staking Info */}
                  <div className="p-4 rounded-lg bg-gradient-to-r from-neon-green/10 to-neon-purple/10 border border-neon-green/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">APR</span>
                      <span className="text-2xl font-bold text-neon-green">10%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Stake your LP tokens to earn additional rewards
                    </p>
                  </div>

                  {/* Stake Input */}
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">LP Tokens to Stake</label>
                    <Input
                      type="number"
                      placeholder="0.0"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      className="bg-secondary h-14 text-lg"
                    />
                  </div>

                  {/* Stake Button */}
                  <Button 
                    variant="neon" 
                    size="lg" 
                    className="w-full"
                    disabled={!stakeAmount || parseFloat(stakeAmount) === 0}
                  >
                    <TrendingUp className="w-5 h-5" />
                    Stake Now
                  </Button>

                  {/* Earnings Preview */}
                  {stakeAmount && (
                    <div className="p-4 rounded-lg bg-secondary space-y-2 animate-fade-in-up">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Annual Earnings:</span>
                        <span className="text-neon-green font-semibold">
                          ${(parseFloat(stakeAmount) * 0.1).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Monthly Earnings:</span>
                        <span className="text-primary font-semibold">
                          ${(parseFloat(stakeAmount) * 0.1 / 12).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </Card>

            {/* Additional Info */}
            <Card className="p-6 bg-secondary/30">
              <h3 className="font-semibold text-primary mb-3">About Meta-Pools</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Meta-pools allow you to provide liquidity across multiple chains simultaneously. 
                Your assets are automatically routed to the most efficient chains, maximizing your 
                returns while minimizing gas fees and slippage.
              </p>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Pools;
