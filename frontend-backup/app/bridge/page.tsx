'use client';

import React, { useState } from 'react';
import { ArrowRight, Clock, CheckCircle, Sparkles, Wallet, GitBranch, AlertCircle, Shield, DollarSign, TrendingUp } from 'lucide-react';
import Navigation from '../../components/Navigation';

const SOURCE_CHAINS = [
  { id: 'ethereum', name: 'Ethereum', icon: '🔷', color: 'text-blue-400' },
  { id: 'arbitrum', name: 'Arbitrum', icon: '🔵', color: 'text-blue-300' },
  { id: 'polygon', name: 'Polygon', icon: '🟣', color: 'text-purple-400' },
  { id: 'optimism', name: 'Optimism', icon: '🔴', color: 'text-red-400' }
];

export default function BridgePage() {
  const [amount, setAmount] = useState('5000');
  const [sourceChain, setSourceChain] = useState('ethereum');
  const [status, setStatus] = useState<'idle' | 'pending' | 'confirmed'>('idle');
  const [txHash, setTxHash] = useState('');

  const handleBridge = async () => {
    setStatus('pending');
    setTxHash('0x1234...abcd');
    
    // Simulate bridge process
    setTimeout(() => {
      setStatus('confirmed');
      // Auto-fill Arc wallet balance would happen here
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] relative overflow-hidden">
      <Navigation />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-600/10 via-blue-600/10 to-green-600/10"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#161b22] border border-[#30363d] rounded-full text-gray-300 text-sm font-medium mb-6">
            <GitBranch className="w-4 h-4 text-teal-400" />
            Circle CCTP • Cross-Chain Bridge • Arc Native
            <Sparkles className="w-4 h-4 text-teal-400" />
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4">
            Bridge USDC to <span className="bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">Arc</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-2">
            Transfer USDC seamlessly using Circle's Cross-Chain Transfer Protocol
          </p>
          <div className="text-lg text-blue-300 font-semibold">
            🏆 Pure USDC Focus • No Token Volatility • Stable Value
          </div>
          
          {/* Key Benefits */}
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#161b22] border border-green-500/30 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-green-400 mb-2">For Tenants</h3>
              <p className="text-sm text-gray-300 mb-3">Build credit • Earn 4.2% yield • Flexible 6-month terms</p>
              <div className="text-xs text-green-200 bg-green-600/20 rounded-lg p-2">
                <strong>🏠 Future Property Purchase:</strong> High reputation = up to 2% lower mortgage rates!
              </div>
            </div>
            
            <div className="bg-[#161b22] border border-blue-500/30 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-blue-400 mb-2">For Landlords</h3>
              <p className="text-sm text-gray-300 mb-3">100% payment guarantee • Risk insurance • Instant releases</p>
              <div className="text-xs text-blue-200 bg-blue-600/20 rounded-lg p-2">
                <strong>💰 Guaranteed Income:</strong> Smart contracts ensure zero payment delays
              </div>
            </div>
            
            <div className="bg-[#161b22] border border-yellow-500/30 rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-yellow-400 mb-2">USDC Yields</h3>
              <p className="text-sm text-gray-300 mb-3">Earn 4.2% APY on all deposits • No inflation risk</p>
              <div className="text-xs text-yellow-200 bg-yellow-600/20 rounded-lg p-2">
                <strong>📈 Compound Growth:</strong> $5000 → $5210 per year automatically
              </div>
            </div>
          </div>
        </div>

        {/* Main Bridge Interface */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-8 shadow-2xl">
            
            {/* From Section */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-300 mb-4">From Chain</label>
              <div className="grid grid-cols-2 gap-3">
                {SOURCE_CHAINS.map((chain) => (
                  <button
                    key={chain.id}
                    onClick={() => setSourceChain(chain.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      sourceChain === chain.id
                        ? 'border-teal-500 bg-teal-500/10'
                        : 'border-[#30363d] bg-[#24292e] hover:border-teal-500/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{chain.icon}</span>
                      <div className="text-left">
                        <div className={`font-semibold ${chain.color}`}>{chain.name}</div>
                        <div className="text-xs text-gray-400">Available: 10,000 USDC</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Section */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-300 mb-4">Amount to Bridge</label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-6 bg-[#24292e] border border-[#30363d] rounded-xl text-white text-2xl font-bold focus:border-teal-500 focus:outline-none"
                  placeholder="0.00"
                />
                <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex items-center gap-3">
                  <span className="text-gray-400 font-medium">USDC</span>
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">$</span>
                  </div>
                </div>
              </div>
              
              {/* Quick Amount Buttons */}
              <div className="flex gap-2 mt-4">
                {['1000', '2500', '5000', '10000'].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setAmount(preset)}
                    className="px-4 py-2 bg-[#24292e] border border-[#30363d] rounded-lg text-gray-300 hover:border-teal-500/50 transition-all text-sm"
                  >
                    ${preset}
                  </button>
                ))}
              </div>
            </div>

            {/* To Section */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-300 mb-4">To Chain</label>
              <div className="p-6 bg-gradient-to-r from-teal-600/20 to-green-600/20 border border-teal-500/30 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-green-600 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-white">Arc Blockchain</div>
                    <div className="text-teal-300 text-sm">Destination: Arc Dev Wallet</div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-2xl font-bold text-teal-300">${amount || '0'}</div>
                    <div className="text-xs text-gray-400">USDC to receive</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bridge Status */}
            {status !== 'idle' && (
              <div className="mb-8">
                <div className={`p-6 rounded-xl border ${
                  status === 'pending' 
                    ? 'bg-yellow-600/20 border-yellow-500/30' 
                    : 'bg-green-600/20 border-green-500/30'
                }`}>
                  <div className="flex items-center gap-4">
                    {status === 'pending' ? (
                      <>
                        <Clock className="w-8 h-8 text-yellow-400 animate-spin" />
                        <div>
                          <div className="text-lg font-semibold text-yellow-300">Bridge in Progress</div>
                          <div className="text-yellow-200 text-sm">Processing via Circle CCTP...</div>
                          <div className="text-xs text-gray-400 mt-1">Tx: {txHash}</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-8 h-8 text-green-400" />
                        <div>
                          <div className="text-lg font-semibold text-green-300">Bridge Complete!</div>
                          <div className="text-green-200 text-sm">USDC successfully transferred to Arc</div>
                          <div className="text-xs text-gray-400 mt-1">Arc Wallet Balance: {amount} USDC</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Bridge Button */}
            <button
              onClick={handleBridge}
              disabled={status === 'pending' || !amount}
              className={`w-full py-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                status === 'confirmed'
                  ? 'bg-green-600 hover:bg-green-500 text-white'
                  : status === 'pending'
                  ? 'bg-yellow-600 cursor-not-allowed text-white'
                  : 'bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-500 hover:to-green-500 text-white transform hover:scale-105 shadow-lg'
              }`}
            >
              {status === 'pending' ? (
                <>
                  <Clock className="w-5 h-5 animate-spin" />
                  Bridging via CCTP...
                </>
              ) : status === 'confirmed' ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Bridge Complete
                </>
              ) : (
                <>
                  <GitBranch className="w-5 h-5" />
                  Bridge Now
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            {/* Info Footer */}
            <div className="mt-6 p-4 bg-[#24292e] border border-[#30363d] rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                <div className="text-sm text-gray-300">
                  <strong className="text-blue-300">Circle CCTP Bridge:</strong> Native USDC transfer with ~10-15 minute settlement time. 
                  No slippage, no liquidity pools - just native USDC across chains.
                </div>
              </div>
            </div>
          </div>

          {/* Next Step CTA */}
          {status === 'confirmed' && (
            <div className="mt-8 text-center">
              <a 
                href="/escrow" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#161b22] border border-teal-500 text-teal-300 rounded-xl font-semibold hover:bg-teal-500/10 transition-all"
              >
                <Wallet className="w-5 h-5" />
                Create Rental Escrow
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}