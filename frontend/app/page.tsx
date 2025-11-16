'use client'

import { useState } from 'react'
import Header from '../components/Header'
import ConnectCTA from '../components/ConnectCTA'
import Dashboard from '../components/Dashboard'
import Guide from '../components/Guide'

export default function Home() {
  const [userType, setUserType] = useState<'tenant' | 'landlord'>('tenant')
  const [paymentSuccessCallback, setPaymentSuccessCallback] = useState<((amount: number) => void) | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-slate-900 to-purple-950">
      <Header />
      <ConnectCTA />
      <Dashboard 
        userType={userType} 
        setUserType={setUserType}
        onRegisterPaymentCallback={setPaymentSuccessCallback}
      />
      <Guide 
        userType={userType} 
        setUserType={setUserType}
        onPaymentSuccess={paymentSuccessCallback || undefined}
      />
    </div>
  )
}