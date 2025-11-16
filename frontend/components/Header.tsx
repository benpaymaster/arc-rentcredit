'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="relative z-50 px-4 py-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-xl">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/crossrent-logo.svg" 
                alt="CrossRent Logo" 
                className="w-10 h-10"
              />
              <h1 className="text-2xl font-bold text-gray-800">
                CrossRent
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#dashboard" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">Dashboard</a>
              <button 
                onClick={() => document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
              >
                Payments
              </button>
              <a href="#guide" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">Guide</a>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden px-6 py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-4">
                <a href="#dashboard" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">Dashboard</a>
                <button 
                  onClick={() => {
                    setIsMenuOpen(false)
                    document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="text-gray-700 hover:text-gray-900 transition-colors font-medium text-left"
                >
                  Payments
                </button>
                <a href="#guide" className="text-gray-700 hover:text-gray-900 transition-colors font-medium">Guide</a>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}