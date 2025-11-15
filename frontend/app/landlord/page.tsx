"use client";

import { Building2, DollarSign, TrendingUp, Wallet, Shield, Star, CheckCircle, Eye, Settings } from 'lucide-react';

export default function LandlordPage() {
  const escrows = [
    {
      id: 'ESC-001',
      tenant: '0x742d35Cc...4e5B74e',
      property: 'Boston Studio Apartment',
      depositAmount: 2500,
      rentAmount: 1200,
      status: 'Active',
      startDate: '2024-01-15',
      endDate: '2024-12-15',
      reputationScore: 780,
      currency: 'USDC'
    },
    {
      id: 'ESC-002', 
      tenant: '0x8ba1f109...7c36265E',
      property: 'NYC 1BR Apartment',
      depositAmount: 3500,
      rentAmount: 2100,
      status: 'TenantReleased',
      startDate: '2024-02-01',
      endDate: '2025-01-31',
      reputationScore: 695,
      currency: 'USDC'
    }
  ];

  const totalLocked = escrows.reduce((sum, escrow) => sum + escrow.depositAmount + escrow.rentAmount, 0);
  const activeEscrows = escrows.filter(e => e.status === 'Active').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'TenantReleased': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Disputed': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'LandlordReleased': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-600/10 via-blue-600/10 to-green-600/10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              <span className="bg-gradient-to-r from-teal-300 to-green-300 bg-clip-text text-transparent">
                Cross Rent
              </span>{" "}
              Landlord Dashboard
            </h1>
            <p className="text-gray-400">Global Rent. Universal Credit. - Manage your rental escrows on Arc blockchain</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 hover:bg-[#24292e] hover:border-teal-500/30 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Value Locked</p>
                  <p className="text-2xl font-bold text-white">${totalLocked.toLocaleString()}</p>
                </div>
                <Wallet className="w-8 h-8 text-teal-400" />
              </div>
            </div>

            <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 hover:bg-[#24292e] hover:border-teal-500/30 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Escrows</p>
                  <p className="text-2xl font-bold text-white">{activeEscrows}</p>
                </div>
                <Shield className="w-8 h-8 text-green-400" />
              </div>
            </div>

            <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 hover:bg-[#24292e] hover:border-teal-500/30 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Properties</p>
                  <p className="text-2xl font-bold text-white">3</p>
                </div>
                <Building2 className="w-8 h-8 text-blue-400" />
              </div>
            </div>

            <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 hover:bg-[#24292e] hover:border-teal-500/30 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-white">$4,250</p>
                </div>
                <TrendingUp className="w-8 h-8 text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="bg-[#161b22] border border-[#30363d] rounded-xl">
            <div className="p-6 border-b border-[#30363d]">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <Shield className="w-6 h-6 text-teal-400" />
                Active Rental Escrows
              </h2>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {escrows.map((escrow) => (
                  <div 
                    key={escrow.id}
                    className="bg-[#24292e] border border-[#30363d] rounded-xl p-6 hover:bg-[#2d333b] hover:border-teal-500/30 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-green-600 rounded-lg flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{escrow.property}</h3>
                          <p className="text-gray-400 text-sm">Escrow ID: {escrow.id}</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-lg text-xs font-medium border ${getStatusColor(escrow.status)}`}>
                        {escrow.status}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Tenant</p>
                        <p className="text-white text-sm font-mono">{escrow.tenant}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-400" />
                          <span className="text-yellow-300 text-xs">{escrow.reputationScore}</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Deposit</p>
                        <p className="text-white text-sm font-semibold">
                          {escrow.depositAmount.toLocaleString()} {escrow.currency}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Monthly Rent</p>
                        <p className="text-white text-sm font-semibold">
                          {escrow.rentAmount.toLocaleString()} {escrow.currency}
                        </p>
                      </div>
                      
                      <div>
                        <p className="text-gray-400 text-xs mb-1">Lease Period</p>
                        <p className="text-white text-sm">{escrow.startDate}</p>
                        <p className="text-gray-400 text-xs">to {escrow.endDate}</p>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                      <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-lg text-sm font-medium hover:from-teal-500 hover:to-green-500 transition-all">
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                      
                      {escrow.status === 'TenantReleased' && (
                        <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg text-sm font-medium hover:from-blue-500 hover:to-teal-500 transition-all">
                          <CheckCircle className="w-4 h-4" />
                          Release Deposit
                        </button>
                      )}
                      
                      <button className="flex items-center gap-2 px-4 py-2 bg-[#161b22] border border-[#30363d] text-gray-300 rounded-lg text-sm font-medium hover:bg-[#24292e] hover:border-teal-500/30 transition-all">
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
