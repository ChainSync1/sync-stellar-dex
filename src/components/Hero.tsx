import { Button } from "@/components/ui/button";
import { TrendingUp, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [tvl, setTvl] = useState(245.8);
  const [chains] = useState(3);

  // Simulate TVL updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTvl((prev) => prev + Math.random() * 0.5 - 0.25);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-[600px] flex items-center justify-center gradient-hero relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-green/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-primary leading-tight">
            Swap & Earn Across Chains{" "}
            <span className="bg-gradient-to-r from-neon-green to-neon-purple bg-clip-text text-transparent">
              in One Click
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Maximize yields with Aster, Ethereum, and Solana
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="hero" 
              size="xl"
              onClick={() => navigate("/swap")}
              className="w-full sm:w-auto"
            >
              <Zap className="w-5 h-5" />
              Start Earning
            </Button>
            <Button 
              variant="wallet" 
              size="xl"
              onClick={() => navigate("/yield")}
              className="w-full sm:w-auto"
            >
              <TrendingUp className="w-5 h-5" />
              View Yields
            </Button>
          </div>

          {/* TVL Ticker */}
          <div className="mt-12 pt-8 border-t border-border/30">
            <div className="flex items-center justify-center space-x-2 text-lg">
              <span className="text-muted-foreground">Total Value Locked:</span>
              <span className="text-2xl font-bold text-neon-green font-heading">
                ${tvl.toFixed(1)}M
              </span>
              <span className="text-muted-foreground">across</span>
              <span className="text-2xl font-bold text-neon-purple font-heading">
                {chains}
              </span>
              <span className="text-muted-foreground">chains</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
