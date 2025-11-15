'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SUPPORTED_TOKENS, SupportedToken } from '@/lib/constants'

interface TokenSelectorProps {
  selectedToken: SupportedToken | null
  onTokenChange: (token: SupportedToken) => void
}

export function TokenSelector({ selectedToken, onTokenChange }: TokenSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleTokenSelect = (token: SupportedToken) => {
    onTokenChange(token)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-sm rounded-xl border border-white border-opacity-30 text-white hover:bg-opacity-30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
      >
        <div className="flex items-center space-x-3">
          {selectedToken ? (
            <>
              <span className="text-2xl">{selectedToken.icon}</span>
              <div className="text-left">
                <div className="font-semibold">{selectedToken.symbol}</div>
                <div className="text-sm text-gray-300">{selectedToken.name}</div>
              </div>
            </>
          ) : (
            <div className="text-gray-300">Select token</div>
          )}
        </div>
        
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-white"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white bg-opacity-95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg z-50 overflow-hidden"
          >
            {SUPPORTED_TOKENS.map((token) => (
              <motion.button
                key={token.id}
                onClick={() => handleTokenSelect(token)}
                whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                className="flex items-center w-full px-4 py-3 text-left text-gray-800 hover:bg-gray-50 transition-colors duration-150"
              >
                <span className="text-2xl mr-3">{token.icon}</span>
                <div>
                  <div className="font-semibold text-gray-900">{token.symbol}</div>
                  <div className="text-sm text-gray-600">{token.name}</div>
                </div>
                {selectedToken?.id === token.id && (
                  <div className="ml-auto">
                    <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background overlay to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}