'use client';

import { useState } from 'react';
import { Shield, DollarSign, Clock, AlertTriangle, CheckCircle, Star, TrendingUp, Users, FileText, ArrowRight, Eye, MoreHorizontal, Wallet } from 'lucide-react';
import Navigation from '../../components/Navigation';

const MOCK_ESCROWS = [
  {
    id: 'ESC-001234',
    property: '123 Student St, Boston',
    landlord: '0x742d...5B74e',
    tenant: '0x891a...3C82f',
    deposit: 5000,
    monthlyRent: 2000,
    status: 'active',
    nextPayment: '2025-12-15',
    duration: '12 months',
    daysRemaining: 335,
    autoRelease: true
  },
  {
    id: 'ESC-001235',
    property: '456 College Ave, Cambridge',
    landlord: '0x234b...1A92d',
    tenant: '0x567c...8B43e',
    deposit: 3500,
    monthlyRent: 1800,
    status: 'pending_release',
    nextPayment: '2025-11-20',
    duration: '6 months',
    daysRemaining: 45,
    autoRelease: false
  },
  {
    id: 'ESC-001236',
    property: '789 University Rd, Somerville',
    landlord: '0x345c...2B83f',
    tenant: '0x678d...9C54g',
    deposit: 4200,
    monthlyRent: 2200,
    status: 'dispute',
    nextPayment: 'Disputed',
    duration: '12 months',
    daysRemaining: 180,
    autoRelease: true
  }
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'escrows' | 'reputation' | 'vault'>('escrows');
  const [selectedEscrow, setSelectedEscrow] = useState<string | null>(null);
  
  // Mock user data
  const userData = {
    walletBalance: 12450,
    activeEscrows: 3,
    totalDeposits: 12700,
    reputationScore: 785,
    riskBufferBalance: 45678,
    yields: 4.2
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'pending_release': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'dispute': return 'text-red-400 bg-red-400/20 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/20 border-gray-400/30';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'pending_release': return 'Pending Release';
      case 'dispute': return 'In Dispute';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] relative overflow-hidden">
      <Navigation />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-teal-600/10"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Cross Rent <span className="arc-gradient-text">Dashboard</span>
            </h1>
            <p className="text-lg text-gray-300">
              Manage your USDC escrows, reputation, and earnings
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-400">Arc Wallet Balance</div>
            <div className="text-2xl font-bold text-teal-300">${userData.walletBalance.toLocaleString()} USDC</div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-8 h-8 text-blue-400" />
              <div className="text-sm text-gray-400">Active Escrows</div>
            </div>
            <div className="text-3xl font-bold text-white">{userData.activeEscrows}</div>
          </div>
          
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <DollarSign className="w-8 h-8 text-green-400" />
              <div className="text-sm text-gray-400">Total Deposits</div>
            </div>
            <div className="text-3xl font-bold text-white">${userData.totalDeposits.toLocaleString()}</div>
          </div>
          
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <Star className="w-8 h-8 text-yellow-400" />
              <div className="text-sm text-gray-400">Reputation Score</div>
            </div>
            <div className="text-3xl font-bold text-white">{userData.reputationScore}</div>
          </div>
          
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-8 h-8 text-purple-400" />
              <div className="text-sm text-gray-400">Vault APY</div>
            </div>
            <div className="text-3xl font-bold text-white">{userData.yields}%</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-2">
            <nav className="flex space-x-2">
              <button
                onClick={() => setActiveTab('escrows')}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === 'escrows'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-[#24292e]'
                }`}
              >
                <Shield className="w-4 h-4" />
                Active Escrows
              </button>
              <button
                onClick={() => setActiveTab('reputation')}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === 'reputation'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-[#24292e]'
                }`}
              >
                <Star className="w-4 h-4" />
                Reputation
              </button>
              <button
                onClick={() => setActiveTab('vault')}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === 'vault'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-[#24292e]'
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Risk Buffer Vault
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'escrows' && (
          <div className="space-y-6">
            {MOCK_ESCROWS.map((escrow) => (
              <div key={escrow.id} className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 hover:bg-[#24292e] transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{escrow.property}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(escrow.status)}`}>
                        {getStatusLabel(escrow.status)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-400">Escrow ID: {escrow.id}</div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-white transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Security Deposit</div>
                    <div className="text-xl font-bold text-green-400">${escrow.deposit.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Monthly Rent</div>
                    <div className="text-xl font-bold text-blue-400">${escrow.monthlyRent.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Next Payment</div>
                    <div className="text-lg font-semibold text-white">{escrow.nextPayment}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Days Remaining</div>
                    <div className="text-lg font-semibold text-purple-400">{escrow.daysRemaining}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-400">
                      Landlord: <span className="text-gray-300 font-mono">{escrow.landlord}</span>
                    </div>
                    {escrow.autoRelease && (
                      <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                        <CheckCircle className="w-3 h-3" />
                        Auto-release enabled
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {escrow.status === 'active' && (
                      <>
                        <button className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold text-sm transition-all">
                          Release Rent
                        </button>
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold text-sm transition-all">
                          Release Deposit
                        </button>
                      </>
                    )}
                    
                    {escrow.status === 'pending_release' && (
                      <button className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg font-semibold text-sm transition-all">
                        Review Release
                      </button>
                    )}
                    
                    {escrow.status === 'dispute' && (
                      <button className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-semibold text-sm transition-all">
                        Manage Dispute
                      </button>
                    )}
                    
                    <button className="px-4 py-2 bg-[#24292e] border border-[#30363d] text-gray-300 hover:text-white rounded-lg font-semibold text-sm transition-all flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reputation' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Reputation Score Card */}
            <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Reputation Score</h3>
                  <p className="text-yellow-300">Cross Rent SBT</p>
                </div>
              </div>
              
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-yellow-300 mb-2">{userData.reputationScore}</div>
                <div className="text-lg text-gray-300">Excellent Standing</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Completed Escrows:</span>
                  <span className="text-white font-semibold">15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">On-time Payments:</span>
                  <span className="text-green-400 font-semibold">100%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Disputes Resolved:</span>
                  <span className="text-white font-semibold">2/2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Platform Member:</span>
                  <span className="text-blue-400 font-semibold">8 months</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { type: 'payment', desc: 'Rent payment released', amount: '+$2,000', time: '2 hours ago' },
                  { type: 'escrow', desc: 'New escrow created', amount: '$5,000', time: '1 day ago' },
                  { type: 'reputation', desc: 'Reputation score updated', amount: '+15', time: '3 days ago' },
                  { type: 'dispute', desc: 'Dispute resolved', amount: 'Resolved', time: '1 week ago' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-[#24292e] border border-[#30363d] rounded-lg">
                    <div>
                      <div className="text-white font-medium">{activity.desc}</div>
                      <div className="text-gray-400 text-sm">{activity.time}</div>
                    </div>
                    <div className={`font-semibold ${
                      activity.type === 'payment' ? 'text-green-400' :
                      activity.type === 'reputation' ? 'text-yellow-400' :
                      'text-gray-300'
                    }`}>
                      {activity.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'vault' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Risk Buffer Vault */}
            <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Risk Buffer Vault</h3>
                  <p className="text-purple-300">ERC-4626 Strategy</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-gray-300">Total Balance</span>
                    <span className="text-3xl font-bold text-white">${userData.riskBufferBalance.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-[#24292e] rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{width: '65%'}}></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400">Current APY</div>
                    <div className="text-2xl font-bold text-purple-400">{userData.yields}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Monthly Earnings</div>
                    <div className="text-2xl font-bold text-green-400">$189</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Platform Fees Pool:</span>
                    <span className="text-white font-semibold">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">USDC Lending:</span>
                    <span className="text-white font-semibold">35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Liquidity Provision:</span>
                    <span className="text-white font-semibold">20%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vault Actions */}
            <div className="space-y-6">
              <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Vault Actions</h3>
                <div className="space-y-3">
                  <button className="w-full p-4 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Deposit to Vault
                  </button>
                  <button className="w-full p-4 bg-[#24292e] border border-[#30363d] text-gray-200 hover:text-white hover:bg-[#30363d] rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                    <Wallet className="w-5 h-5" />
                    Withdraw Funds
                  </button>
                  <button className="w-full p-4 bg-[#24292e] border border-[#30363d] text-gray-200 hover:text-white hover:bg-[#30363d] rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                    <FileText className="w-5 h-5" />
                    View Strategy Details
                  </button>
                </div>
              </div>
              
              <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Risk Metrics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Platform Risk Score</span>
                      <span className="text-green-400 font-semibold">Low (2.1/10)</span>
                    </div>
                    <div className="w-full bg-[#24292e] rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '21%'}}></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400">Total Collateral</div>
                      <div className="text-white font-semibold">$2.3M</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Active Claims</div>
                      <div className="text-white font-semibold">0</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}