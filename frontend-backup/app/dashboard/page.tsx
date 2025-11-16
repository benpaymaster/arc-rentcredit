'use client';

import { useState } from 'react';
import { Shield, DollarSign, AlertTriangle, CheckCircle, Star, TrendingUp, Users, FileText, ArrowRight, Eye, Clock, Zap, Wallet } from 'lucide-react';
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
  const [selectedEscrow, setSelectedEscrow] = useState<string | null>(null);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  
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

  const handleAction = async (action: string, escrowId: string) => {
    setActionInProgress(`${action}-${escrowId}`);
    
    // Simulate action processing
    setTimeout(() => {
      setActionInProgress(null);
      // Update escrow status based on action
      // This would normally trigger a refetch of escrow data
    }, 2000);
  };

  const getReputationGrade = (score: number) => {
    if (score >= 900) return { grade: 'A+', color: 'text-green-400', bg: 'bg-green-400/20' };
    if (score >= 800) return { grade: 'A', color: 'text-green-300', bg: 'bg-green-300/20' };
    if (score >= 700) return { grade: 'B+', color: 'text-yellow-400', bg: 'bg-yellow-400/20' };
    if (score >= 600) return { grade: 'B', color: 'text-yellow-300', bg: 'bg-yellow-300/20' };
    return { grade: 'C', color: 'text-red-400', bg: 'bg-red-400/20' };
  };

  const reputation = getReputationGrade(userData.reputationScore);

  return (
    <div className="min-h-screen bg-[#0d1117] relative overflow-hidden">
      <Navigation />
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-600/10 via-blue-600/10 to-green-600/10"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Rental <span className="bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">Dashboard</span>
              </h1>
              <p className="text-gray-300">Manage your escrows, track payments, and monitor reputation</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400">Wallet Balance</div>
              <div className="text-2xl font-bold text-white">${userData.walletBalance.toLocaleString()} USDC</div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Shield className="w-8 h-8 text-teal-400" />
              <span className="text-2xl font-bold text-white">{userData.activeEscrows}</span>
            </div>
            <div className="text-sm text-gray-400">Active Escrows</div>
            <div className="text-lg font-semibold text-white">${userData.totalDeposits.toLocaleString()}</div>
          </div>

          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Star className="w-8 h-8 text-yellow-400" />
              <div className={`px-3 py-1 rounded-full text-sm font-bold ${reputation.bg} ${reputation.color}`}>
                {reputation.grade}
              </div>
            </div>
            <div className="text-sm text-gray-400">Reputation Score</div>
            <div className="text-lg font-semibold text-white">{userData.reputationScore}/1000</div>
            <div className="text-xs text-yellow-300 mt-2">🏠 Mortgage discount: -1.8%</div>
          </div>

          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <span className="text-2xl font-bold text-green-400">+{userData.yields}%</span>
            </div>
            <div className="text-sm text-gray-400">Risk Buffer Vault</div>
            <div className="text-lg font-semibold text-white">${userData.riskBufferBalance.toLocaleString()}</div>
          </div>

          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">97%</span>
            </div>
            <div className="text-sm text-gray-400">Automation Rate</div>
            <div className="text-lg font-semibold text-white">Smart Releases</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Active Escrows */}
          <div className="lg:col-span-2">
            <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-teal-400" />
                  Active Escrows
                </h3>
                <a href="/escrow" className="text-teal-400 hover:text-teal-300 text-sm font-semibold">
                  + Create New
                </a>
              </div>

              <div className="space-y-4">
                {MOCK_ESCROWS.map((escrow) => (
                  <div key={escrow.id} className="bg-[#24292e] border border-[#30363d] rounded-lg p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="font-semibold text-white mb-1">{escrow.property}</div>
                        <div className="text-sm text-gray-400 font-mono">{escrow.id}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {escrow.landlord} ↔ {escrow.tenant}
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(escrow.status)}`}>
                        {getStatusLabel(escrow.status)}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                      <div>
                        <div className="text-gray-400">Deposit</div>
                        <div className="font-semibold text-white">${escrow.deposit.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Monthly</div>
                        <div className="font-semibold text-white">${escrow.monthlyRent.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Next Payment</div>
                        <div className="font-semibold text-white">{escrow.nextPayment}</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAction('release-rent', escrow.id)}
                        disabled={actionInProgress === `release-rent-${escrow.id}` || escrow.status === 'dispute'}
                        className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-all ${
                          escrow.status === 'pending_release'
                            ? 'bg-green-600 hover:bg-green-500 text-white'
                            : 'bg-[#30363d] text-gray-300 hover:bg-[#3c434a]'
                        } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                      >
                        {actionInProgress === `release-rent-${escrow.id}` ? (
                          <Clock className="w-4 h-4 animate-spin" />
                        ) : (
                          <DollarSign className="w-4 h-4" />
                        )}
                        Release Rent
                      </button>

                      <button
                        onClick={() => handleAction('release-deposit', escrow.id)}
                        disabled={actionInProgress === `release-deposit-${escrow.id}` || escrow.status === 'dispute'}
                        className="flex-1 py-2 px-4 bg-[#30363d] text-gray-300 rounded-lg font-semibold text-sm hover:bg-[#3c434a] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {actionInProgress === `release-deposit-${escrow.id}` ? (
                          <Clock className="w-4 h-4 animate-spin" />
                        ) : (
                          <Shield className="w-4 h-4" />
                        )}
                        Release Deposit
                      </button>

                      <button
                        onClick={() => handleAction('dispute', escrow.id)}
                        disabled={actionInProgress === `dispute-${escrow.id}`}
                        className="flex-1 py-2 px-4 bg-red-600/20 border border-red-500/30 text-red-400 rounded-lg font-semibold text-sm hover:bg-red-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {actionInProgress === `dispute-${escrow.id}` ? (
                          <Clock className="w-4 h-4 animate-spin" />
                        ) : (
                          <AlertTriangle className="w-4 h-4" />
                        )}
                        Open Dispute
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Cards */}
          <div className="space-y-6">
            {/* Reputation Score Card */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                Reputation Score
              </h3>
              
              <div className="text-center mb-4">
                <div className={`inline-block px-6 py-3 rounded-full text-2xl font-bold ${reputation.bg} ${reputation.color} mb-2`}>
                  {reputation.grade}
                </div>
                <div className="text-3xl font-bold text-white">{userData.reputationScore}/1000</div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Payment History</span>
                  <span className="text-green-400 font-semibold">Excellent</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Property Care</span>
                  <span className="text-green-400 font-semibold">Very Good</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Communication</span>
                  <span className="text-yellow-400 font-semibold">Good</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Time on Platform</span>
                  <span className="text-green-400 font-semibold">2.5 years</span>
                </div>
              </div>

              <div className="mt-4 p-4 bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-lg">
                <h4 className="text-green-300 font-bold mb-2">🏠 Future Property Benefits</h4>
                <div className="space-y-2 text-xs text-gray-300">
                  <div>• <strong className="text-green-300">Mortgage Rate:</strong> -1.8% discount (saves $6,000/year)</div>
                  <div>• <strong className="text-green-300">Down Payment:</strong> 50% lower requirement</div>
                  <div>• <strong className="text-green-300">Premium Lenders:</strong> Exclusive access</div>
                  <div>• <strong className="text-green-300">Rental Deposits:</strong> 50% reduction</div>
                </div>
              </div>

              <div className="mt-3 p-3 bg-[#24292e] border border-[#30363d] rounded-lg">
                <div className="flex items-center gap-2 text-sm text-blue-300">
                  <Eye className="w-4 h-4" />
                  Score shared with mortgage lenders & landlords
                </div>
              </div>
            </div>

            {/* USDC Risk Buffer Vault Status */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                USDC Risk Buffer Vault
              </h3>
              
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-white mb-1">
                  ${userData.riskBufferBalance.toLocaleString()} USDC
                </div>
                <div className="text-green-400 font-semibold">+{userData.yields}% APY (Stable Value)</div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Your USDC</span>
                  <span className="text-white font-semibold">$2,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Earned Yield</span>
                  <span className="text-green-400 font-semibold">+$105 USDC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Pool Utilization</span>
                  <span className="text-white font-semibold">34%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">No Volatility Risk</span>
                  <span className="text-green-400 font-semibold">Stable</span>
                </div>
              </div>

              <button className="w-full mt-4 py-2 bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-500 hover:to-green-500 text-white rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2">
                <Wallet className="w-4 h-4" />
                Manage Vault
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-teal-400" />
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                <a href="/bridge" className="block w-full py-3 bg-[#24292e] hover:bg-[#30363d] border border-[#30363d] text-white rounded-lg font-semibold text-sm transition-all text-center">
                  Bridge Funds
                </a>
                <a href="/escrow" className="block w-full py-3 bg-[#24292e] hover:bg-[#30363d] border border-[#30363d] text-white rounded-lg font-semibold text-sm transition-all text-center">
                  Create Escrow
                </a>
                <button className="w-full py-3 bg-[#24292e] hover:bg-[#30363d] border border-[#30363d] text-white rounded-lg font-semibold text-sm transition-all">
                  View Reports
                </button>
                <button className="w-full py-3 bg-[#24292e] hover:bg-[#30363d] border border-[#30363d] text-white rounded-lg font-semibold text-sm transition-all">
                  Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}