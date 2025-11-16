'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAccount } from 'wagmi'
import { parseUnits } from 'viem'
import { toast } from 'react-hot-toast'
import { useBridgeKit } from '@/lib/bridge-kit'
import { useTransferStore } from '@/store/transfer'
import { SupportedNetwork, SupportedToken, TRANSFER_STATUSES } from '@/lib/constants'

interface TransferButtonProps {
  sourceNetwork: SupportedNetwork | null
  destinationNetwork: SupportedNetwork | null
  selectedToken: SupportedToken | null
  amount: string
  isTransferring: boolean
  onTransferStart: () => void
  onTransferComplete: () => void
}

export function TransferButton({
  sourceNetwork,
  destinationNetwork,
  selectedToken,
  amount,
  isTransferring,
  onTransferStart,
  onTransferComplete,
}: TransferButtonProps) {
  const { address, isConnected } = useAccount()
  const { bridgeSDK } = useBridgeKit()
  const { setTransferStatus, addTransferRecord } = useTransferStore()
  const [currentTxHash, setCurrentTxHash] = useState<string | null>(null)

  const isDisabled = 
    !isConnected ||
    !sourceNetwork ||
    !destinationNetwork ||
    !selectedToken ||
    !amount ||
    parseFloat(amount) <= 0 ||
    isTransferring

  const getButtonText = () => {
    if (!isConnected) return 'Connect Wallet'
    if (!sourceNetwork || !destinationNetwork) return 'Select Networks'
    if (!selectedToken) return 'Select Token'
    if (!amount || parseFloat(amount) <= 0) return 'Enter Amount'
    if (isTransferring) return 'Initiating Transfer...'
    return `Transfer ${amount} ${selectedToken.symbol}`
  }

  const handleTransfer = async () => {
    if (!sourceNetwork || !destinationNetwork || !selectedToken || !amount || !address || !bridgeSDK) {
      return
    }

    try {
      onTransferStart()
      setTransferStatus(TRANSFER_STATUSES.PENDING)

      toast.loading(`Initiating ${selectedToken.symbol} cross-chain transfer...`, { id: 'transfer' })

      // Create transfer record
      const transferRecord = {
        sourceNetwork,
        destinationNetwork,
        selectedToken,
        amount,
        status: TRANSFER_STATUSES.PENDING,
      }
      addTransferRecord(transferRecord)

      // Step 1: Approve token spending (if needed)
      // This would typically check allowance first
      
      // Step 2: Initiate bridge transfer using Bridge Kit
      const bridgeTransfer = await bridgeSDK.createTransfer({
        fromChain: sourceNetwork.circleChainId,
        toChain: destinationNetwork.circleChainId,
        amount: parseUnits(amount, selectedToken.decimals).toString(),
        recipient: address,
        token: selectedToken.symbol,
      })

      setTransferStatus(TRANSFER_STATUSES.CONFIRMED)
      toast.success(`${selectedToken.symbol} transfer initiated! Bridging in progress...`, { id: 'transfer' })

      // For demo purposes, we'll simulate the transaction
      setCurrentTxHash('0x' + Math.random().toString(16).slice(2))
      setTransferStatus(TRANSFER_STATUSES.BRIDGING)

      // Step 4: Monitor bridge status
      await monitorBridgeStatus(bridgeTransfer.id)

      setTransferStatus(TRANSFER_STATUSES.COMPLETED)
      toast.success(`${selectedToken.symbol} transfer completed successfully!`, { id: 'transfer' })

    } catch (error) {
      console.error('Transfer failed:', error)
      setTransferStatus(TRANSFER_STATUSES.FAILED)
      toast.error(
        error instanceof Error 
          ? `Transfer failed: ${error.message}`
          : 'Transfer failed. Please try again.',
        { id: 'transfer' }
      )
    } finally {
      onTransferComplete()
    }
  }

  const monitorBridgeStatus = async (transferId: string) => {
    return new Promise((resolve, reject) => {
      const checkStatus = async () => {
        try {
          if (!bridgeSDK) return

          const status = await bridgeSDK.getTransferStatus(transferId)
          
          if (status === 'complete') {
            resolve(status)
          } else if (status === 'failed') {
            reject(new Error('Bridge transfer failed'))
          } else {
            // Continue monitoring
            setTimeout(checkStatus, 5000) // Check every 5 seconds
          }
        } catch (error) {
          reject(error)
        }
      }

      checkStatus()
      
      // Timeout after 10 minutes
      setTimeout(() => {
        reject(new Error('Bridge transfer timeout'))
      }, 10 * 60 * 1000)
    })
  }

  return (
    <motion.button
      whileHover={isDisabled ? {} : { scale: 1.02 }}
      whileTap={isDisabled ? {} : { scale: 0.98 }}
      onClick={handleTransfer}
      disabled={isDisabled}
      className="btn-primary w-full relative overflow-hidden"
    >
      {isTransferring && (
        <div className="absolute inset-0 bg-white bg-opacity-20">
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
          </div>
        </div>
      )}
      
      <span className={isTransferring ? 'opacity-50' : ''}>
        {getButtonText()}
      </span>
    </motion.button>
  )
}