import { Link } from "react-router-dom";
import { Github, Twitter, MessageCircle } from "lucide-react";

const Footer = () => {
  const chains = [
    { name: "Aster", icon: "🌟" },
    { name: "Ethereum", icon: "💎" },
    { name: "Solana", icon: "◎" },
  ];

  return (
    <footer className="border-t border-border bg-navy-darker mt-auto">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Chain Selector */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Chains:</span>
            <div className="flex space-x-2">
              {chains.map((chain) => (
                <button
                  key={chain.name}
                  className="px-3 py-1 rounded-lg bg-secondary hover:bg-secondary/80 transition-all text-sm flex items-center space-x-1"
                  title={chain.name}
                >
                  <span>{chain.icon}</span>
                  <span className="hidden sm:inline">{chain.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Gas Estimator */}
          <div className="text-sm text-muted-foreground">
            Gas: <span className="text-neon-green">~$0.01</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-neon-purple transition-colors"
              aria-label="Discord"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-neon-purple transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-neon-purple transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
