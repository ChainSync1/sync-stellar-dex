import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { label: "Swap", path: "/swap" },
    { label: "Yield", path: "/yield" },
    { label: "Pools", path: "/pools" },
    { label: "Docs", path: "/docs" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 border-b border-border bg-navy-dark/80 backdrop-blur-lg">
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-neon-green to-neon-purple rounded-lg" />
          <span className="text-2xl font-heading font-bold text-primary">ChainSync</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-base font-medium transition-all relative group ${
                isActive(item.path) 
                  ? "text-neon-green" 
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {item.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-neon-green transition-all ${
                isActive(item.path) ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>
          ))}
        </nav>

        {/* Connect Wallet Button */}
        <div className="hidden md:block">
          <Button variant="wallet" size="lg">
            <Wallet className="w-4 h-4" />
            Connect Wallet
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-navy-darker border-b border-border animate-fade-in-up">
          <nav className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium py-2 ${
                  isActive(item.path) 
                    ? "text-neon-green" 
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button variant="wallet" size="lg" className="w-full">
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
