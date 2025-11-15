'use client';

import { GitBranch, Shield, TrendingUp, Home } from 'lucide-react';
import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-[#161b22]/80 backdrop-blur-md border border-[#30363d] rounded-2xl px-6 py-3">
      <div className="flex items-center gap-6">
        <Link 
          href="/"
          className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-[#24292e]"
        >
          <Home className="w-4 h-4" />
          <span className="hidden sm:inline">Home</span>
        </Link>
        
        <div className="w-px h-6 bg-[#30363d]"></div>
        
        <Link 
          href="/bridge"
          className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-teal-300 transition-colors rounded-lg hover:bg-teal-500/10"
        >
          <GitBranch className="w-4 h-4" />
          <span className="hidden sm:inline">Bridge</span>
        </Link>
        
        <Link 
          href="/escrow"
          className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-blue-300 transition-colors rounded-lg hover:bg-blue-500/10"
        >
          <Shield className="w-4 h-4" />
          <span className="hidden sm:inline">Escrow</span>
        </Link>
        
        <Link 
          href="/dashboard"
          className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-purple-300 transition-colors rounded-lg hover:bg-purple-500/10"
        >
          <TrendingUp className="w-4 h-4" />
          <span className="hidden sm:inline">Dashboard</span>
        </Link>
      </div>
    </nav>
  );
}