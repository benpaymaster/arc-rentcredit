'use client'

import { motion } from 'framer-motion'
import { TransferStatus as TransferStatusType, TRANSFER_STATUSES } from '@/lib/constants'

interface TransferStatusProps {
  status: TransferStatusType
}

export function TransferStatus({ status }: TransferStatusProps) {
  const getStatusConfig = () => {
    switch (status) {
      case TRANSFER_STATUSES.PENDING:
        return {
          icon: '⏳',
          title: 'Transaction Pending',
          description: 'Waiting for transaction confirmation...',
          color: 'text-yellow-400',
          bgColor: 'bg-yellow-400',
        }
      case TRANSFER_STATUSES.CONFIRMED:
        return {
          icon: '✅',
          title: 'Transaction Confirmed',
          description: 'Starting cross-chain bridge transfer...',
          color: 'text-blue-400',
          bgColor: 'bg-blue-400',
        }
      case TRANSFER_STATUSES.BRIDGING:
        return {
          icon: '🌉',
          title: 'Bridging in Progress',
          description: 'Your USDC is being transferred across chains...',
          color: 'text-purple-400',
          bgColor: 'bg-purple-400',
        }
      case TRANSFER_STATUSES.COMPLETED:
        return {
          icon: '🎉',
          title: 'Transfer Complete',
          description: 'Your USDC has arrived at the destination!',
          color: 'text-green-400',
          bgColor: 'bg-green-400',
        }
      case TRANSFER_STATUSES.FAILED:
        return {
          icon: '❌',
          title: 'Transfer Failed',
          description: 'Something went wrong. Please try again.',
          color: 'text-red-400',
          bgColor: 'bg-red-400',
        }
      default:
        return {
          icon: '⏳',
          title: 'Processing',
          description: 'Processing your request...',
          color: 'text-gray-400',
          bgColor: 'bg-gray-400',
        }
    }
  }

  const config = getStatusConfig()
  const isInProgress = (status: TransferStatusType): boolean => {
    const inProgressStatuses: TransferStatusType[] = [TRANSFER_STATUSES.PENDING, TRANSFER_STATUSES.CONFIRMED, TRANSFER_STATUSES.BRIDGING]
    return inProgressStatuses.includes(status)
  }

  const currentIsInProgress = isInProgress(status)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 border border-white border-opacity-20"
    >
      <div className="flex items-center space-x-4">
        <div className={`text-3xl ${currentIsInProgress ? 'animate-bounce' : ''}`}>
          {config.icon}
        </div>
        
        <div className="flex-1">
          <h3 className={`font-semibold text-lg ${config.color}`}>
            {config.title}
          </h3>
          <p className="text-gray-300 text-sm">
            {config.description}
          </p>
        </div>

        {currentIsInProgress && (
          <div className="flex space-x-1">
            <div className={`w-2 h-2 ${config.bgColor} rounded-full animate-pulse`}></div>
            <div className={`w-2 h-2 ${config.bgColor} rounded-full animate-pulse`} style={{ animationDelay: '0.2s' }}></div>
            <div className={`w-2 h-2 ${config.bgColor} rounded-full animate-pulse`} style={{ animationDelay: '0.4s' }}></div>
          </div>
        )}
      </div>

      {/* Progress Steps */}
      {currentIsInProgress && (
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
            <span>Progress</span>
            <span>
              {status === TRANSFER_STATUSES.PENDING && '25%'}
              {status === TRANSFER_STATUSES.CONFIRMED && '50%'}
              {status === TRANSFER_STATUSES.BRIDGING && '75%'}
            </span>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className={`h-2 rounded-full ${config.bgColor}`}
              initial={{ width: 0 }}
              animate={{
                width: status === TRANSFER_STATUSES.PENDING ? '25%' :
                       status === TRANSFER_STATUSES.CONFIRMED ? '50%' :
                       status === TRANSFER_STATUSES.BRIDGING ? '75%' : '100%'
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>

          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span className={status === TRANSFER_STATUSES.PENDING ? config.color : ''}>
              Confirm
            </span>
            <span className={status === TRANSFER_STATUSES.CONFIRMED ? config.color : ''}>
              Submit
            </span>
            <span className={status === TRANSFER_STATUSES.BRIDGING ? config.color : ''}>
              Bridge
            </span>
            <span className={status === TRANSFER_STATUSES.COMPLETED ? config.color : ''}>
              Complete
            </span>
          </div>
        </div>
      )}

      {/* Success/Failure Actions */}
      {status === TRANSFER_STATUSES.COMPLETED && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 pt-4 border-t border-white border-opacity-20"
        >
          <button className="btn-secondary text-sm w-full">
            View Transaction
          </button>
        </motion.div>
      )}

      {status === TRANSFER_STATUSES.FAILED && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 pt-4 border-t border-white border-opacity-20"
        >
          <button className="btn-primary text-sm w-full">
            Try Again
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}