"use client";

import { useState } from 'react';
import { Wallet, Shield, Star, Home, ArrowRight, TrendingUp, Users } from 'lucide-react';
import TenantEscrowForm from '../../components/TenantEscrowForm';
import TenantEscrowList from '../../components/TenantEscrowList';
import ReputationSBT from '../../components/ReputationSBT';

export default function TenantPage() {
  const [activeTab, setActiveTab] = useState<'escrows' | 'create' | 'reputation'>('escrows');

  return (
    <div className="min-h-screen bg-[#0d1117] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-600/10 via-blue-600/10 to-green-600/10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-green-600 rounded-xl flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Tenant Dashboard</h1>
              <p className="text-xl text-gray-300 mt-2">
                Manage your USDC deposits, escrows, and reputation on Cross Rent
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-[#161b22] border border-[#30363d] text-green-300 rounded-full text-sm font-medium flex items-center gap-2">
              <Wallet className="w-4 h-4" /> USDC Native Payments
            </span>
            <span className="px-4 py-2 bg-[#161b22] border border-[#30363d] text-teal-300 rounded-full text-sm font-medium flex items-center gap-2">
              <Shield className="w-4 h-4" /> Secure Escrow Protection
            </span>
            <span className="px-4 py-2 bg-[#161b22] border border-[#30363d] text-blue-300 rounded-full text-sm font-medium flex items-center gap-2">
              <Star className="w-4 h-4" /> Build Credit Score
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-12">
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-2">
            <nav className="flex space-x-2">
              <button
                onClick={() => setActiveTab('escrows')}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === 'escrows'
                    ? 'bg-gradient-to-r from-teal-600 to-green-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-[#24292e]'
                }`}
              >
                <Shield className="w-4 h-4" />
                My Escrows
              </button>
              <button
                onClick={() => setActiveTab('create')}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === 'create'
                    ? 'bg-gradient-to-r from-teal-600 to-green-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-[#24292e]'
                }`}
              >
                <Wallet className="w-4 h-4" />
                Create Escrow
              </button>
              <button
                onClick={() => setActiveTab('reputation')}
                className={`flex-1 py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === 'reputation'
                    ? 'bg-gradient-to-r from-teal-600 to-green-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-[#24292e]'
                }`}
              >
                <Star className="w-4 h-4" />
                Reputation
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-8">
          {activeTab === 'escrows' && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Shield className="w-8 h-8 text-teal-400" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Your Active Escrows</h2>
                  <p className="text-gray-400">Manage your rental deposit escrows and track status</p>
                </div>
              </div>
              <TenantEscrowList />
            </div>
          )}
          
          {activeTab === 'create' && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Wallet className="w-8 h-8 text-green-400" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Create New Escrow</h2>
                  <p className="text-gray-400">Set up a new rental deposit using USDC</p>
                </div>
              </div>
              <TenantEscrowForm />
            </div>
          )}
          
          {activeTab === 'reputation' && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Star className="w-8 h-8 text-yellow-400" />
                <div>
                  <h2 className="text-2xl font-bold text-white">Your Reputation Score</h2>
                  <p className="text-gray-400">Track your tenant reputation and SBT status</p>
                </div>
              </div>
              <ReputationSBT />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
