'use client'

import { motion } from 'framer-motion'
import { SupportedNetwork, SUPPORTED_NETWORKS } from '@/lib/constants'

interface NetworkSelectorProps {
  selectedNetwork: SupportedNetwork | null
  onNetworkSelect: (network: SupportedNetwork) => void
  excludeNetwork?: SupportedNetwork | null
}

export function NetworkSelector({ selectedNetwork, onNetworkSelect, excludeNetwork }: NetworkSelectorProps) {
  const availableNetworks = SUPPORTED_NETWORKS.filter(
    network => network.id !== excludeNetwork?.id
  )

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {availableNetworks.map((network) => (
        <motion.button
          key={network.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNetworkSelect(network)}
          className={`
            network-card p-4 text-left transition-all duration-200
            ${selectedNetwork?.id === network.id 
              ? 'selected ring-2 ring-white ring-opacity-50' 
              : 'bg-white bg-opacity-10 hover:bg-opacity-20'
            }
          `}
        >
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{network.icon}</div>
            <div>
              <div className="font-semibold text-white text-sm">
                {network.name}
              </div>
              <div className="text-xs text-gray-300">
                Chain ID: {network.chainId}
              </div>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  )
}