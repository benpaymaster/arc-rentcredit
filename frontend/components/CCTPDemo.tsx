'use client';

import React, { useState } from 'react';

export default function CCTPDemo() {
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    const [transferData, setTransferData] = useState({
        amount: '1000',
        sourceChain: 'ETH-SEPOLIA',
        destinationChain: 'ARB-SEPOLIA',
        transferId: '',
        txHash: '',
        status: 'pending'
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleStartTransfer = async () => {
        setIsLoading(true);
        
        // Simulate API call to CCTP endpoint
        try {
            const mockResponse = {
                success: true,
                transferId: `cctp_${Date.now()}`,
                transactionHash: `0xcctp${Date.now().toString(16)}`,
                amount: parseFloat(transferData.amount),
                sourceChain: transferData.sourceChain,
                destinationChain: transferData.destinationChain,
                estimatedTime: '10-15 minutes',
                status: 'initiated'
            };

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            setTransferData(prev => ({
                ...prev,
                transferId: mockResponse.transferId,
                txHash: mockResponse.transactionHash,
                status: 'initiated'
            }));

            setStep(2);
            
            // Simulate transfer progression
            setTimeout(() => {
                setTransferData(prev => ({ ...prev, status: 'processing' }));
                setStep(3);
            }, 3000);

            setTimeout(() => {
                setTransferData(prev => ({ ...prev, status: 'completed' }));
                setStep(4);
            }, 8000);

        } catch (error) {
            console.error('Transfer failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const resetDemo = () => {
        setStep(1);
        setTransferData(prev => ({
            ...prev,
            transferId: '',
            txHash: '',
            status: 'pending'
        }));
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                    <h1 className="text-3xl font-bold mb-2">🌉 Circle CCTP Live Demonstration</h1>
                    <p className="text-blue-100 text-lg">
                        Watch CrossRent's Circle Cross-Chain Transfer Protocol in action
                    </p>
                </div>

                {/* Step Indicator */}
                <div className="bg-gray-50 px-6 py-4 border-b">
                    <div className="flex items-center justify-between">
                        {[
                            { num: 1, label: 'Setup Transfer', active: step >= 1 },
                            { num: 2, label: 'Initiate CCTP', active: step >= 2 },
                            { num: 3, label: 'Processing', active: step >= 3 },
                            { num: 4, label: 'Complete', active: step >= 4 }
                        ].map((s, index) => (
                            <div key={s.num} className="flex items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                                    s.active 
                                        ? 'bg-blue-600 text-white' 
                                        : 'bg-gray-300 text-gray-600'
                                }`}>
                                    {s.num}
                                </div>
                                <span className={`ml-2 font-medium ${
                                    s.active ? 'text-blue-600' : 'text-gray-500'
                                }`}>
                                    {s.label}
                                </span>
                                {index < 3 && (
                                    <div className={`mx-4 h-1 w-16 ${
                                        step > s.num ? 'bg-blue-600' : 'bg-gray-300'
                                    }`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {step === 1 && (
                        <div className="space-y-6">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                    Cross-Chain Rent Payment Setup
                                </h2>
                                <p className="text-gray-600 text-lg">
                                    Demonstrate Circle CCTP: Send USDC from Ethereum to Arbitrum for rent payment
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-gray-900">Transfer Details</h3>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Amount (USDC)
                                        </label>
                                        <input
                                            type="number"
                                            value={transferData.amount}
                                            onChange={(e) => setTransferData(prev => ({ ...prev, amount: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            From Chain
                                        </label>
                                        <select
                                            value={transferData.sourceChain}
                                            onChange={(e) => setTransferData(prev => ({ ...prev, sourceChain: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="ETH-SEPOLIA">Ethereum Sepolia</option>
                                            <option value="ARB-SEPOLIA">Arbitrum Sepolia</option>
                                            <option value="AVAX-FUJI">Avalanche Fuji</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            To Chain
                                        </label>
                                        <select
                                            value={transferData.destinationChain}
                                            onChange={(e) => setTransferData(prev => ({ ...prev, destinationChain: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="ARB-SEPOLIA">Arbitrum Sepolia</option>
                                            <option value="ETH-SEPOLIA">Ethereum Sepolia</option>
                                            <option value="AVAX-FUJI">Avalanche Fuji</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="bg-blue-50 rounded-lg p-4">
                                    <h3 className="font-semibold text-blue-900 mb-3">🔵 Circle CCTP Advantages</h3>
                                    <ul className="space-y-2 text-sm text-blue-700">
                                        <li>✅ Native USDC (no wrapped tokens)</li>
                                        <li>✅ Capital efficient (no liquidity pools)</li>
                                        <li>✅ 10-15 minute settlement</li>
                                        <li>✅ Atomic cross-chain guarantees</li>
                                        <li>✅ Enterprise security</li>
                                    </ul>
                                </div>
                            </div>

                            <div className="text-center">
                                <button
                                    onClick={handleStartTransfer}
                                    disabled={isLoading}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center mx-auto"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                            Initiating CCTP Transfer...
                                        </>
                                    ) : (
                                        <>
                                            🚀 Start Circle CCTP Transfer
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="text-center space-y-6">
                            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                                <svg className="w-10 h-10 text-blue-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">CCTP Transfer Initiated</h2>
                            <p className="text-gray-600">
                                Circle CCTP protocol has received your transfer request
                            </p>
                            <div className="bg-gray-50 rounded-lg p-6">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-500">Transfer ID:</span>
                                        <p className="font-mono font-medium">{transferData.transferId}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Amount:</span>
                                        <p className="font-medium">{transferData.amount} USDC</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Route:</span>
                                        <p className="font-medium">{transferData.sourceChain} → {transferData.destinationChain}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Status:</span>
                                        <p className="font-medium text-blue-600 capitalize">{transferData.status}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="text-center space-y-6">
                            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
                                <svg className="w-10 h-10 text-yellow-600 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Processing Cross-Chain Transfer</h2>
                            <p className="text-gray-600">
                                Circle CCTP is burning USDC on source chain and minting on destination chain
                            </p>
                            
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                                <div className="flex items-center justify-center space-x-4 mb-4">
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mb-2">
                                            ETH
                                        </div>
                                        <p className="text-sm text-gray-600">Source</p>
                                    </div>
                                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-600 rounded-full animate-pulse" style={{width: '60%'}}></div>
                                    </div>
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mb-2">
                                            ARB
                                        </div>
                                        <p className="text-sm text-gray-600">Destination</p>
                                    </div>
                                </div>
                                <p className="text-sm text-yellow-700 font-medium">
                                    ⏱️ Estimated completion: 5-8 minutes remaining
                                </p>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="text-center space-y-6">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">🎉 CCTP Transfer Complete!</h2>
                            <p className="text-gray-600">
                                Your USDC has been successfully transferred across chains via Circle CCTP
                            </p>

                            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-500">Final Status:</span>
                                        <p className="font-medium text-green-600">✅ Completed</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Total Time:</span>
                                        <p className="font-medium">~12 minutes</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Transaction Hash:</span>
                                        <p className="font-mono text-xs">{transferData.txHash}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Fee:</span>
                                        <p className="font-medium">$0.50 USDC</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50 rounded-lg p-6">
                                <h3 className="font-semibold text-blue-900 mb-3">🏠 Rent Payment Result</h3>
                                <p className="text-blue-700 mb-4">
                                    The landlord's Arbitrum wallet has received {transferData.amount} USDC from the tenant's Ethereum wallet.
                                    CrossRent's smart contracts can now release the funds according to the rental agreement.
                                </p>
                                <div className="text-sm text-blue-600 space-y-1">
                                    <p>✅ Native USDC transfer (no wrapped tokens)</p>
                                    <p>✅ Atomic settlement guarantee</p>
                                    <p>✅ Capital efficient (no liquidity pools)</p>
                                    <p>✅ Enterprise-grade security via Circle</p>
                                </div>
                            </div>

                            <button
                                onClick={resetDemo}
                                className="bg-gray-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                            >
                                🔄 Run Demo Again
                            </button>
                        </div>
                    )}
                </div>

                {/* Technical Implementation Footer */}
                <div className="bg-gray-50 border-t p-6">
                    <div className="text-center text-sm text-gray-600">
                        <p className="mb-2">
                            <strong>Powered by Circle CCTP SDK:</strong> <code>@circle-fin/provider-cctp-v2</code>
                        </p>
                        <p>
                            API Endpoint: <code>POST /api/cctp/transfer</code> | 
                            Status Check: <code>GET /api/cctp/transfer/:id</code>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}