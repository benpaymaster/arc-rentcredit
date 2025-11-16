'use client'

import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'
import Link from 'next/link'

interface FlowStep {
  id: string
  title: string
  action: string
  result: string
  icon: string
  notification: string
}

export default function HomePage() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [showNotification, setShowNotification] = useState('')

  const flowSteps: FlowStep[] = [
    {
      id: 'wallet',
      title: 'Connect Wallet',
      action: 'Connect MetaMask',
      result: '0x742d...5B74e Connected',
      icon: '🔗',
      notification: 'Wallet connected successfully!'
    },
    {
      id: 'bridge',
      title: 'Bridge USDC',
      action: 'Bridge $2,500',
      result: '2,500 USDC → Base',
      icon: '🌉',
      notification: 'USDC bridged to Base network'
    },
    {
      id: 'escrow',
      title: 'Create Escrow',
      action: 'Deploy Contract',
      result: 'ESC-001234 Active',
      icon: '🏠',
      notification: 'Rental escrow created'
    },
    {
      id: 'payment',
      title: 'First Payment',
      action: 'Pay $2,000',
      result: 'Payment Successful',
      icon: '💳',
      notification: 'Rent payment processed'
    },
    {
      id: 'reputation',
      title: 'Credit Score',
      action: 'Update Score',
      result: '785/1000 (+45)',
      icon: '⭐',
      notification: 'Credit score improved!'
    }
  ]

  useEffect(() => {
    if (isConnected && !completedSteps.includes('wallet')) {
      setCompletedSteps(prev => [...prev, 'wallet'])
      setShowNotification('Wallet connected successfully!')
      setTimeout(() => setShowNotification(''), 3000)
      setCurrentStep(1)
    }
  }, [isConnected, completedSteps])

  const executeStep = async (stepIndex: number, stepId: string) => {
    if (stepIndex > currentStep) return
    
    setIsProcessing(true)
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps(prev => [...prev, stepId])
      const step = flowSteps.find(s => s.id === stepId)
      if (step) {
        setShowNotification(step.notification)
        setTimeout(() => setShowNotification(''), 3000)
      }
    }
    
    setCurrentStep(Math.min(stepIndex + 1, flowSteps.length))
    setIsProcessing(false)
  }

  const handleWalletAction = () => {
    if (isConnected) {
      disconnect()
      setCompletedSteps([])
      setCurrentStep(0)
      setShowNotification('Wallet disconnected')
      setTimeout(() => setShowNotification(''), 2000)
    } else {
      connect({ connector: injected() })
    }
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      {/* Header */}
      <header className="border-b border-[#30363d] bg-[#161b22] sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-400 to-green-400 rounded-md flex items-center justify-center font-bold text-black text-lg">
              C
            </div>
            <div>
              <div className="text-xl font-bold text-white">CrossRent</div>
              <div className="text-xs text-gray-400 font-normal">
                Global Rent. Universal Credit. Global Reputation
              </div>
            </div>
          </div>
          
          <button
            onClick={handleWalletAction}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isConnected
                ? 'bg-green-600 hover:bg-green-500 text-white'
                : 'bg-teal-600 hover:bg-teal-500 text-white'
            }`}
          >
            {isConnected ? (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </div>
            ) : (
              'Connect Wallet'
            )}
          </button>
        </div>
      </header>

      {/* Main Flow Interface */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Flow Progress */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            {flowSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-all ${
                    completedSteps.includes(step.id)
                      ? 'bg-green-600 text-white'
                      : index === currentStep
                      ? 'bg-teal-600 text-white'
                      : 'bg-[#30363d] text-gray-400'
                  }`}
                >
                  {completedSteps.includes(step.id) ? '✓' : index + 1}
                </div>
                {index < flowSteps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-3 transition-colors ${
                      completedSteps.includes(step.id)
                        ? 'bg-green-600'
                        : index < currentStep
                        ? 'bg-teal-600'
                        : 'bg-[#30363d]'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Steps */}
        <div className="space-y-3">
          {flowSteps.map((step, index) => (
            <div
              key={step.id}
              className={`border border-[#30363d] rounded-lg p-6 transition-all ${
                index <= currentStep ? 'cursor-pointer hover:border-[#444c56]' : 'opacity-50 cursor-not-allowed'
              } ${
                completedSteps.includes(step.id)
                  ? 'bg-green-900/10 border-green-500/20'
                  : index === currentStep
                  ? 'bg-teal-900/10 border-teal-500/20'
                  : 'bg-[#161b22]'
              }`}
              onClick={() => index <= currentStep && executeStep(index, step.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{step.icon}</div>
                  <div>
                    <h3 className="text-lg font-medium text-white">{step.title}</h3>
                    {completedSteps.includes(step.id) && (
                      <p className="text-green-400 text-sm mt-1">
                        {step.result}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="text-right">
                  {completedSteps.includes(step.id) ? (
                    <div className="px-4 py-2 bg-green-600/20 border border-green-500/30 rounded-md text-green-400 font-medium text-sm">
                      Complete
                    </div>
                  ) : index === currentStep ? (
                    <div className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                      isProcessing
                        ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                        : 'bg-teal-600 hover:bg-teal-500 text-white'
                    }`}>
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                          Processing
                        </div>
                      ) : (
                        step.action
                      )}
                    </div>
                  ) : (
                    <div className="px-4 py-2 bg-[#30363d] rounded-md text-gray-400 font-medium text-sm">
                      {step.action}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-12 grid grid-cols-3 gap-4">
          {[
            { href: '/bridge', icon: '🌉', title: 'Bridge' },
            { href: '/escrow', icon: '🏠', title: 'Escrow' },
            { href: '/dashboard', icon: '📊', title: 'Dashboard' }
          ].map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="border border-[#30363d] rounded-lg p-4 text-center transition-colors hover:border-[#444c56] hover:bg-[#161b22]"
            >
              <div className="text-xl mb-2">{item.icon}</div>
              <h3 className="text-sm font-medium text-white">{item.title}</h3>
            </Link>
          ))}
        </div>
      </main>

      {/* Notifications */}
      {showNotification && (
        <div className="fixed top-24 right-6 z-50">
          <div className="bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-300 rounded-full"></div>
              <span className="text-sm font-medium">{showNotification}</span>
            </div>
          </div>
        </div>
      )}

      {/* Processing Indicator */}
      {isProcessing && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-[#161b22] border border-[#30363d] text-white px-4 py-3 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-teal-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm font-medium">Processing...</span>
            </div>
          </div>
        </div>
      )}

      {/* Progress Counter */}
      {completedSteps.length > 0 && (
        <div className="fixed bottom-6 left-6 z-50">
          <div className="bg-green-600 text-white px-3 py-2 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <span>✓</span>
              <span>{completedSteps.length}/{flowSteps.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}