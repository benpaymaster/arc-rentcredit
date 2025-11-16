"use client";

import { useState } from 'react';
import { ArrowRight, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { CIRCLE_CONFIG } from '@/lib/addresses';

interface BridgeComponentProps {
  onBridgeComplete?: (txHash: string) => void;
  targetAmount?: number;
}

const SUPPORTED_CHAINS = [
  { id: 1, name: "Ethereum", icon: "🟦", rpc: "https://mainnet.infura.io/v3/..." },
  { id: 10, name: "Optimism", icon: "🔴", rpc: "https://mainnet.optimism.io" },
  { id: 137, name: "Polygon", icon: "🟣", rpc: "https://polygon-rpc.com" },
  { id: 42161, name: "Arbitrum", icon: "🔵", rpc: "https://arb1.arbitrum.io/rpc" },
  { id: 43114, name: "Avalanche", icon: "🔺", rpc: "https://api.avax.network/ext/bc/C/rpc" }
];

const ARC_CHAIN = { id: 42161, name: "Arc", icon: "🌟" };

export default function CircleBridgeComponent({ onBridgeComplete, targetAmount = 5000 }: BridgeComponentProps) {
  const [sourceChain, setSourceChain] = useState(SUPPORTED_CHAINS[0]);
  const [amount, setAmount] = useState(targetAmount.toString());
  const [bridgeStatus, setBridgeStatus] = useState<'idle' | 'estimating' | 'confirming' | 'bridging' | 'success' | 'error'>('idle');
  const [txHash, setTxHash] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('~3-5 minutes');
  const [fees, setFees] = useState({ bridge: 0.5, gas: 0.02 });

  const estimateBridge = async () => {
    setBridgeStatus('estimating');
    
    // Simulate CCTP estimation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setEstimatedTime(`~${Math.floor(Math.random() * 3) + 3}-${Math.floor(Math.random() * 3) + 5} minutes`);
    setFees({
      bridge: Math.random() * 0.5 + 0.3,
      gas: Math.random() * 0.03 + 0.01
    });
    
    setBridgeStatus('idle');
  };

  const initiateBridge = async () => {
    setBridgeStatus('confirming');
    
    // Simulate user confirmation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setBridgeStatus('bridging');
    
    // Simulate CCTP bridge transaction
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    const mockTxHash = `0x${Math.random().toString(16).substr(2, 64)}`;
    setTxHash(mockTxHash);
    setBridgeStatus('success');
    
    onBridgeComplete?.(mockTxHash);
  };

  const getStatusMessage = () => {
    switch (bridgeStatus) {
      case 'estimating': return 'Calculating optimal route...';
      case 'confirming': return 'Confirm transaction in your wallet...';
      case 'bridging': return 'Bridging USDC via Circle CCTP...';
      case 'success': return 'Bridge completed successfully!';
      case 'error': return 'Bridge failed. Please try again.';
      default: return 'Ready to bridge USDC to Arc';
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Bridge USDC to Arc</h2>
        <p className="text-gray-600">Powered by Circle CCTP & Bridge Kit</p>
      </div>

      {/* Status Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-center space-x-2 mb-2">
          {bridgeStatus === 'success' ? (
            <CheckCircle className="text-green-500" size={20} />
          ) : bridgeStatus === 'error' ? (
            <AlertCircle className="text-red-500" size={20} />
          ) : bridgeStatus === 'bridging' || bridgeStatus === 'estimating' || bridgeStatus === 'confirming' ? (
            <Loader2 className="animate-spin text-blue-500" size={20} />
          ) : null}
          <span className={`text-sm font-medium ${
            bridgeStatus === 'success' ? 'text-green-600' : 
            bridgeStatus === 'error' ? 'text-red-600' : 
            'text-gray-600'
          }`}>
            {getStatusMessage()}
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`bg-blue-500 h-2 rounded-full transition-all duration-300 ${
              bridgeStatus === 'idle' ? 'w-0' :
              bridgeStatus === 'estimating' ? 'w-1/4' :
              bridgeStatus === 'confirming' ? 'w-1/2' :
              bridgeStatus === 'bridging' ? 'w-3/4' :
              bridgeStatus === 'success' ? 'w-full' : 'w-0'
            }`}
          />
        </div>
      </div>

      {bridgeStatus !== 'success' && (
        <>
          {/* Chain Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Chain
            </label>
            <select 
              value={sourceChain.id}
              onChange={(e) => setSourceChain(SUPPORTED_CHAINS.find(c => c.id === parseInt(e.target.value))!)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {SUPPORTED_CHAINS.map(chain => (
                <option key={chain.id} value={chain.id}>
                  {chain.icon} {chain.name}
                </option>
              ))}
            </select>
          </div>

          {/* Bridge Route Visualization */}
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl mb-1">{sourceChain.icon}</div>
                <div className="text-sm font-medium">{sourceChain.name}</div>
                <div className="text-xs text-gray-600">USDC</div>
              </div>
              
              <ArrowRight className="text-gray-400" size={24} />
              
              <div className="text-center">
                <div className="text-2xl mb-1">{ARC_CHAIN.icon}</div>
                <div className="text-sm font-medium">{ARC_CHAIN.name}</div>
                <div className="text-xs text-gray-600">USDC</div>
              </div>
            </div>
          </div>

          {/* Amount Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (USDC)
            </label>
            <div className="relative">
              <input 
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg pr-16 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="5000"
              />
              <div className="absolute right-3 top-3 text-gray-500 text-sm">USDC</div>
            </div>
          </div>

          {/* Fee Estimation */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-3">Bridge Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-700">Bridge Fee:</span>
                <span className="font-medium">${fees.bridge.toFixed(3)} USDC</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Gas Fee:</span>
                <span className="font-medium">${fees.gas.toFixed(3)} ETH</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Estimated Time:</span>
                <span className="font-medium">{estimatedTime}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-medium">
                <span className="text-blue-900">You'll Receive:</span>
                <span className="text-blue-900">{(parseFloat(amount) - fees.bridge).toFixed(2)} USDC</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {bridgeStatus === 'idle' && (
              <>
                <button 
                  onClick={estimateBridge}
                  className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Estimate Bridge Cost
                </button>
                <button 
                  onClick={initiateBridge}
                  disabled={!amount || parseFloat(amount) <= 0}
                  className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Bridge USDC via CCTP
                </button>
              </>
            )}
            
            {(bridgeStatus === 'confirming' || bridgeStatus === 'bridging') && (
              <button 
                disabled
                className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium opacity-50 cursor-not-allowed"
              >
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="animate-spin" size={16} />
                  <span>Processing...</span>
                </div>
              </button>
            )}
          </div>
        </>
      )}

      {bridgeStatus === 'success' && (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="text-green-500" size={32} />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Bridge Successful!
            </h3>
            <p className="text-gray-600 mb-4">
              {(parseFloat(amount) - fees.bridge).toFixed(2)} USDC has been bridged to Arc blockchain
            </p>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-600 mb-1">Transaction Hash:</div>
              <div className="font-mono text-xs text-blue-600 break-all">{txHash}</div>
            </div>
          </div>

          <button 
            onClick={() => window.open(`${CIRCLE_CONFIG.CCTP_ENDPOINT}/tx/${txHash}`, '_blank')}
            className="w-full py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            View on Circle Explorer
          </button>
        </div>
      )}

      {/* Circle Branding */}
      <div className="mt-6 text-center">
        <div className="text-xs text-gray-500">
          Secured by <span className="font-semibold">Circle CCTP</span> • Cross-Chain Transfer Protocol
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Native USDC • No wrapping • Instant finality
        </div>
      </div>
    </div>
  );
}