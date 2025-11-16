'use client';

import { ArrowRight, CheckCircle, GitBranch, Shield, Star, Sparkles, Wallet, Users, Globe, FileText, TrendingUp } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0d1117] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-600/10 via-blue-600/10 to-green-600/10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/3 rounded-full blur-3xl"></div>
      </div>

      <section className="relative z-10 px-4 pt-20 pb-32">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#161b22] border border-[#30363d] backdrop-blur-sm rounded-full text-gray-300 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 text-teal-400" />
              Powered by Arc Blockchain • USDC Native • CCTP Bridge Kit
              <Sparkles className="w-4 h-4 text-teal-400" />
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-teal-300 to-green-300 bg-clip-text text-transparent">
                Cross Rent
              </span>
            </h1>
            
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Global Rent. Universal Credit.
              </h2>
              <h3 className="text-xl md:text-2xl font-semibold text-teal-300 mb-4">
                Cross-Border Student Rental Deposits with Programmable USDC Escrows
              </h3>
              <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-5xl mx-auto leading-relaxed">
                <span className="text-teal-200 font-semibold">"Sara pays her rental deposit using USDC on Arc - instantly, securely, globally."</span>
              </p>
              <p className="text-lg text-gray-400 max-w-4xl mx-auto leading-relaxed">
                Complete programmable escrow system with automated rent releases, cross-chain USDC bridging via CCTP, 
                reputation SBTs, and risk management vaults for international students worldwide.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="px-4 py-2 bg-[#161b22] border border-[#30363d] text-green-300 rounded-full text-sm font-medium flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> USDC Native
              </span>
              <span className="px-4 py-2 bg-[#161b22] border border-[#30363d] text-teal-300 rounded-full text-sm font-medium flex items-center gap-2">
                <GitBranch className="w-4 h-4" /> CCTP Bridge Kit
              </span>
              <span className="px-4 py-2 bg-[#161b22] border border-[#30363d] text-blue-300 rounded-full text-sm font-medium flex items-center gap-2">
                <Shield className="w-4 h-4" /> Programmable Escrows
              </span>
              <span className="px-4 py-2 bg-[#161b22] border border-[#30363d] text-yellow-300 rounded-full text-sm font-medium flex items-center gap-2">
                <Star className="w-4 h-4" /> Reputation SBTs
              </span>
            </div>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a 
                href="/bridge" 
                className="group px-10 py-5 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-xl font-semibold text-lg shadow-2xl hover:shadow-teal-500/25 transform hover:scale-105 hover:from-teal-500 hover:to-green-500 transition-all duration-300 flex items-center gap-3"
              >
                <GitBranch className="w-6 h-6" />
                Bridge USDC to Arc
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a 
                href="/dashboard" 
                className="px-10 py-5 bg-[#161b22] border border-[#30363d] text-gray-200 rounded-xl font-semibold text-lg hover:bg-[#24292e] hover:border-teal-500/50 transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
              >
                <Users className="w-6 h-6" />
                View Dashboard
              </a>
            </div>
          </div>

          {/* Core Demo Flow */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                🚀 Core Demo Flow
              </h3>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Experience the complete Cross Rent journey in 3 beautiful screens
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              
              {/* Screen 1: Bridge */}
              <div className="group bg-[#161b22] border border-[#30363d] rounded-xl p-8 hover:bg-[#24292e] hover:border-teal-500/30 transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <GitBranch className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4">1. Bridge USDC</h4>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    Transfer USDC from Ethereum to Arc using Circle's CCTP. Select amount, choose source chain, and bridge instantly.
                  </p>
                  <a 
                    href="/bridge"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-500 hover:to-green-500 text-white rounded-lg font-semibold transition-all duration-300"
                  >
                    Try Bridge
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Screen 2: Create Escrow */}
              <div className="group bg-[#161b22] border border-[#30363d] rounded-xl p-8 hover:bg-[#24292e] hover:border-blue-500/30 transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4">2. Create Escrow</h4>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    Set up programmable rental escrow with landlord address, deposit amount, and smart contract automation.
                  </p>
                  <a 
                    href="/escrow"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-lg font-semibold transition-all duration-300"
                  >
                    Create Escrow
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Screen 3: Dashboard */}
              <div className="group bg-[#161b22] border border-[#30363d] rounded-xl p-8 hover:bg-[#24292e] hover:border-purple-500/30 transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4">3. Manage & Earn</h4>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    Complete dashboard with active escrows, reputation score, risk buffer vault, and release management.
                  </p>
                  <a 
                    href="/dashboard"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-semibold transition-all duration-300"
                  >
                    View Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Value Propositions */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
            {/* Technical Excellence */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-8 hover:bg-[#24292e] hover:border-teal-500/30 transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Technical Excellence</h3>
              <p className="text-gray-400 leading-relaxed">
                Programmable escrow logic, ERC-4626 vaults, cross-chain USDC via CCTP, and reputation SBTs - all integrated seamlessly.
              </p>
            </div>

            {/* Arc Infrastructure */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-8 hover:bg-[#24292e] hover:border-teal-500/30 transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Arc Native</h3>
              <p className="text-gray-400 leading-relaxed">
                Built on Arc's dev-controlled wallets, USDC infrastructure, BridgeKit integration, and native blockchain capabilities.
              </p>
            </div>

            {/* Real-World Impact */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-8 hover:bg-[#24292e] hover:border-teal-500/30 transition-all duration-300 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Real-World Relevance</h3>
              <p className="text-gray-400 leading-relaxed">
                Solving actual pain points for international students with proven market demand and clear product-market fit.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-20 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-teal-300 mb-2">$2.5M+</div>
                <div className="text-gray-400">USDC in Escrows</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-300 mb-2">1,200+</div>
                <div className="text-gray-400">Students Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-300 mb-2">450+</div>
                <div className="text-gray-400">Verified Landlords</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-yellow-300 mb-2">15</div>
                <div className="text-gray-400">Countries Connected</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}