import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Book, Code, Shield, Zap } from "lucide-react";

const Docs = () => {
  const sections = [
    {
      icon: Book,
      title: "Getting Started",
      description: "Learn the basics of using ChainSync DEX for cross-chain swaps and yield optimization.",
      color: "text-neon-green"
    },
    {
      icon: Code,
      title: "Smart Contracts",
      description: "Explore our audited smart contracts and integration documentation.",
      color: "text-blue-400"
    },
    {
      icon: Shield,
      title: "Security",
      description: "Understand our security measures and best practices for safe trading.",
      color: "text-neon-purple"
    },
    {
      icon: Zap,
      title: "API Reference",
      description: "Build on top of ChainSync with our developer APIs and SDKs.",
      color: "text-yellow-400"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-28 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Title */}
            <div className="text-center space-y-3">
              <h1 className="text-4xl font-heading font-bold text-primary">Documentation</h1>
              <p className="text-xl text-muted-foreground">
                Everything you need to know about ChainSync DEX
              </p>
            </div>

            {/* Documentation Sections */}
            <div className="grid md:grid-cols-2 gap-6">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <Card 
                    key={index}
                    className="p-6 hover:shadow-lg hover:scale-105 transition-all cursor-pointer group"
                  >
                    <Icon className={`w-12 h-12 mb-4 ${section.color} group-hover:scale-110 transition-transform`} />
                    <h2 className="text-xl font-heading font-bold text-primary mb-2">
                      {section.title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {section.description}
                    </p>
                  </Card>
                );
              })}
            </div>

            {/* FAQ Section */}
            <Card className="p-6 space-y-4">
              <h2 className="text-2xl font-heading font-bold text-primary">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                <div className="pb-4 border-b border-border">
                  <h3 className="font-semibold text-primary mb-2">What is ChainSync DEX?</h3>
                  <p className="text-sm text-muted-foreground">
                    ChainSync is a cross-chain decentralized exchange that allows you to swap tokens 
                    and earn yields across Aster, Ethereum, and Solana networks seamlessly.
                  </p>
                </div>

                <div className="pb-4 border-b border-border">
                  <h3 className="font-semibold text-primary mb-2">How do I connect my wallet?</h3>
                  <p className="text-sm text-muted-foreground">
                    Click the "Connect Wallet" button in the header and select your preferred wallet provider. 
                    We support MetaMask, WalletConnect, and other popular wallets.
                  </p>
                </div>

                <div className="pb-4 border-b border-border">
                  <h3 className="font-semibold text-primary mb-2">What are the fees?</h3>
                  <p className="text-sm text-muted-foreground">
                    ChainSync charges a 0.3% trading fee. Gas fees vary by network and are displayed 
                    before each transaction.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-primary mb-2">Is ChainSync secure?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, all our smart contracts are audited by leading security firms. We employ 
                    industry-standard security practices and maintain a bug bounty program.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Docs;
