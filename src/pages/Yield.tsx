import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowUpDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Yield = () => {
  const [sortBy, setSortBy] = useState<"apy" | "tvl">("apy");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [depositAmount, setDepositAmount] = useState("");

  const pools = [
    { chain: "Aster", pool: "MAST/ETH", apy: 15.2, tvl: 2.5, icon: "🌟", color: "text-neon-green" },
    { chain: "Solana", pool: "SOL/USDC", apy: 12.1, tvl: 1.8, icon: "◎", color: "text-orange-400" },
    { chain: "Ethereum", pool: "USDC", apy: 8.7, tvl: 10, icon: "💎", color: "text-blue-400" },
  ];

  const sortedPools = [...pools].sort((a, b) => {
    const multiplier = sortOrder === "asc" ? 1 : -1;
    return sortBy === "apy" 
      ? (a.apy - b.apy) * multiplier 
      : (a.tvl - b.tvl) * multiplier;
  });

  const handleSort = (field: "apy" | "tvl") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const bestPool = sortedPools[0];
  const estimatedYield = depositAmount ? (parseFloat(depositAmount) * bestPool.apy) / 100 : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-28 pb-12">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Title */}
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-heading font-bold text-primary">Yield Optimizer</h1>
              <p className="text-muted-foreground">Find the best yields across multiple chains</p>
            </div>

            {/* Main Card */}
            <Card className="p-6 space-y-6 shadow-lg">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Table Section */}
                <div className="space-y-4">
                  <h2 className="text-xl font-heading font-semibold">Pool Comparison</h2>
                  <div className="rounded-lg border border-border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-secondary/50">
                          <TableHead>Chain</TableHead>
                          <TableHead>Pool</TableHead>
                          <TableHead 
                            className="cursor-pointer hover:text-neon-green transition-colors"
                            onClick={() => handleSort("apy")}
                          >
                            <div className="flex items-center space-x-1">
                              <span>APY</span>
                              <ArrowUpDown className="w-4 h-4" />
                            </div>
                          </TableHead>
                          <TableHead 
                            className="cursor-pointer hover:text-neon-green transition-colors"
                            onClick={() => handleSort("tvl")}
                          >
                            <div className="flex items-center space-x-1">
                              <span>TVL</span>
                              <ArrowUpDown className="w-4 h-4" />
                            </div>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sortedPools.map((pool, index) => (
                          <TableRow 
                            key={index}
                            className="hover:bg-secondary/30 transition-colors cursor-pointer"
                          >
                            <TableCell>
                              <span className="flex items-center space-x-2">
                                <span className={pool.color}>{pool.icon}</span>
                                <span className="font-medium">{pool.chain}</span>
                              </span>
                            </TableCell>
                            <TableCell className="font-mono text-sm">{pool.pool}</TableCell>
                            <TableCell>
                              <span className="text-neon-green font-semibold">{pool.apy}%</span>
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              ${pool.tvl}M
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Chart Visualization */}
                <div className="space-y-4">
                  <h2 className="text-xl font-heading font-semibold">APY Comparison</h2>
                  <div className="h-64 flex items-end justify-around p-4 rounded-lg bg-secondary/30">
                    {sortedPools.map((pool, index) => (
                      <div key={index} className="flex flex-col items-center space-y-2 flex-1 mx-2">
                        <div 
                          className="w-full rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                          style={{
                            height: `${(pool.apy / 20) * 100}%`,
                            background: pool.chain === "Aster" 
                              ? "hsl(var(--neon-green))"
                              : pool.chain === "Ethereum"
                              ? "#1E90FF"
                              : "#FF9500"
                          }}
                          title={`${pool.chain}: ${pool.apy}%, TVL: $${pool.tvl}M`}
                        />
                        <span className="text-xs text-muted-foreground font-medium">
                          {pool.chain}
                        </span>
                        <span className={`text-sm font-semibold ${pool.color}`}>
                          {pool.apy}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Deposit Section */}
              <div className="pt-6 border-t border-border space-y-4">
                <h2 className="text-xl font-heading font-semibold">Deposit & Earn</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="number"
                    placeholder="Amount to Deposit"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="flex-1 h-12 text-lg bg-secondary"
                  />
                  <Button variant="neon" size="lg" className="sm:w-48">
                    Auto-Allocate
                  </Button>
                </div>
              </div>
            </Card>

            {/* Info Panel */}
            {depositAmount && (
              <Card className="p-6 space-y-2 animate-fade-in-up">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Deposited:</span>
                  <span className="text-2xl font-bold text-primary font-heading">
                    ${parseFloat(depositAmount).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Best Pool:</span>
                  <span className="text-lg font-semibold text-neon-green">
                    {bestPool.chain} {bestPool.pool}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Est. Annual Yield:</span>
                  <span className="text-2xl font-bold text-neon-green font-heading">
                    ${estimatedYield.toFixed(2)}
                  </span>
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

export default Yield;
