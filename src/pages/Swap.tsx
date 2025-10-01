import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDownUp, Settings, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const Swap = () => {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [slippage, setSlippage] = useState([0.5]);
  const [showSettings, setShowSettings] = useState(false);

  const tokens = [
    { symbol: "MAST", name: "Aster", balance: 100 },
    { symbol: "ETH", name: "Ethereum", balance: 2.5 },
    { symbol: "USDC", name: "USD Coin", balance: 1000 },
    { symbol: "SOL", name: "Solana", balance: 50 },
  ];

  const handleSwapDirection = () => {
    const temp = fromAmount;
    setFromAmount(toAmount);
    setToAmount(temp);
  };

  const calculateOutput = (input: string) => {
    if (!input || isNaN(parseFloat(input))) {
      setToAmount("");
      return;
    }
    const output = parseFloat(input) * 0.95;
    setToAmount(output.toFixed(6));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-28 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-xl mx-auto space-y-6">
            {/* Title */}
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-heading font-bold text-primary">Swap Tokens</h1>
              <p className="text-muted-foreground">Trade tokens across multiple chains</p>
            </div>

            {/* Main Swap Card */}
            <Card className="p-6 space-y-4 shadow-lg">
              {/* Settings Button */}
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSettings(!showSettings)}
                >
                  <Settings className="w-5 h-5" />
                </Button>
              </div>

              {/* Settings Panel */}
              {showSettings && (
                <div className="p-4 rounded-lg bg-secondary space-y-4 animate-fade-in-up">
                  <div>
                    <label className="text-sm text-muted-foreground">
                      Slippage Tolerance: {slippage[0]}%
                    </label>
                    <Slider
                      value={slippage}
                      onValueChange={setSlippage}
                      min={0.1}
                      max={5}
                      step={0.1}
                      className="mt-2"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Auto-routing</span>
                    <span className="text-neon-green">Enabled</span>
                  </div>
                </div>
              )}

              {/* From Input */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>From</span>
                  <span>Balance: 100 MAST</span>
                </div>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={fromAmount}
                    onChange={(e) => {
                      setFromAmount(e.target.value);
                      calculateOutput(e.target.value);
                    }}
                    className="flex-1 text-lg h-14 bg-secondary border-border"
                  />
                  <Select defaultValue="MAST">
                    <SelectTrigger className="w-32 h-14 bg-secondary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tokens.map((token) => (
                        <SelectItem key={token.symbol} value={token.symbol}>
                          {token.symbol}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Swap Direction Button */}
              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSwapDirection}
                  className="rounded-full bg-secondary hover:bg-neon-green/20 transition-all"
                >
                  <ArrowDownUp className="w-5 h-5 text-neon-green" />
                </Button>
              </div>

              {/* To Input */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>To</span>
                  <span>Balance: 1000 USDC</span>
                </div>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={toAmount}
                    readOnly
                    className="flex-1 text-lg h-14 bg-secondary border-border"
                  />
                  <Select defaultValue="USDC">
                    <SelectTrigger className="w-32 h-14 bg-secondary">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tokens.map((token) => (
                        <SelectItem key={token.symbol} value={token.symbol}>
                          {token.symbol}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Swap Button */}
              <Button 
                variant="neon" 
                size="lg" 
                className="w-full"
                disabled={!fromAmount || parseFloat(fromAmount) === 0}
              >
                Swap Now
              </Button>
            </Card>

            {/* Transaction Preview */}
            {toAmount && (
              <Card className="p-4 space-y-2 animate-fade-in-up">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Est. Output:</span>
                  <span className="text-primary font-medium">{toAmount} USDC</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Min. Received:</span>
                  <span className="text-primary font-medium">
                    {(parseFloat(toAmount) * (1 - slippage[0] / 100)).toFixed(6)} USDC
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Est. Fee:</span>
                  <span className="text-neon-green">$0.02</span>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Swap;
