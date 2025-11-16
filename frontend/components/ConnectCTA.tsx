"use client"

import { useEffect, useState } from 'react'
import { getAllWallets } from '../lib/wallet'

export default function ConnectCTA() {
  const [hasWallet, setHasWallet] = useState(true)

  useEffect(() => {
    const wallets = getAllWallets()
    setHasWallet(wallets.length > 0)

    const handler = () => {
      const w = getAllWallets()
      setHasWallet(w.length > 0)
    }

    window.addEventListener('walletsUpdated', handler)
    // openWalletCreation dispatched elsewhere will also update UI
    window.addEventListener('openWalletCreation', handler)

    return () => {
      window.removeEventListener('walletsUpdated', handler)
      window.removeEventListener('openWalletCreation', handler)
    }
  }, [])

  // Don't show if a wallet exists
  if (hasWallet) return null

  return (
    <div className="fixed right-6 bottom-8 z-60">
      <button
        onClick={() => {
          // Scroll to dashboard and trigger creation flow
          document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' })
          window.dispatchEvent(new CustomEvent('openWalletCreation'))
        }}
        className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-5 py-4 rounded-full font-bold shadow-2xl hover:scale-105 transform transition-all duration-200 flex items-center space-x-3 ring-4 ring-emerald-400/20"
      >
        <span className="text-xl">🔗</span>
        <span className="text-sm">Connect Wallet</span>
      </button>
    </div>
  )
}
