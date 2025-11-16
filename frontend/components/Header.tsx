'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="relative z-50 px-4 py-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-2xl">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/crossrent-logo.svg" 
                alt="CrossRent Logo" 
                className="w-10 h-10"
              />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                CrossRent
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#dashboard" className="text-white/90 hover:text-white transition-colors font-medium">Dashboard</a>
              <button 
                onClick={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-white/90 hover:text-white transition-colors font-medium"
              >
                Payments
              </button>
              <button 
                onClick={() => {
                  document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })
                  // Optional: Add visual feedback
                  window.dispatchEvent(new CustomEvent('openWalletCreation'))
                  console.log('Connect Wallet clicked - redirecting to dashboard')
                }}
                className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-xl hover:scale-105 transform transition-all duration-200 shadow-2xl ring-2 ring-emerald-400/30"
                title="Connect Wallet (required to make payments)"
              >
                🔗 Connect Wallet (Required)
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden px-6 py-4 border-t border-white/10">
              <nav className="flex flex-col space-y-4">
                <a href="#dashboard" className="text-white/90 hover:text-white transition-colors font-medium">Dashboard</a>
                <button 
                  onClick={() => {
                    setIsMenuOpen(false)
                    document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="text-white/90 hover:text-white transition-colors font-medium text-left"
                >
                  Payments
                </button>
                <a href="#guide" className="text-white/90 hover:text-white transition-colors font-medium">Guide</a>
                <button 
                  onClick={() => {
                    // Close mobile menu and scroll to dashboard
                    setIsMenuOpen(false)
                    document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })
                    window.dispatchEvent(new CustomEvent('openWalletCreation'))
                    console.log('Mobile Connect Wallet clicked')
                  }}
                  className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-2xl font-semibold w-full hover:shadow-xl hover:scale-105 transform transition-all duration-200"
                >
                  🔗 Connect Wallet (Required)
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}