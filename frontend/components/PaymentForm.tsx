'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Wallet, CreditCard, CheckCircle, AlertCircle, ChevronRight } from 'lucide-react'
import { createWallet, executeTransfer, getWalletBalance, getAllWallets, type Wallet as WalletType, type Transfer } from '../lib/wallet'
import { createEscrow, releaseRentPayment, getReputationScore } from '../lib/contracts'
import { addProperty } from '../lib/properties'
import toast from 'react-hot-toast'

interface PaymentFormProps {
  userType: 'tenant' | 'landlord'
  onPaymentSuccess?: (amount: number) => void
  onShowProperties?: () => void
}

export default function PaymentForm({ userType, onPaymentSuccess, onShowProperties }: PaymentFormProps) {
  const [amount, setAmount] = useState('')
  const [duration, setDuration] = useState('3')
  const [propertyAddress, setPropertyAddress] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentWallet, setCurrentWallet] = useState<WalletType | null>(null)
  const [walletBalance, setWalletBalance] = useState('0')
  const [step, setStep] = useState<'wallet' | 'payment' | 'success'>('wallet')
  const propertyRef = useRef<HTMLInputElement | null>(null)
  const amountRef = useRef<HTMLInputElement | null>(null)

  // Load wallet on mount
  useEffect(() => {
    const wallets = getAllWallets()
    if (wallets.length > 0) {
      setCurrentWallet(wallets[0])
      setStep('payment')
      loadBalance(wallets[0].id)
    }

    // Load properties for landlord view

    // Listen for guide/header events to control the form flow
    const openWallet = () => setStep('wallet')
    const focusProperty = () => {
      setStep('payment')
      setTimeout(() => propertyRef.current?.focus(), 200)
    }
    const focusAmount = () => {
      setStep('payment')
      setTimeout(() => amountRef.current?.focus(), 200)
    }

    window.addEventListener('openWalletCreation', openWallet)
    window.addEventListener('focusProperty', focusProperty)
    window.addEventListener('focusAmount', focusAmount)

    return () => {
      window.removeEventListener('openWalletCreation', openWallet)
      window.removeEventListener('focusProperty', focusProperty)
      window.removeEventListener('focusAmount', focusAmount)
    }
  }, [])

  const loadBalance = async (walletId: string) => {
    const balance = await getWalletBalance(walletId)
    setWalletBalance(balance)
  }

  const handleCreateWallet = async () => {
    setIsProcessing(true)
    try {
      const wallet = await createWallet('MATIC-AMOY')
      if (wallet) {
        setCurrentWallet(wallet)
        setWalletBalance(wallet.balance || '0')
        setStep('payment')
      }
    } catch (error) {
      console.error('Failed to create wallet:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentWallet) return

    setIsProcessing(true)
    
    try {
      // 🏠 Step 1: Create escrow on smart contract
      const escrowResult = await createEscrow(
        '0x1234567890123456789012345678901234567890', // Mock landlord
        amount,
        (parseFloat(amount) * 1.1).toFixed(2), // Include 10% safety contribution
        propertyAddress,
        parseInt(duration)
      )
      
      if (!escrowResult.success) {
        throw new Error(escrowResult.error || 'Escrow creation failed')
      }
      
      toast.success('🏠 Escrow created successfully!')
      
      // 💰 Step 2: Execute USDC transfer
      const transfer: Transfer = {
        amount,
        destinationAddress: '0x1234567890123456789012345678901234567890',
        tokenId: 'USDC',
        sourceChain: 'polygon',
        destinationChain: 'polygon'
      }

      const transferResult = await executeTransfer(currentWallet.id, transfer)
      
      if (transferResult.success) {
        toast.success('💰 USDC payment sent!')
        setStep('success')
        
        // Add property to landlord's view
        const newProperty = addProperty({
          address: propertyAddress,
          amount,
          duration,
          tenantAddress: currentWallet.address
        })
        
        // Call the callback to update dashboard scores
        if (onPaymentSuccess) {
          onPaymentSuccess(parseFloat(amount))
        }
        
        // ⭐ Step 3: Update reputation (on-time payment)
        await getReputationScore(currentWallet.address)
        toast.success('⭐ Reputation updated!')
        
        // Refresh wallet balance
        await loadBalance(currentWallet.id)
      } else {
        throw new Error(transferResult.error || 'Transfer failed')
      }
    } catch (error) {
      console.error('💥 Payment failed:', error)
      toast.error(`Payment failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsProcessing(false)
    }
  }

  // Wallet Creation Step
  if (step === 'wallet') {
    return (
      <div className="space-y-6">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
              <span className="text-white font-medium">Create Wallet</span>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-gray-400 font-bold text-sm">2</div>
              <span className="text-gray-400">Set Payment</span>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-gray-400 font-bold text-sm">3</div>
              <span className="text-gray-400">Success</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-400/30 rounded-2xl p-8 text-center">
          <Wallet className="w-20 h-20 text-blue-300 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-3">Step 1: Create Your Wallet</h3>
          <p className="text-blue-100 mb-6 text-lg">
            🚀 Click below to create your secure wallet and start paying rent with USDC
          </p>
          <div className="bg-blue-500/10 rounded-xl p-4 mb-6">
            <div className="text-sm text-blue-200 space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-green-400">✓</span>
                <span>Circle Programmable Wallet</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-green-400">✓</span>
                <span>1000 USDC starting balance</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-green-400">✓</span>
                <span>Ready for rent payments</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleCreateWallet}
            disabled={isProcessing}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 flex items-center space-x-3 mx-auto"
          >
            {isProcessing ? (
              <>
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Creating Your Wallet...</span>
              </>
            ) : (
              <>
                <Wallet size={24} />
                <span>🚀 Create My Wallet</span>
              </>
            )}
          </button>
        </div>
      </div>
    )
  }

  // Success Step
  if (step === 'success') {
    return (
      <div className="space-y-6">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                <CheckCircle size={16} />
              </div>
              <span className="text-green-400 font-medium">Wallet Created</span>
            </div>
            <ChevronRight className="text-green-400" size={20} />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                <CheckCircle size={16} />
              </div>
              <span className="text-green-400 font-medium">Payment Set</span>
            </div>
            <ChevronRight className="text-green-400" size={20} />
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                <CheckCircle size={16} />
              </div>
              <span className="text-green-400 font-medium">Payment Complete!</span>
            </div>
          </div>
        </div>
        
        <div className="text-center p-8">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Payment Successful!</h3>
          <p className="text-white/70 mb-4">
            Your rent payment of {amount} USDC has been processed successfully
          </p>
          <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-4 mb-6">
            <div className="text-sm text-green-200">
              <div className="flex justify-between mb-2">
                <span>Amount:</span>
                <span className="font-semibold">{amount} USDC</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Property:</span>
                <span className="font-semibold">{propertyAddress}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="font-semibold">{duration} months</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setStep('payment')}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
          >
            Make Another Payment
          </button>
        </div>
      </div>
    )
  }

  if (userType === 'landlord') {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-400/30 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-green-200 mb-3">Rent Management</h3>
          <p className="text-green-100/80 text-sm leading-relaxed">
            Monitor incoming rent payments, manage escrow funds, and track tenant payment history. 
            All transactions are secured on-chain with USDC.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h4 className="font-medium text-white mb-2">Active Tenants</h4>
            <div className="text-2xl font-bold text-purple-300">8</div>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <h4 className="font-medium text-white mb-2">Pending Payments</h4>
            <div className="text-2xl font-bold text-orange-300">3</div>
          </div>
        </div>

        <button 
          onClick={() => onShowProperties && onShowProperties()}
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <span>View All Properties</span>
          <ArrowRight size={20} />
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              <CheckCircle size={16} />
            </div>
            <span className="text-green-400 font-medium">Wallet Created</span>
          </div>
          <ChevronRight className="text-gray-400" size={20} />
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
            <span className="text-white font-medium">Set Payment Details</span>
          </div>
          <ChevronRight className="text-gray-400" size={20} />
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-gray-400 font-bold text-sm">3</div>
            <span className="text-gray-400">Submit Payment</span>
          </div>
        </div>
      </div>
      
      {/* Wallet Info */}
      {currentWallet && (
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-400/30 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <CreditCard className="w-6 h-6 text-blue-300" />
              <h3 className="text-lg font-semibold text-blue-200">Your Wallet</h3>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-100/80">Balance</p>
              <p className="text-xl font-bold text-blue-200">{walletBalance} USDC</p>
            </div>
          </div>
          <div className="text-sm text-blue-100/60">
            <p className="mb-1">Address: {currentWallet.address.substring(0, 6)}...{currentWallet.address.substring(-4)}</p>
            <p>Network: {currentWallet.blockchain}</p>
          </div>
        </div>
      )}

      <div>
        <label className="block text-white/90 font-medium mb-3">Property Address</label>
        <input
          ref={propertyRef}
          type="text"
          value={propertyAddress}
          onChange={(e) => setPropertyAddress(e.target.value)}
          placeholder="Enter property address"
          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none transition-colors backdrop-blur-sm"
          required
        />
      </div>

      <div>
        <label className="block text-white/90 font-medium mb-3">Rent Amount (USDC)</label>
        <div className="relative">
          <input
            ref={amountRef}
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:border-purple-400 focus:outline-none transition-colors backdrop-blur-sm pr-20"
            required
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-400 to-indigo-500 text-white text-sm px-3 py-1 rounded-lg font-medium">
            USDC
          </div>
        </div>
      </div>

      <div>
        <label className="block text-white/90 font-medium mb-3">Tenancy Duration (Months)</label>
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-purple-400 focus:outline-none transition-colors backdrop-blur-sm"
        >
          <option value="3" className="bg-purple-900">3 Months</option>
          <option value="6" className="bg-purple-900">6 Months</option>
          <option value="9" className="bg-purple-900">9 Months</option>
          <option value="12" className="bg-purple-900">12 Months</option>
        </select>
      </div>

      <div className="bg-gradient-to-r from-blue-500/20 to-cyan-600/20 border border-blue-400/30 rounded-2xl p-4">
        <h4 className="font-medium text-blue-200 mb-2">Escrow Protection</h4>
        <p className="text-blue-100/80 text-sm">
          Your payment will be held in escrow and released to the landlord according to the tenancy terms.
        </p>
      </div>

      <button
        type="submit"
        disabled={isProcessing}
        className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Processing...</span>
          </>
        ) : (
          <>
            <span>Pay Rent to Escrow</span>
            <ArrowRight size={20} />
          </>
        )}
      </button>

      <div className="text-center text-white/60 text-sm">
        Powered by Circle USDC • Secured on blockchain
      </div>
    </form>
  )
}