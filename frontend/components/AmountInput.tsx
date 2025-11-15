'use client'

import { useState, useEffect } from 'react'
import { formatUnits } from 'viem'
import { useAccount, useBalance } from 'wagmi'
import { SupportedNetwork, SupportedToken, MIN_TRANSFER_AMOUNT, MAX_TRANSFER_AMOUNT } from '@/lib/constants'

interface AmountInputProps {
  amount: string
  onAmountChange: (amount: string) => void
  sourceNetwork: SupportedNetwork | null
  selectedToken: SupportedToken | null
}

export function AmountInput({ amount, onAmountChange, sourceNetwork, selectedToken }: AmountInputProps) {
  const { address } = useAccount()
  const [error, setError] = useState<string | null>(null)

  const tokenAddress = sourceNetwork && selectedToken 
    ? sourceNetwork.tokenAddresses[selectedToken.id as keyof typeof sourceNetwork.tokenAddresses]
    : undefined

  const { data: balance } = useBalance({
    address,
    token: tokenAddress as `0x${string}`,
    chainId: sourceNetwork?.chainId,
    enabled: !!address && !!sourceNetwork && !!selectedToken && !!tokenAddress,
  })

  useEffect(() => {
    if (!amount) {
      setError(null)
      return
    }

    const numAmount = parseFloat(amount)
    
    if (isNaN(numAmount)) {
      setError('Invalid amount')
      return
    }

    if (numAmount < MIN_TRANSFER_AMOUNT) {
      setError(`Minimum transfer amount is ${MIN_TRANSFER_AMOUNT} ${selectedToken?.symbol || 'tokens'}`)
      return
    }

    if (numAmount > MAX_TRANSFER_AMOUNT) {
      setError(`Maximum transfer amount is ${MAX_TRANSFER_AMOUNT.toLocaleString()} ${selectedToken?.symbol || 'tokens'}`)
      return
    }

    if (balance && selectedToken && numAmount > parseFloat(formatUnits(balance.value, selectedToken.decimals))) {
      setError(`Insufficient ${selectedToken.symbol} balance`)
      return
    }

    setError(null)
  }, [amount, balance, selectedToken])

  const handleMaxClick = () => {
    if (balance && selectedToken) {
      const maxAmount = Math.min(
        parseFloat(formatUnits(balance.value, selectedToken.decimals)),
        MAX_TRANSFER_AMOUNT
      )
      onAmountChange(maxAmount.toString())
    }
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      onAmountChange(value)
    }
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <input
          type="text"
          value={amount}
          onChange={handleAmountChange}
          placeholder="0.00"
          className={`
            input-field bg-white bg-opacity-20 text-white placeholder-gray-300 text-lg font-semibold
            ${error ? 'border-red-400 ring-red-400' : 'border-white border-opacity-30 focus:ring-white'}
          `}
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-4">
          <span className="text-white font-semibold">{selectedToken?.symbol || 'TOKEN'}</span>
          {balance && (
            <button
              onClick={handleMaxClick}
              className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-2 py-1 rounded transition-all duration-200"
            >
              MAX
            </button>
          )}
        </div>
      </div>

      {/* Balance Display */}
      {address && sourceNetwork && selectedToken && (
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-300">
            Balance: {balance && selectedToken ? 
              `${parseFloat(formatUnits(balance.value, selectedToken.decimals)).toLocaleString()} ${selectedToken.symbol}` : 
              'Loading...'
            }
          </span>
          {sourceNetwork && (
            <span className="text-gray-300">
              on {sourceNetwork.name}
            </span>
          )}
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="text-red-400 text-sm flex items-center space-x-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Fee Estimate */}
      {amount && !error && parseFloat(amount) > 0 && selectedToken && (
        <div className="text-sm text-gray-300">
          <div className="flex justify-between">
            <span>Transfer amount:</span>
            <span>{parseFloat(amount).toLocaleString()} {selectedToken.symbol}</span>
          </div>
          <div className="flex justify-between">
            <span>Bridge fee (~0.1%):</span>
            <span>~{(parseFloat(amount) * 0.001).toFixed(4)} {selectedToken.symbol}</span>
          </div>
          <div className="flex justify-between font-semibold border-t border-gray-400 border-opacity-30 pt-1 mt-1">
            <span>You will receive:</span>
            <span>~{(parseFloat(amount) * 0.999).toFixed(4)} {selectedToken.symbol}</span>
          </div>
        </div>
      )}
    </div>
  )
}