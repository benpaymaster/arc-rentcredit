'use client'

import { WagmiConfig, createConfig } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RainbowKitProvider, getDefaultWallets, connectorsForWallets } from '@rainbow-me/rainbowkit'
import { sepolia, polygon, arbitrum, mainnet } from 'viem/chains'
import { BridgeKitProvider } from '@/lib/bridge-kit'
import '@rainbow-me/rainbowkit/styles.css'
import { configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

const { chains, publicClient } = configureChains(
  [mainnet, sepolia, polygon, arbitrum],
  [publicProvider()]
)

const { wallets } = getDefaultWallets({
  appName: 'Arc Bridge',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'arc-bridge-default',
  chains,
})

const connectors = connectorsForWallets(wallets)

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider chains={chains}>
          <BridgeKitProvider>
            {children}
          </BridgeKitProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  )
}