'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { SupportedNetwork, SupportedToken, TransferStatus, SUPPORTED_NETWORKS } from '@/lib/constants'

interface TransferState {
  sourceNetwork: SupportedNetwork | null
  destinationNetwork: SupportedNetwork | null
  amount: string
  transferStatus: TransferStatus | null
  transferHistory: TransferRecord[]
}

interface TransferRecord {
  id: string
  sourceNetwork: SupportedNetwork
  destinationNetwork: SupportedNetwork
  selectedToken: SupportedToken
  amount: string
  status: TransferStatus
  timestamp: number
  txHash?: string
  bridgeTxHash?: string
}

interface TransferActions {
  setSourceNetwork: (network: SupportedNetwork | null) => void
  setDestinationNetwork: (network: SupportedNetwork | null) => void
  setAmount: (amount: string) => void
  setTransferStatus: (status: TransferStatus | null) => void
  addTransferRecord: (record: Omit<TransferRecord, 'id' | 'timestamp'>) => void
  updateTransferRecord: (id: string, updates: Partial<TransferRecord>) => void
  clearTransfer: () => void
}

type TransferStore = TransferState & TransferActions

export const useTransferStore = create<TransferStore>()(
  persist(
    (set, get) => ({
      // Initial state
      sourceNetwork: SUPPORTED_NETWORKS[0], // Default to Ethereum
      destinationNetwork: SUPPORTED_NETWORKS.find(n => n.id === 'arc') || null, // Default to Arc
      amount: '',
      transferStatus: null,
      transferHistory: [],

      // Actions
      setSourceNetwork: (network) => set({ sourceNetwork: network }),
      setDestinationNetwork: (network) => set({ destinationNetwork: network }),
      setAmount: (amount) => set({ amount }),
      setTransferStatus: (status) => set({ transferStatus: status }),
      
      addTransferRecord: (record) => {
        const newRecord: TransferRecord = {
          ...record,
          id: Math.random().toString(36).substr(2, 9),
          timestamp: Date.now(),
        }
        set(state => ({
          transferHistory: [newRecord, ...state.transferHistory].slice(0, 50) // Keep last 50 records
        }))
      },

      updateTransferRecord: (id, updates) => {
        set(state => ({
          transferHistory: state.transferHistory.map(record =>
            record.id === id ? { ...record, ...updates } : record
          )
        }))
      },

      clearTransfer: () => set({
        amount: '',
        transferStatus: null,
      }),
    }),
    {
      name: 'arc-bridge-transfer-store',
      partialize: (state) => ({
        sourceNetwork: state.sourceNetwork,
        destinationNetwork: state.destinationNetwork,
        transferHistory: state.transferHistory,
      }),
    }
  )
)