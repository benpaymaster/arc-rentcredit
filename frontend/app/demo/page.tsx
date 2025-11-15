"use client";

import { useState, useEffect } from 'react';
import { ArrowRight, Wallet, GitBranch, DollarSign, Shield, Award, CheckCircle } from 'lucide-react';
import { ARC_CONTRACTS, DEMO_DATA } from '@/lib/addresses';

const DEMO_STEPS = [
  { id: 1, title: "Connect Arc Wallet", icon: Wallet },
  { id: 2, title: "Bridge USDC to Arc", icon: GitBranch },
  { id: 3, title: "Create Rental Escrow", icon: DollarSign },
  { id: 4, title: "Automated Payment", icon: Shield },
  { id: 5, title: "Reputation Update", icon: Award }
];

export default function StudentRentalDemo() {
  const [currentStep, setCurrentStep] = useState(1);
  const [walletAddress, setWalletAddress] = useState('');
  const [bridgeAmount, setBridgeAmount] = useState('5000');
  const [escrowId, setEscrowId] = useState('');
  const [reputationScore, setReputationScore] = useState(750);

  // Simulate Arc wallet connection
  const connectArcWallet = () => {
    const mockAddress = "0x742d35Cc6634C0532925a3b8D0F62292C4e5B74e";
    setWalletAddress(mockAddress);
    setCurrentStep(2);
  };

  // Simulate USDC bridge
  const bridgeUSDC = () => {
    setCurrentStep(3);
  };

  // Simulate escrow creation
  const createEscrow = () => {
    const mockEscrowId = "ESC-" + Date.now().toString().slice(-6);
    setEscrowId(mockEscrowId);
    setCurrentStep(4);
  };

  // Simulate automated payment
  const processPayment = () => {
    setCurrentStep(5);
  };

  // Simulate reputation update
  const updateReputation = () => {
    setReputationScore(780);
    // Complete demo
  };

  return (
    <div className="min-h-screen bg-[#0d1117] relative overflow-hidden p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-600/10 via-blue-600/10 to-green-600/10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-teal-300 to-green-300 bg-clip-text text-transparent">
              Cross Rent
            </span>{" "}
            on Arc Blockchain
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            International Student Rental Deposit Demo
          </p>
          <p className="text-lg text-teal-300 font-semibold mb-4">
            Global Rent. Universal Credit.
          </p>
          <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-3 max-w-2xl mx-auto">
            <p className="text-sm text-gray-300">
              <strong className="text-teal-300">Demo Story:</strong> Sara from Singapore pays her Boston rental deposit using USDC on Arc
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            {DEMO_STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`
                    w-12 h-12 rounded-full border-2 flex items-center justify-center mb-2
                    ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 
                      isActive ? 'bg-blue-500 border-blue-500 text-white' :
                      'bg-gray-200 border-gray-300 text-gray-500'}
                  `}>
                    {isCompleted ? <CheckCircle size={20} /> : <Icon size={20} />}
                  </div>
                  <span className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
                    {step.title}
                  </span>
                  {index < DEMO_STEPS.length - 1 && (
                    <ArrowRight className="absolute left-1/2 transform -translate-x-1/2 text-gray-400 hidden md:block" size={16} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Panel - Demo Interface */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-white">Demo Interface</h2>
            
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <Wallet className="mx-auto mb-4 text-teal-400" size={48} />
                  <h3 className="text-xl font-semibold mb-4 text-white">Connect Arc Wallet</h3>
                  <p className="text-gray-300 mb-6">
                    Use Arc's developer-controlled wallet infrastructure for seamless UX
                  </p>
                  <button 
                    onClick={connectArcWallet}
                    className="bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-500 hover:to-green-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                  >
                    Connect Arc Wallet
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <GitBranch className="mx-auto mb-4 text-green-400" size={48} />
                  <h3 className="text-xl font-semibold mb-4 text-white">Bridge USDC to Arc</h3>
                  <p className="text-gray-300 mb-4">Connected: {walletAddress}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Source Chain
                      </label>
                      <select className="w-full p-3 bg-[#24292e] border border-[#30363d] text-white rounded-lg focus:border-teal-500 focus:outline-none">
                        <option value="ethereum">Ethereum Mainnet</option>
                        <option value="arbitrum">Arbitrum</option>
                        <option value="polygon">Polygon</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Amount (USDC)
                      </label>
                      <input 
                        type="number"
                        value={bridgeAmount}
                        onChange={(e) => setBridgeAmount(e.target.value)}
                        className="w-full p-3 bg-[#24292e] border border-[#30363d] text-white rounded-lg focus:border-teal-500 focus:outline-none"
                        placeholder="5000"
                      />
                    </div>
                    
                    <button 
                      onClick={bridgeUSDC}
                      className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white py-3 rounded-lg font-semibold transition-all duration-300"
                    >
                      Bridge with Circle CCTP
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <DollarSign className="mx-auto mb-4 text-purple-500" size={48} />
                  <h3 className="text-xl font-semibold mb-4">Create Rental Escrow</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Landlord Address
                      </label>
                      <input 
                        type="text"
                        value={DEMO_DATA.LANDLORD.address}
                        readOnly
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Deposit (USDC)
                        </label>
                        <input 
                          type="number"
                          value={DEMO_DATA.PROPERTY.deposit}
                          readOnly
                          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Monthly Rent (USDC)
                        </label>
                        <input 
                          type="number"
                          value={DEMO_DATA.PROPERTY.rent}
                          readOnly
                          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Property Address
                      </label>
                      <input 
                        type="text"
                        value={DEMO_DATA.PROPERTY.address}
                        readOnly
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                      />
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 mb-2">Automation Settings</h4>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2" />
                          <span className="text-sm">Require inspection confirmation</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="mr-2" />
                          <span className="text-sm">Auto-release after grace period</span>
                        </label>
                        <div className="text-sm text-blue-600">
                          Max damage threshold: $500 USDC • Grace period: 3 days
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={createEscrow}
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-semibold"
                    >
                      Create Programmable Escrow
                    </button>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center">
                  <Shield className="mx-auto mb-4 text-orange-500" size={48} />
                  <h3 className="text-xl font-semibold mb-4">Automated Payment Logic</h3>
                  <p className="text-gray-600 mb-4">Escrow ID: {escrowId}</p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Deposit Locked:</span>
                        <span className="font-semibold text-green-600">$5,000 USDC ✓</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Rent:</span>
                        <span className="font-semibold text-blue-600">$2,500 USDC</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="font-semibold text-orange-600">Pending Release</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-orange-800 mb-2">Automation Triggers</h4>
                    <div className="text-sm text-orange-700 space-y-1">
                      <div>✓ Inspection completed</div>
                      <div>✓ No damage reported</div>
                      <div>⏱ Grace period: 2 days remaining</div>
                    </div>
                  </div>

                  <button 
                    onClick={processPayment}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold"
                  >
                    Simulate Auto-Release
                  </button>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="text-center">
                  <Award className="mx-auto mb-4 text-yellow-500" size={48} />
                  <h3 className="text-xl font-semibold mb-4">Reputation Update</h3>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">Transaction Complete!</h4>
                    <div className="text-sm text-yellow-700">
                      ✓ Deposit released to tenant<br/>
                      ✓ Reputation NFT updated<br/>
                      ✓ Credit score increased
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span>New Reputation Score:</span>
                      <span className="text-2xl font-bold text-green-600">{reputationScore}</span>
                    </div>
                    <div className="text-sm text-green-600 mt-2">
                      +30 points for successful rental completion
                    </div>
                  </div>

                  <button 
                    onClick={updateReputation}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold"
                  >
                    Complete Demo
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Context & Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Demo Context</h2>
            
            <div className="space-y-6">
              {/* User Profile */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">👩‍🎓 Student Profile</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>Name:</strong> {DEMO_DATA.STUDENT.name}</div>
                  <div><strong>University:</strong> {DEMO_DATA.STUDENT.university}</div>
                  <div><strong>Origin:</strong> {DEMO_DATA.STUDENT.country}</div>
                  <div><strong>Current Score:</strong> {reputationScore}/1000</div>
                </div>
              </div>

              {/* Property Details */}
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">🏠 Property Details</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>ID:</strong> {DEMO_DATA.PROPERTY.id}</div>
                  <div><strong>Address:</strong> {DEMO_DATA.PROPERTY.address}</div>
                  <div><strong>Landlord:</strong> {DEMO_DATA.LANDLORD.name}</div>
                  <div><strong>Company:</strong> {DEMO_DATA.LANDLORD.company}</div>
                </div>
              </div>

              {/* Arc Features */}
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">🚀 Arc Blockchain Features</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center">
                    <CheckCircle size={16} className="text-green-500 mr-2" />
                    <span>USDC native integration</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle size={16} className="text-green-500 mr-2" />
                    <span>Circle CCTP cross-chain bridge</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle size={16} className="text-green-500 mr-2" />
                    <span>Developer-controlled wallets</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle size={16} className="text-green-500 mr-2" />
                    <span>Programmable escrow automation</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle size={16} className="text-green-500 mr-2" />
                    <span>Dynamic reputation SBTs</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle size={16} className="text-green-500 mr-2" />
                    <span>ERC4626 yield vaults</span>
                  </div>
                </div>
              </div>

              {/* Contract Addresses */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">📋 Deployed Contracts</h3>
                <div className="space-y-2 text-xs font-mono">
                  <div>
                    <div className="text-gray-600">Rental Escrow:</div>
                    <div className="text-blue-600">{ARC_CONTRACTS.RENTAL_ESCROW}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Reputation SBT:</div>
                    <div className="text-blue-600">{ARC_CONTRACTS.REPUTATION_SBT}</div>
                  </div>
                  <div>
                    <div className="text-gray-600">Bridge Integration:</div>
                    <div className="text-blue-600">{ARC_CONTRACTS.CROSSRENT_BRIDGE}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>CrossRent Demo - Built on Arc Blockchain • Powered by Circle Infrastructure</p>
        </div>
      </div>
    </div>
  );
}