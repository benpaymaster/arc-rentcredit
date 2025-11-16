'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUpDown, Wallet } from 'lucide-react';
import Navigation from '../../components/Navigation';

export default function BridgePage() {
  const [fromChain, setFromChain] = useState('Ethereum');
  const [toChain, setToChain] = useState('Arc Testnet');
  const [amount, setAmount] = useState('1000.00');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<Array<{message: string, type: 'pending' | 'active' | 'success' | 'error'}>>([
    { message: 'Waiting for wallet connection...', type: 'pending' }
  ]);
  const [userAddress] = useState("0xMockUserAddressForBridgeKitTesting");
  const [arcBalance, setArcBalance] = useState('0.00');

  const chains = {
    'Ethereum': { name: 'Ethereum Mainnet', icon: 'Ξ', color: '#627EEA' },
    'Polygon': { name: 'Polygon PoS', icon: '⬢', color: '#8247E5' },
    'Avalanche': { name: 'Avalanche C-Chain', icon: '❄️', color: '#E84142' },
    'Base': { name: 'Base', icon: '🅱️', color: '#0052FF' },
    'Arc Testnet': { name: 'Arc Testnet', icon: '⚡', color: '#2e8b57' },
  };

  // Auto-connect wallet on load
  useEffect(() => {
    mockConnectWallet();
  }, []);

  const mockConnectWallet = () => {
    setStatus([{ message: 'Connecting to wallet...', type: 'active' }]);
    setTimeout(() => {
      setIsConnected(true);
      setStatus([
        { message: `Wallet connected: ${userAddress.substring(0, 10)}...`, type: 'success' },
        { message: 'Ready to bridge!', type: 'pending' }
      ]);
    }, 1000);
  };

  const swapChainsIfEqual = (newFrom?: string, newTo?: string) => {
    const currentFrom = newFrom || fromChain;
    const currentTo = newTo || toChain;
    
    if (currentFrom === currentTo) {
      if (currentFrom === 'Arc Testnet') {
        setToChain('Ethereum');
      } else {
        setToChain('Arc Testnet');
      }
    }
  };

  const handleFromChainChange = (value: string) => {
    setFromChain(value);
    swapChainsIfEqual(value, toChain);
  };

  const handleToChainChange = (value: string) => {
    setToChain(value);
    swapChainsIfEqual(fromChain, value);
  };

  const manualSwap = () => {
    const temp = fromChain;
    setFromChain(toChain);
    setToChain(temp);
  };

  const updateStatus = (message: string, statusIndex: number, type: 'pending' | 'active' | 'success' | 'error' = 'pending') => {
    setStatus(prev => {
      const newStatus = [...prev];
      if (newStatus[statusIndex]) {
        newStatus[statusIndex] = { message, type };
      } else {
        newStatus.push({ message, type });
      }
      return newStatus;
    });
  };

  const mockBridgeStep = (stepIndex: number, message: string, duration = 3000): Promise<void> => {
    return new Promise(resolve => {
      updateStatus(message, stepIndex, 'active');
      setTimeout(() => {
        updateStatus(message.replace('...', '... Complete!'), stepIndex, 'success');
        resolve();
      }, duration + (Math.random() * 1000));
    });
  };

  const initiateBridge = async () => {
    if (!isConnected) {
      updateStatus("Please connect your wallet first.", 0, 'error');
      return;
    }

    const amountNum = parseFloat(amount);
    if (amountNum <= 0 || isNaN(amountNum)) {
      updateStatus("Please enter a valid amount to bridge.", 1, 'error');
      return;
    }

    setIsLoading(true);
    setStatus([]);
    let step = 0;

    const logStep = (message: string, type: 'pending' | 'active' | 'success' | 'error' = 'active') => updateStatus(message, step++, type);

    logStep(`Starting transfer of ${amountNum.toFixed(2)} USDC from ${fromChain} to ${toChain}...`, 'active');

    try {
      await mockBridgeStep(step++, `1. Approving USDC on ${fromChain} (User Wallet Action Required)...`);
      await mockBridgeStep(step++, `2. Burning USDC on ${fromChain}...`);
      await mockBridgeStep(step++, `3. Circle Attestation in progress (waiting for cryptographic proof)...`, 8000);
      await mockBridgeStep(step++, `4. Relaying and Minting USDC on ${toChain}...`);
      
      logStep(`🎉 Success! ${amountNum.toFixed(2)} USDC is now available on ${toChain}.`, 'success');

    } catch (error: any) {
      console.error("Bridge Error:", error);
      logStep(`❌ Bridge Failed: ${error.message || 'Check console for details.'}`, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-5 pt-20">
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 md:p-8 max-w-[480px] w-full shadow-[0_10px_25px_rgba(0,0,0,0.5)] text-white">
          <h1 className="text-3xl font-bold text-center text-teal-300 mb-2">USDC Cross-Chain Bridge</h1>
          <p className="text-sm text-center text-gray-400 mb-6">Powered by Circle Bridge Kit & Arc</p>

          {/* Chain Selection Inputs */}
          <div className="space-y-6">
            {/* Source Chain */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">From Network</label>
              <div className="relative">
                <select 
                  value={fromChain}
                  onChange={(e) => handleFromChainChange(e.target.value)}
                  className="w-full p-3 bg-[#24292e] border border-[#30363d] rounded-lg focus:ring-teal-500 focus:border-teal-500 text-lg appearance-none cursor-pointer text-white"
                >
                  {Object.entries(chains).map(([key, chain]) => (
                    <option key={key} value={key}>{chain.name}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Swap Button / Flow Visualization */}
            <div className="flex items-center justify-center -my-2">
              <button 
                onClick={manualSwap}
                className="p-2 rounded-full bg-gray-600 hover:bg-gray-500 transition-colors"
                title="Swap Source and Destination"
              >
                <svg className="w-5 h-5 text-white transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                </svg>
              </button>
            </div>

            {/* Destination Chain */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">To Network</label>
              <div className="relative">
                <select 
                  value={toChain}
                  onChange={(e) => handleToChainChange(e.target.value)}
                  className="w-full p-3 bg-[#24292e] border border-[#30363d] rounded-lg focus:ring-teal-500 focus:border-teal-500 text-lg appearance-none cursor-pointer text-white"
                >
                  {Object.entries(chains).map(([key, chain]) => (
                    <option key={key} value={key}>{chain.name}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Amount Input */}
          <div className="mt-6">
            <label className="block text-sm font-medium mb-1 text-gray-300">Amount (USDC)</label>
            <div className="relative">
              <input 
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="0.01"
                min="1"
                className="w-full p-3 pr-16 bg-[#24292e] border border-[#30363d] rounded-lg text-lg focus:ring-teal-500 focus:border-teal-500 text-white"
                placeholder="100.00"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-400 font-semibold">USDC</span>
              </div>
            </div>
            <p className="text-xs mt-1 text-gray-500">Estimated time: ~2 minutes (Fast Bridge)</p>
          </div>

          {/* Bridge Button */}
          <button 
            onClick={initiateBridge}
            disabled={!isConnected || isLoading}
            className="mt-6 w-full p-4 text-white font-bold rounded-xl shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0"
            style={{backgroundColor: '#2e8b57'}}
            onMouseEnter={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#3cb371')}
            onMouseLeave={(e) => !isLoading && (e.currentTarget.style.backgroundColor = '#2e8b57')}
          >
            <span>
              {isConnected ? (isLoading ? "Initiating Bridge..." : "Start USDC Bridge") : "Connect Wallet to Bridge"}
            </span>
            {isLoading && (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white ml-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
          </button>

          {/* Status / Feedback Box */}
          <div className="mt-6 p-4 rounded-lg bg-gray-700 text-sm text-gray-200 min-h-[100px] transition-all duration-300">
            <p className="font-semibold mb-1">Bridge Status:</p>
            <ul className="space-y-2">
              {status.map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    item.type === 'success' ? 'bg-green-500' :
                    item.type === 'error' ? 'bg-red-500' :
                    item.type === 'active' ? 'bg-yellow-500 animate-pulse' :
                    'bg-gray-500'
                  }`}></span>
                  {item.message}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

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
            Bridge USDC to <span className="arc-gradient-text">Arc</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transfer USDC from any chain to Arc using Circle's Cross-Chain Transfer Protocol
          </p>
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