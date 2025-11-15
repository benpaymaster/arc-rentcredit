'use client';

import { useState } from 'react';
import { ArrowRight, Home, Shield, Calendar, DollarSign, CheckCircle, AlertTriangle, Users, FileCheck } from 'lucide-react';
import Navigation from '../../components/Navigation';

export default function EscrowPage() {
  const [formData, setFormData] = useState({
    landlordAddress: '',
    depositAmount: '5000',
    rentAmount: '2000',
    duration: '12',
    damageThreshold: '500',
    requireInspection: true,
    requireTenantConfirmation: true,
    autoRelease: false,
    earlyTermination: false
  });
  
  const [isCreating, setIsCreating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [escrowId, setEscrowId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    
    // Simulate escrow creation
    setTimeout(() => {
      setEscrowId('ESC-' + Date.now().toString().slice(-6));
      setIsCreating(false);
      setIsComplete(true);
    }, 2500);
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#0d1117] relative overflow-hidden">
      <Navigation />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-teal-600/10"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#161b22] border border-[#30363d] rounded-full text-gray-300 text-sm font-medium mb-6">
            <Shield className="w-4 h-4 text-blue-400" />
            Programmable Escrow • Smart Contracts • Automated Releases
            <Home className="w-4 h-4 text-blue-400" />
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4">
            Create Rental <span className="arc-gradient-text">Escrow</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Set up a programmable USDC escrow for your rental deposit with automated conditions and smart contract protection
          </p>
        </div>

        {!isComplete ? (
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Basic Information */}
                <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Users className="w-6 h-6 text-blue-400" />
                    <h3 className="text-xl font-bold text-white">Rental Details</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-3">
                        Landlord Wallet Address
                      </label>
                      <input
                        type="text"
                        value={formData.landlordAddress}
                        onChange={(e) => updateFormData('landlordAddress', e.target.value)}
                        placeholder="0x742d35Cc6634C0532925a3b8D0F62292C4e5B74e"
                        className="w-full p-4 bg-[#24292e] border border-[#30363d] rounded-xl text-white focus:border-blue-500 focus:outline-none"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-3">
                        Property Address (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="123 Student St, Boston, MA"
                        className="w-full p-4 bg-[#24292e] border border-[#30363d] rounded-xl text-white focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Financial Terms */}
                <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <DollarSign className="w-6 h-6 text-green-400" />
                    <h3 className="text-xl font-bold text-white">Financial Terms</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-3">
                        Security Deposit (USDC)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={formData.depositAmount}
                          onChange={(e) => updateFormData('depositAmount', e.target.value)}
                          className="w-full p-4 bg-[#24292e] border border-[#30363d] rounded-xl text-white text-lg font-semibold focus:border-green-500 focus:outline-none"
                          required
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">USDC</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-3">
                        Monthly Rent (USDC)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={formData.rentAmount}
                          onChange={(e) => updateFormData('rentAmount', e.target.value)}
                          className="w-full p-4 bg-[#24292e] border border-[#30363d] rounded-xl text-white text-lg font-semibold focus:border-green-500 focus:outline-none"
                          required
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">USDC</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-3">
                        Damage Threshold (USDC)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          value={formData.damageThreshold}
                          onChange={(e) => updateFormData('damageThreshold', e.target.value)}
                          className="w-full p-4 bg-[#24292e] border border-[#30363d] rounded-xl text-white text-lg font-semibold focus:border-yellow-500 focus:outline-none"
                        />
                        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">USDC</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lease Terms */}
                <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Calendar className="w-6 h-6 text-purple-400" />
                    <h3 className="text-xl font-bold text-white">Lease Duration</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-3">
                        Duration (Months)
                      </label>
                      <select
                        value={formData.duration}
                        onChange={(e) => updateFormData('duration', e.target.value)}
                        className="w-full p-4 bg-[#24292e] border border-[#30363d] rounded-xl text-white focus:border-purple-500 focus:outline-none"
                      >
                        <option value="6">6 months</option>
                        <option value="12">12 months</option>
                        <option value="18">18 months</option>
                        <option value="24">24 months</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-3">
                        Start Date
                      </label>
                      <input
                        type="date"
                        className="w-full p-4 bg-[#24292e] border border-[#30363d] rounded-xl text-white focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Smart Contract Conditions */}
                <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-6 h-6 text-teal-400" />
                    <h3 className="text-xl font-bold text-white">Automation Settings</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { key: 'requireInspection', label: 'Require Property Inspection', desc: 'Landlord must complete inspection before deposit release' },
                      { key: 'requireTenantConfirmation', label: 'Require Tenant Confirmation', desc: 'Tenant must confirm move-out before automated release' },
                      { key: 'autoRelease', label: 'Auto-Release Monthly Rent', desc: 'Automatically release rent payments on schedule' },
                      { key: 'earlyTermination', label: 'Allow Early Termination', desc: 'Permit early lease termination with penalty' }
                    ].map((option) => (
                      <div key={option.key} className="flex items-start gap-4 p-4 bg-[#24292e] border border-[#30363d] rounded-xl">
                        <input
                          type="checkbox"
                          checked={formData[option.key as keyof typeof formData] as boolean}
                          onChange={(e) => updateFormData(option.key, e.target.checked)}
                          className="mt-1 w-5 h-5 rounded border-[#30363d] text-teal-500 focus:ring-teal-500 focus:ring-2"
                        />
                        <div>
                          <div className="text-white font-semibold">{option.label}</div>
                          <div className="text-gray-400 text-sm">{option.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Summary Sidebar */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-6 sticky top-6">
                  <h3 className="text-lg font-bold text-white mb-4">Escrow Summary</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Security Deposit:</span>
                      <span className="text-white font-semibold">${formData.depositAmount} USDC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Monthly Rent:</span>
                      <span className="text-white font-semibold">${formData.rentAmount} USDC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Duration:</span>
                      <span className="text-white font-semibold">{formData.duration} months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Damage Threshold:</span>
                      <span className="text-yellow-300 font-semibold">${formData.damageThreshold} USDC</span>
                    </div>
                    
                    <div className="border-t border-gray-600 pt-4">
                      <div className="flex justify-between text-lg">
                        <span className="text-gray-300">Total Escrow:</span>
                        <span className="text-teal-300 font-bold">
                          ${(parseInt(formData.depositAmount) + parseInt(formData.rentAmount) * parseInt(formData.duration)).toLocaleString()} USDC
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-[#24292e] border border-[#30363d] rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5" />
                      <div className="text-xs text-gray-400">
                        Smart contract will hold funds in escrow and automatically execute releases based on programmed conditions.
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isCreating || !formData.landlordAddress || !formData.depositAmount}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                >
                  {isCreating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
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
              </div>
            </div>
          </form>
        ) : (
          /* Success State */
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-gradient-to-br from-green-600/20 to-teal-600/20 border border-green-500/30 rounded-2xl p-12">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Escrow Created Successfully!</h2>
              <p className="text-lg text-gray-300 mb-8">
                Your rental escrow has been deployed to the Arc blockchain with smart contract protection.
              </p>
              
              <div className="bg-[#24292e] border border-[#30363d] rounded-xl p-6 mb-8">
                <div className="text-sm text-gray-400 mb-2">Escrow Contract ID</div>
                <div className="text-xl font-mono text-teal-300 font-bold">{escrowId}</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/dashboard"
                  className="px-8 py-4 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-xl font-semibold hover:from-teal-500 hover:to-green-500 transition-all flex items-center gap-3 justify-center"
                >
                  <FileCheck className="w-5 h-5" />
                  View Dashboard
                  <ArrowRight className="w-5 h-5" />
                </a>
                
                <button
                  onClick={() => {
                    setIsComplete(false);
                    setFormData({
                      landlordAddress: '',
                      depositAmount: '5000',
                      rentAmount: '2000',
                      duration: '12',
                      damageThreshold: '500',
                      requireInspection: true,
                      requireTenantConfirmation: true,
                      autoRelease: false,
                      earlyTermination: false
                    });
                  }}
                  className="px-8 py-4 bg-[#161b22] border border-[#30363d] text-gray-200 rounded-xl font-semibold hover:bg-[#24292e] transition-all"
                >
                  Create Another Escrow
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}