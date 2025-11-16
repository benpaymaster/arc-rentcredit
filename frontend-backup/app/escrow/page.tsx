'use client';

import React, { useState } from 'react';
import { Shield, Clock, CheckCircle, Settings, Home, ArrowRight, AlertTriangle, DollarSign, TrendingUp } from 'lucide-react';
import Navigation from '../../components/Navigation';

export default function EscrowPage() {
  const [formData, setFormData] = useState({
    landlordAddress: '0x742d35Cc6634C0532925a3b8D0F62292C4e5B74e',
    propertyAddress: '123 Student St, Boston, MA',
    depositAmount: '5000',
    duration: '12',
    damageThreshold: '1000',
    requireInspection: true,
    requireTenantConfirmation: true,
    autoReleaseRent: true
  });

  const [isCreating, setIsCreating] = useState(false);
  const [escrowCreated, setEscrowCreated] = useState(false);
  const [escrowId, setEscrowId] = useState('');

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const createEscrow = async () => {
    setIsCreating(true);
    
    // Simulate escrow creation
    setTimeout(() => {
      setEscrowCreated(true);
      setEscrowId('ESC-' + Math.random().toString(36).substr(2, 6).toUpperCase());
      setIsCreating(false);
    }, 2000);
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
            <Shield className="w-4 h-4 text-teal-400" />
            Smart Contracts • Automated Releases • On-Chain Security
            <Settings className="w-4 h-4 text-teal-400" />
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4">
            Create Rental <span className="bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">Escrow</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Smart contracts ensure 100% payment guarantee for landlords, flexible terms for tenants
          </p>

          {/* Key Problems We Solve */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="bg-red-600/10 border border-red-500/30 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-red-400 mb-4 text-center">❌ Current Rental Problems</h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-2">
                  <div className="text-gray-300">• Landlords force long-term leases (12+ months)</div>
                  <div className="text-gray-300">• Tenants lose deposits unfairly</div>
                  <div className="text-gray-300">• No payment guarantees for landlords</div>
                </div>
                <div className="space-y-2">
                  <div className="text-gray-300">• No tenant credit building</div>
                  <div className="text-gray-300">• Disputes take months to resolve</div>
                  <div className="text-gray-300">• High security deposits required</div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#161b22] border border-green-500/30 rounded-xl p-6">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-green-400 mb-3">✅ Tenant Benefits</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div>• <strong>Flexible terms:</strong> 6-month options available</div>
                  <div>• <strong>Build credit:</strong> On-chain reputation score</div>
                  <div>• <strong>Earn yield:</strong> 4.2% APY on USDC deposits</div>
                  <div>• <strong>Lower deposits:</strong> High reputation = 50% less required</div>
                  <div className="bg-green-600/20 border border-green-500/30 rounded p-2 mt-2">
                    <strong>🏠 Future Property Purchase:</strong><br/>
                    800+ reputation score = 1-2% lower mortgage rates<br/>
                    900+ reputation score = Premium lender access
                  </div>
                </div>
              </div>

              <div className="bg-[#161b22] border border-blue-500/30 rounded-xl p-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-blue-400 mb-3">✅ Landlord Benefits</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div>• <strong>100% payment guarantee:</strong> Smart contract enforcement</div>
                  <div>• <strong>Risk insurance:</strong> Shared risk pool coverage</div>
                  <div>• <strong>Instant payments:</strong> Automated monthly releases</div>
                  <div>• <strong>Tenant screening:</strong> On-chain reputation</div>
                  <div>• <strong>Dispute protection:</strong> Neutral arbitration</div>
                </div>
              </div>

              <div className="bg-[#161b22] border border-yellow-500/30 rounded-xl p-6">
                <div className="w-12 h-12 bg-yellow-600 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-yellow-400 mb-3">💰 USDC Financial Gains</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div>• <strong>USDC yields:</strong> 4.2% APY on all deposits (stable value)</div>
                  <div>• <strong>Mortgage discounts:</strong> Up to 2% lower interest rates</div>
                  <div>• <strong>Deposit reduction:</strong> 800+ score = 50% lower deposits</div>
                  <div>• <strong>Premium access:</strong> Exclusive lender partnerships</div>
                  <div className="bg-yellow-600/20 border border-yellow-500/30 rounded p-2 mt-2">
                    <strong>📊 Real Example:</strong><br/>
                    $300k house purchase with 800+ score:<br/>
                    <span className="text-green-300">Save $6,000/year on mortgage</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Escrow Form */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-8 shadow-2xl">
            
            {!escrowCreated ? (
              <>
                {/* Basic Information */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Home className="w-5 h-5 text-teal-400" />
                    Property & Participants
                  </h3>
                  
                  <div className="grid gap-6">
                    {/* Landlord Address */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Landlord Address *</label>
                      <input
                        type="text"
                        value={formData.landlordAddress}
                        onChange={(e) => handleInputChange('landlordAddress', e.target.value)}
                        className="w-full p-4 bg-[#24292e] border border-[#30363d] rounded-xl text-white font-mono text-sm focus:border-teal-500 focus:outline-none"
                        placeholder="0x..."
                      />
                    </div>

                    {/* Property Address */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Property Address (Optional)</label>
                      <input
                        type="text"
                        value={formData.propertyAddress}
                        onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                        className="w-full p-4 bg-[#24292e] border border-[#30363d] rounded-xl text-white focus:border-teal-500 focus:outline-none"
                        placeholder="123 Main St, City, State"
                      />
                    </div>
                  </div>
                </div>

                {/* Financial Terms */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-teal-400" />
                    Financial Terms
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Deposit Amount */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Deposit Amount (USDC) *</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={formData.depositAmount}
                          onChange={(e) => handleInputChange('depositAmount', e.target.value)}
                          className="w-full p-4 pr-16 bg-[#24292e] border border-[#30363d] rounded-xl text-white font-bold text-lg focus:border-teal-500 focus:outline-none"
                          placeholder="5000"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">USDC</span>
                      </div>
                    </div>

                    {/* Duration */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Duration (Months) * 
                        <span className="text-teal-400 text-xs ml-2">⚡ Flexible Terms Available</span>
                      </label>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {['6', '9', '12'].map((months) => (
                          <button
                            key={months}
                            onClick={() => handleInputChange('duration', months)}
                            className={`p-3 rounded-lg border-2 transition-all text-center ${
                              formData.duration === months
                                ? 'border-teal-500 bg-teal-500/10 text-teal-300'
                                : 'border-[#30363d] bg-[#24292e] text-gray-300 hover:border-teal-500/50'
                            }`}
                          >
                            <div className="font-bold">{months} mo</div>
                            <div className="text-xs">
                              {months === '6' ? 'Flexible' : months === '9' ? 'Popular' : 'Standard'}
                            </div>
                          </button>
                        ))}
                      </div>
                      <input
                        type="number"
                        value={formData.duration}
                        onChange={(e) => handleInputChange('duration', e.target.value)}
                        className="w-full p-4 bg-[#24292e] border border-[#30363d] rounded-xl text-white font-bold text-lg focus:border-teal-500 focus:outline-none"
                        placeholder="Custom duration"
                        min="1"
                        max="36"
                      />
                      <div className="mt-2 p-3 bg-green-600/10 border border-green-500/30 rounded-lg">
                        <div className="text-sm text-green-300">
                          <strong>Tenant Power:</strong> Smart contracts give tenants negotiation leverage. 
                          No more forced 12-month terms - choose what works for you!
                        </div>
                      </div>
                    </div>

                    {/* Damage Threshold */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-300 mb-2">Damage Threshold (USDC) *</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={formData.damageThreshold}
                          onChange={(e) => handleInputChange('damageThreshold', e.target.value)}
                          className="w-full p-4 pr-16 bg-[#24292e] border border-[#30363d] rounded-xl text-white font-bold text-lg focus:border-teal-500 focus:outline-none"
                          placeholder="1000"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">USDC</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        Maximum deductible amount for property damage claims
                      </p>
                    </div>
                  </div>
                </div>

                {/* Automation Settings */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-teal-400" />
                    Automation Settings
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-[#24292e] border border-[#30363d] rounded-xl">
                      <div>
                        <div className="text-white font-semibold">Require Property Inspection</div>
                        <div className="text-sm text-gray-400">Mandate professional inspection before move-in</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.requireInspection}
                        onChange={(e) => handleInputChange('requireInspection', e.target.checked)}
                        className="w-5 h-5 text-teal-600 bg-[#24292e] border-gray-300 rounded focus:ring-teal-500"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#24292e] border border-[#30363d] rounded-xl">
                      <div>
                        <div className="text-white font-semibold">Require Tenant Confirmation</div>
                        <div className="text-sm text-gray-400">Tenant must confirm each rent payment release</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.requireTenantConfirmation}
                        onChange={(e) => handleInputChange('requireTenantConfirmation', e.target.checked)}
                        className="w-5 h-5 text-teal-600 bg-[#24292e] border-gray-300 rounded focus:ring-teal-500"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#24292e] border border-[#30363d] rounded-xl">
                      <div>
                        <div className="text-white font-semibold">Auto-Release Monthly Rent</div>
                        <div className="text-sm text-gray-400">Automatically release rent payments on schedule</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={formData.autoReleaseRent}
                        onChange={(e) => handleInputChange('autoReleaseRent', e.target.checked)}
                        className="w-5 h-5 text-teal-600 bg-[#24292e] border-gray-300 rounded focus:ring-teal-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="mb-8 p-6 bg-gradient-to-r from-teal-600/20 to-green-600/20 border border-teal-500/30 rounded-xl">
                  <h4 className="text-lg font-semibold text-white mb-4">Escrow Summary</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400">Total Deposit</div>
                      <div className="text-xl font-bold text-teal-300">${formData.depositAmount} USDC</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Duration</div>
                      <div className="text-xl font-bold text-white">{formData.duration} months</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Monthly Release</div>
                      <div className="text-xl font-bold text-white">${Math.round(parseInt(formData.depositAmount || '0') / parseInt(formData.duration || '1'))}</div>
                    </div>
                  </div>
                </div>

                {/* Create Button */}
                <button
                  onClick={createEscrow}
                  disabled={isCreating || !formData.landlordAddress || !formData.depositAmount || !formData.duration}
                  className={`w-full py-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                    isCreating
                      ? 'bg-yellow-600 cursor-not-allowed text-white'
                      : 'bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-500 hover:to-green-500 text-white transform hover:scale-105 shadow-lg'
                  }`}
                >
                  {isCreating ? (
                    <>
                      <Clock className="w-5 h-5 animate-spin" />
                      Creating Escrow...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      Create Escrow
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </>
            ) : (
              /* Success State */
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Escrow Created Successfully!</h3>
                <div className="text-lg text-gray-300 mb-8">
                  <div className="font-mono text-teal-300">{escrowId}</div>
                </div>
                
                <div className="bg-[#24292e] border border-[#30363d] rounded-xl p-6 mb-8">
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="text-left">
                      <div className="text-gray-400">Landlord</div>
                      <div className="font-mono text-white text-xs">{formData.landlordAddress}</div>
                    </div>
                    <div className="text-left">
                      <div className="text-gray-400">Deposit Amount</div>
                      <div className="text-white font-bold">${formData.depositAmount} USDC</div>
                    </div>
                    <div className="text-left">
                      <div className="text-gray-400">Duration</div>
                      <div className="text-white">{formData.duration} months</div>
                    </div>
                    <div className="text-left">
                      <div className="text-gray-400">Status</div>
                      <div className="text-green-400 font-semibold">Active</div>
                    </div>
                  </div>
                </div>

                <a 
                  href="/dashboard"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-[#161b22] border border-teal-500 text-teal-300 rounded-xl font-semibold hover:bg-teal-500/10 transition-all"
                >
                  <Shield className="w-5 h-5" />
                  View Dashboard
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            )}

            {/* Info Footer */}
            <div className="mt-6 p-4 bg-[#24292e] border border-[#30363d] rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5" />
                <div className="text-sm text-gray-300">
                  <strong className="text-blue-300">Smart Contract Escrow:</strong> Funds are secured on-chain with automated release conditions. 
                  Both parties can dispute within 7 days of any payment release.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}